const http = require("http")
const url = require('url');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "STUDENT",
    database: "mydb"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});
connection.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});


const server = http.createServer(async (req, res) => {
    console.log(req.method);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url.substring(0, 11) === '/statistics') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            fetch('http://localhost:8082/api/v1/statistics/' + req.url.substring(12,req.url.length),
                {method: 'GET'})
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                   // let dataa = parseInt(data.number);
                    res.writeHead(200, {"Content-Type": "application/json"});
                    console.log(data.number);
                    res.write(
                        JSON.stringify({year: data.number})
                    );
                    res.end();
                })
        });

    }

    const reqUrl = url.parse(req.url, true);
    // ------------------------------------------- LOGIN --------------------------------------------------------------------
    if (reqUrl.pathname === '/api/auth/login' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const requestData = JSON.parse(body);
            console.log('Received data:', requestData);
            const email = requestData.email;
            const password = requestData.password;
            const hashedPassword = await hashPassword(password);
            console.log(hashedPassword);
            try {
                connection.query('SELECT * FROM users WHERE (email = ? OR username = ?) AND password = ?', [email, email, hashedPassword], (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    }
                    console.log(results.length);
                    if (results.length === 0) {
                        res.writeHead(401, {'Content-Type': 'text/plain'});
                        res.end('Invalid email or password.');
                    } else {
                        const token = generateToken(email);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({token: token}));
                    }
                });

            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        });
    }

    // ------------------------------------------ Sign Up ------------------------------------------------------------
    if (reqUrl.pathname === '/api/auth/register' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const requestData = JSON.parse(body);
            console.log('Received data:', requestData);
            const email = requestData.email;
            const firstname = requestData.firstname;
            const lastname = requestData.lastname;
            const username = requestData.username;
            const password = requestData.password;
            const country = requestData.country;
            const hashedPassword = await hashPassword(password);
            console.log(hashedPassword);
            try {
                connection.query('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], async (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    }
                    if (results.length !== 0) {
                        res.writeHead(400, {'Content-Type': 'text/plain'});
                        res.end('Email or username already in use.');
                    } else {
                        await connection.query('INSERT INTO users (email, firstname, lastname, username, country, password) VALUES (?, ?, ?, ?, ?, ?)', [email, firstname, lastname, username, country, hashedPassword]);
                        const token = generateToken(email);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({token: token}));
                    }
                });
            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        })
    }
// ------------------------------------------ Vizualizare profil  ------------------------------------------------------------
    if (reqUrl.pathname === '/profile/' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const email = body;
            try {
                connection.query('SELECT * FROM users WHERE email = ? ', [email], (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    }
                    console.log(results.length);
                    if (results.length === 0) {
                        res.writeHead(401, {'Content-Type': 'text/plain'});
                        res.end('Invalid email or password.');
                    } else {
                        const user = results[0];
                        const profileData = {
                            "email": user.email,
                            "firstName": user.firstname,
                            "lastName": user.lastname,
                            "username": user.username,
                            "country": user.country
                        };
                        console.log(profileData);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(profileData));
                    }
                });

            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        });
    }
// ------------------------------------------Delete Account ------------------------------------------------------------
    if (reqUrl.pathname === '/profileDelete/' && req.method === 'DELETE') {

        let body = '';
       req.on('data', (chunk) => {
            body += chunk;
       });
        req.on('end', async () => {
            const email = body;
            try {
                connection.query('DELETE FROM users WHERE email = ?', [email], async (error, results, fields) => {
                    if (error) {
                        console.error('Error occured while deleting user:', error);
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    } else {
                        console.log('User deleted successfully');
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end("Successfully deleted the user");
                    }
                });
            } catch (error) {
                console.error('error occureed while deleting user', error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        });
    }

})



function generateToken(email) {
    const secretKey = 'my-secret-key';
    const token = jwt.sign({email}, secretKey, {expiresIn: '24h'});
    return token;
}

function hashPassword(password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

server.listen(8081, () => {
    console.log('Server running at http://localhost:8081/');
});