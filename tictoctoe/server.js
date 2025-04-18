     const http = require('http');
     const fs = require('fs');
     const path = require('path');

     const server = http.createServer((req, res) => {
         let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
         let extname = path.extname(filePath);
         let contentType = 'text/html';

         switch (extname) {
             case '.js':
                 contentType = 'text/javascript';
                 break;
             case '.css':
                 contentType = 'text/css';
                 break;
         }

         fs.readFile(filePath, (err, content) => {
             if (err) {
                 if (err.code == 'ENOENT') {
                     res.writeHead(404);
                     res.end('404 Not Found');
                 } else {
                     res.writeHead(500);
                     res.end(`Server Error: ${err.code}`);
                 }
             } else {
                 res.writeHead(200, { 'Content-Type': contentType });
                 res.end(content, 'utf-8');
             }
         });
     });

     const PORT = process.env.PORT || 8000;
     server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
     