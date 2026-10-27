import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),dir=path.join(root,'outputs/prospeccao-coleta');
let raw=JSON.parse(fs.readFileSync(path.join(dir,'maps-raw.json'),'utf8'));
let seen=new Set();let leads=[];
for(const r of raw){let id=r.mapsUrl?.match(/!19s([^?]+)/)?.[1]||r.mapsUrl?.split('?')[0];if(!id||seen.has(id))continue;seen.add(id);const labels=r.labels||[],score=labels.find(x=>/estrelas?/.test(x))||'',m=score.match(/([\d,]+) estrelas? ([\d.]+) coment/),lines=r.raw.split('\n').filter(Boolean);let c=lines.findIndex(x=>/^[\d,]+\(/.test(x));let category=(lines[c+1]||'').split('·')[0].trim();let phone=r.raw.match(/\(\d{2}\)\s*\d{4,5}-\d{4}/)?.[0]||'';
leads.push({id,name:r.name,niche:r.niche,city:r.searchCity,cityVerified:false,category,phone,rating:m?Number(m[1].replace(',','.')):null,reviewCount:m?Number(m[2].replaceAll('.','')):null,address:'',website:'',mapsUrl:r.mapsUrl,collectedAt:'2026-10-02T15:30:00.000Z',source:'Google Maps (pesquisa pública)'});}
fs.writeFileSync(path.join(root,'previews/prospeccao/leads.json'),JSON.stringify({meta:{collectedAt:new Date().toISOString(),provider:'consulta pública',coverage:'Alto Tietê e Grande São Paulo',status:'Coleta em andamento'},leads},null,2));console.log('Leads locais: '+leads.length);
