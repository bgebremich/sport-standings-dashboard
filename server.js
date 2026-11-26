const http = require('http');
const https = require('https');
const fs= require ('fs');
const path = require ('path');
const envPath = path.join(__dirname, '.env');
let API_KEY = ''; 
if (fs.existsSync(envPath)){
    const envFile = fs.readFileSync (envPath, 'utf8');
    const match = envFile.match(/FOOTBALL_API_KEY=(.*)/);
    if (match) API_KEY = match[1].trim();
}
const ALLOWED_LEAGUES = ['PL', 'PD', 'BL1', 'SA', 'FL1', 'CL'];
const PUBLIC_FILES = {
    '/': { file: 'index.html', type: 'text/html' },
    '/index.html': { file: 'index.html', type: 'text/html' },
    '/app.js': { file: 'app.js', type: 'application/javascript' },
    '/style.css': { file: 'style.css', type: 'text/css' }
};

const PORT = 3000;
const server = http.createServer((req, res) => {
    console.log (`${req.method} ${req.url}`);
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        if (parsedUrl.pathname === '/api/standings') {
        
        const leagueCode = parsedUrl.searchParams.get(`league`) || 'PL';
                if (!ALLOWED_LEAGUES.includes(leagueCode)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Unsupported league' }));
            return;
        }
       const apiURL = `https://api.football-data.org/v4/competitions/${leagueCode}/standings`;
        https.get(apiURL, { headers: { 'X-Auth-Token': API_KEY } }, (apiRes) => {let data='';
            apiRes.on('data', (chunk) => data+=chunk);
            apiRes.on('end', () => {
            res.writeHead(apiRes.statusCode, { 'Content-Type': 'application/json' });
                res.end(data); 
            });
        }).on('error', (err) => {
  console.error('API Error:', err)
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to reach the sports API' }));
        });
        return;

    }
    const entry = PUBLIC_FILES[parsedUrl.pathname];
    if (!entry) {
        res.writeHead(404);
        res.end('file not found');
        return;
    }
    fs.readFile(path.join(__dirname, entry.file), (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('file not found');
        } else {
            res.writeHead(200, { 'Content-Type': entry.type });
            res.end(content);
        }
    });
});
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



