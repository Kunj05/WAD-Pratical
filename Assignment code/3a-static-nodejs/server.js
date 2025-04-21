const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Directory to serve files from
const directoryPath = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    let pathname = decodeURIComponent(parsedUrl.pathname);

    if (pathname === '/') {
        // List all files in the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading directory');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h2>Directory Listing</h2><ul>');
            files.forEach(file => {
                const fileUrl = `/file/${file}`;
                res.write(`<li><a href="${fileUrl}">${file}</a></li>`);
            });
            res.write('</ul>');
            res.end();
        });
    } else if (pathname.startsWith('/file/')) {
        // Display the contents of a selected file
        const fileName = pathname.replace('/file/', '');
        const filePath = path.join(directoryPath, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found or cannot be read.');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
