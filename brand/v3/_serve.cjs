// Servidor local só para revisar o brand book v3 antes de publicar.
// Envolve a página no mesmo esqueleto que o Artifact usa (doctype, charset, viewport e reset).
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.argv[2]) || 4180;
const types = { ".html": "text/html; charset=utf-8", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };
const head =
  '<!doctype html><html><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">' +
  "<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}" +
  "body{margin:0;font:14px system-ui}img{max-width:100%}[hidden]{display:none!important}</style></head><body>";

http
  .createServer((req, res) => {
    let name = decodeURIComponent(req.url.split("?")[0]);
    if (name === "/") name = "/brand-book-v3.html";
    const file = path.join(root, path.normalize(name));
    if (!file.startsWith(root)) {
      res.writeHead(403);
      return res.end();
    }
    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404);
        return res.end("404");
      }
      const ext = path.extname(file);
      res.writeHead(200, { "Content-Type": types[ext] || "application/octet-stream" });
      res.end(ext === ".html" ? head + buf.toString("utf8") + "</body></html>" : buf);
    });
  })
  .listen(port, () => console.log(`brand-v3 em http://localhost:${port}`));
