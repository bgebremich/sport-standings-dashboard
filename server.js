const http = require('node:http');
const https = require('node:https');
const fs= require ('node:fs');
const path = require ('node:path');
const envPath = path.join(__dirname, '.env');
let API_KEY = '123'; 
if (fs.existsSync(envPath)){
    const envFile = fs.readFileSync (envPath, 'utf8');
    const match = envFile.match(/SPORTS_API_KEY=(.*)/);
    if (match) API_KEY = match[1].trim();
}
////
const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log (`${req.method} ${req.url}`);
    if (req.url.startsWith('/api/standings')){
        const parsedUrl = new URL (req.url, `http://${req.headers.host}`);
        const leagueId = parsedUrl.searchParams.get(`league`) || 4328;
        const apiURL = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookuptable.php?l=${leagueId}`;
        https.get(apiURL, (apiRes) => {let data='';
            apiRes.on('data', (chunk) => data+=chunk);
            apiRes.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data); 
            });
        }).on('error', (err) => {
  console.error('API Error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to reach the sports API' }));
        });
        return;

    }
    let filePath = req.url ==='/' ? '/index.html' : req.url;
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.css') contentType = 'text/css';
    if (extname === '.js') contentType = 'application/javascript';

    fs.readFile(path.join(__dirname, filePath), (err, content) =>{
        if (err) {
            res.writeHead(404);
            res.end('file not found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end (content);
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



