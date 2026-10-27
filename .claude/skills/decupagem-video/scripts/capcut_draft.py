"""Gera um projeto (draft) do CapCut Desktop a partir do edl.json — sem MCP, sem dependências.

O CapCut (Windows, testado na 9.5) guarda cada projeto como pasta em
  %LOCALAPPDATA%/CapCut/User Data/Projects/com.lveditor.draft/<nome>/
com draft_content.json em JSON aberto (duplicado em Timelines/<id>/). Este script escreve essa
pasta com 1 trilha de vídeo: cada trecho do EDL vira um clipe apontando para o arquivo ORIGINAL
(qualidade total, cortes reajustáveis no CapCut puxando as bordas do clipe).

Modos
  extract <draft_com_video> <draft_vazio>   captura moldes da versão instalada -> assets/capcut_template.json
                                            (rodar de novo se uma atualização do CapCut quebrar o build)
  build <edl.json> <video_original> --nome "X" [--largura 2160 --altura 3840] [--canvas 1080x1920]
                                            cria o projeto. Feche o CapCut antes (ele reescreve a lista de projetos).
"""
import argparse
import copy
import json
import os
import shutil
import sys
import time
import uuid

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "..", "assets", "capcut_template.json")
DRAFTS = os.path.join(os.environ.get("LOCALAPPDATA", ""), "CapCut", "User Data", "Projects", "com.lveditor.draft")
EXTRA_KINDS = ["speeds", "placeholder_infos", "canvases", "sound_channel_mappings", "material_colors", "vocal_separations"]


def U():
    """ID no estilo do CapCut: 8-4-4-4-12 maiúsculo, com o 3º bloco minúsculo (ex.: 46ECA8E9-BF90-4bee-...)."""
    p = str(uuid.uuid4()).upper().split("-")
    p[2] = p[2].lower()
    return "-".join(p)


def load(p):
    with open(p, encoding="utf-8") as f:
        return json.load(f)


def dump(obj, p):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, separators=(",", ":"))


def extract(with_video, empty):
    d = load(os.path.join(with_video, "draft_content.json"))
    by_id = {}
    for kind, arr in d["materials"].items():
        if isinstance(arr, list):
            for m in arr:
                if isinstance(m, dict) and "id" in m:
                    by_id[m["id"]] = (kind, m)
    track = next(t for t in d["tracks"] if t["type"] == "video" and t["segments"])
    seg = track["segments"][0]
    protos = {"segment": seg, "video_material": by_id[seg["material_id"]][1],
              "track": {k: v for k, v in track.items() if k != "segments"}, "extra": {}}
    for r in seg["extra_material_refs"]:
        kind, m = by_id[r]
        protos["extra"][kind] = m
    skel = load(os.path.join(empty, "draft_content.json"))
    for k, v in skel["materials"].items():
        if isinstance(v, list):
            skel["materials"][k] = []
    skel["tracks"] = []
    tl = load(os.path.join(empty, "Timelines", "project.json"))
    tid = tl["main_timeline_id"]
    aux = {}
    for rel in ["attachment_pc_common.json", "draft_agency_config.json", "performance_opt_info.json",
                "common_attachment/attachment_pc_timeline.json", f"Timelines/{tid}/attachment_editing.json"]:
        p = os.path.join(empty, rel)
        if os.path.exists(p):
            aux[rel.replace(f"Timelines/{tid}/", "TIMELINE/")] = load(p)
    meta = load(os.path.join(empty, "draft_meta_info.json"))
    meta["draft_materials"] = [{"type": t, "value": []} for t in (0, 1, 2, 3, 6, 7, 8)]
    tpl = {"capcut_version": d.get("platform", {}).get("app_version"), "new_version": d.get("new_version"),
           "skeleton": skel, "protos": protos, "aux": aux, "meta": meta,
           "material_entry_proto": next((m for g in load(os.path.join(empty, "draft_meta_info.json"))["draft_materials"]
                                         for m in g["value"] if m.get("metetype") == "video"), None)}
    dump(tpl, TEMPLATE)
    print("molde salvo:", os.path.abspath(TEMPLATE), "| CapCut", tpl["capcut_version"])


def build(edl_path, video, nome, width, height, canvas_w, canvas_h):
    tpl = load(TEMPLATE)
    edl = load(edl_path)
    video = os.path.abspath(video).replace("\\", "/")
    folder = os.path.join(DRAFTS, nome)
    if os.path.exists(folder):
        sys.exit(f"Já existe um projeto chamado '{nome}'. Use outro --nome.")
    US = 1_000_000
    src_dur = int(round(edl["source_duration"] * US))
    now_us = int(time.time() * US)

    d = copy.deepcopy(tpl["skeleton"])
    tid = U()
    d["id"] = tid
    d["canvas_config"].update({"width": canvas_w, "height": canvas_h, "ratio": "original"})

    vm = copy.deepcopy(tpl["protos"]["video_material"])
    vm.update({"id": U(), "path": video, "material_name": os.path.basename(video), "duration": src_dur,
               "width": width, "height": height, "has_audio": True, "local_material_id": str(uuid.uuid4()),
               "crop_ratio": "free", "crop_scale": 1,
               "crop": {"upper_left_x": 0, "upper_left_y": 0, "upper_right_x": 1, "upper_right_y": 0,
                        "lower_left_x": 0, "lower_left_y": 1, "lower_right_x": 1, "lower_right_y": 1}})
    d["materials"]["videos"].append(vm)

    track = copy.deepcopy(tpl["protos"]["track"])
    track.update({"id": U(), "segments": []})
    pos = 0
    fps = edl["fps"]
    for s in edl["segments"]:
        # duração derivada de quadros inteiros (mesma regra do render.py)
        dur = int(round(round((s["src_end"] - s["src_start"]) * fps) / fps * US))
        refs = []
        for kind in EXTRA_KINDS:
            proto = tpl["protos"]["extra"].get(kind)
            if proto is None:
                continue
            m = copy.deepcopy(proto)
            m["id"] = U()
            d["materials"].setdefault(kind, []).append(m)
            refs.append(m["id"])
        seg = copy.deepcopy(tpl["protos"]["segment"])
        seg.update({"id": U(), "material_id": vm["id"], "extra_material_refs": refs,
                    "source_timerange": {"start": int(round(s["src_start"] * US)), "duration": dur},
                    "target_timerange": {"start": pos, "duration": dur},
                    "render_timerange": {"start": 0, "duration": 0}, "speed": 1.0, "volume": 1.0,
                    "keyframe_refs": [], "common_keyframes": [], "group_id": "", "raw_segment_id": ""})
        seg["clip"] = {"scale": {"x": 1.0, "y": 1.0}, "rotation": 0.0, "transform": {"x": 0.0, "y": 0.0},
                       "flip": {"vertical": False, "horizontal": False}, "alpha": 1.0}
        track["segments"].append(seg)
        pos += dur
    d["tracks"] = [track]
    d["duration"] = pos

    # ---- arquivos da pasta ----
    dump(d, os.path.join(folder, "draft_content.json"))
    dump(d, os.path.join(folder, "Timelines", tid, "draft_content.json"))
    for rel, obj in tpl["aux"].items():
        dump(obj, os.path.join(folder, rel.replace("TIMELINE/", f"Timelines/{tid}/")))
    dump({"id_mapping": {"mapping": [], "next_index": 1000, "version": "1.0.0"}},
         os.path.join(folder, "common_attachment", "attachment_id_mapping.json"))
    dump({}, os.path.join(folder, "key_value.json"))
    open(os.path.join(folder, "draft_biz_config.json"), "w").close()
    dump({"config": {"color_space": -1, "hdr_vivid": False, "mixed_track_mode_on": False,
                     "render_index_track_mode_on": False, "use_float_render": False},
          "create_time": now_us, "id": U(), "main_timeline_id": tid,
          "timelines": [{"create_time": now_us, "id": tid, "is_marked_delete": False,
                         "name": "Linha do tempo 01", "update_time": now_us}],
          "update_time": now_us, "version": 0}, os.path.join(folder, "Timelines", "project.json"))
    dump({"dockItems": [{"dockIndex": 0, "ratio": 1, "timelineIds": [tid], "timelineNames": ["Linha do tempo 01"]}],
          "layoutOrientation": 1}, os.path.join(folder, "timeline_layout.json"))
    pool_id = str(uuid.uuid4())
    entry = copy.deepcopy(tpl.get("material_entry_proto") or {})
    entry.update({"create_time": now_us // US, "duration": src_dur, "extra_info": os.path.basename(video),
                  "file_Path": video, "width": width, "height": height, "id": pool_id,
                  "import_time": now_us // US, "import_time_ms": now_us, "metetype": "video",
                  "roughcut_time_range": {"duration": src_dur, "start": 0},
                  "sub_time_range": {"duration": -1, "start": -1}, "type": 0})
    meta = copy.deepcopy(tpl["meta"])
    meta["draft_materials"][0]["value"] = [entry]
    meta.update({"draft_id": U(), "draft_name": nome, "draft_fold_path": folder.replace("\\", "/"),
                 "draft_root_path": DRAFTS, "draft_cover": "", "tm_draft_create": now_us,
                 "tm_draft_modified": now_us, "tm_duration": pos, "draft_timeline_materials_size_": 0})
    dump(meta, os.path.join(folder, "draft_meta_info.json"))
    dump({"draft_materials": [], "draft_virtual_store": [
        {"type": 0, "value": [{"creation_time": 0, "display_name": "", "filter_type": 0, "id": "", "import_time": 0,
                               "import_time_us": 0, "material_color_tag": "", "sort_sub_type": 0, "sort_type": 0,
                               "subdraft_filter_type": 0}]},
        {"type": 1, "value": [{"child_id": pool_id, "parent_id": ""}]}, {"type": 2, "value": []}]},
        os.path.join(folder, "draft_virtual_store.json"))
    with open(os.path.join(folder, "draft_settings"), "w", encoding="utf-8") as f:
        f.write(f"[General]\ndraft_create_time={now_us // US}\ndraft_last_edit_time={now_us // US}\n"
                "real_edit_seconds=0\nreal_edit_keys=0\n")
    print(f"Projeto criado: {folder}\n  {len(track['segments'])} clipes, {pos / US:.1f}s")


ap = argparse.ArgumentParser()
sub = ap.add_subparsers(dest="cmd", required=True)
e = sub.add_parser("extract")
e.add_argument("with_video")
e.add_argument("empty")
b = sub.add_parser("build")
b.add_argument("edl")
b.add_argument("video")
b.add_argument("--nome", required=True)
b.add_argument("--largura", type=int, default=2160)
b.add_argument("--altura", type=int, default=3840)
b.add_argument("--canvas", default="1080x1920")
a = ap.parse_args()
if a.cmd == "extract":
    extract(a.with_video, a.empty)
else:
    cw, ch = map(int, a.canvas.lower().split("x"))
    build(a.edl, a.video, a.nome, a.largura, a.altura, cw, ch)
