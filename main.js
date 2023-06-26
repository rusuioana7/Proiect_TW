const http = require("http")
const url = require('url');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const fs = require("fs");


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
    console.log(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    //------------render html, css, js Statistics---------
    const reqRL = url.parse(req.url, true);
    let pg = req.url.substring(req.url.lastIndexOf("/") + 1);
    if (pg === "statisticsHomepage") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./statistics/pages/statistics-main.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });
    } else if (pg === "statisticsBar") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./statistics/pages/statistics-generate-bar.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();


        });

    } else if (pg === "statisticsLine") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./statistics/pages/statistics-generate-line.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });
    } else if (pg === "statisticsPieChart") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./statistics/pages/statistics-generated-piechart.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });


    } else if (pg === "statisticsPolarArea") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./statistics/pages/statistics-generate-map.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });


    } else if (req.url === "/styling/statistics-main.css" || req.url === "/styling/statistics-generate-bar.css" || req.url === "/styling/statistics-generate-line.css" || req.url === "/styling/statistics-generate-piechart.css" || req.url === "/styling/statistics-generate-polar.css") {
        fs.readFile("./statistics" + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(htmlContent);
            res.end();

        });
    } else if (req.url === "/js/stats.js" || req.url === "/js/statsBarChart.js" || req.url === "/js/statsPieChart.js" || req.url === "/js/statsLineChart.js" || req.url === "/js/statsPolarAreaChart.js") {
        fs.readFile("./statistics" + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/javascript'})
            res.write(htmlContent);
            res.end();
        });


    } else if (req.url === "/homepage_login_register/background0.png") {
        fs.readFile("." + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.write(htmlContent);
            res.end();
        });

        //------------render html, css, js Comparison---------
    } else if (pg === "comparisonHomepage") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./comparison/pages/comparison-main.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });


    } else if (pg === "comparisonBar") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./comparison/pages/comparison-generate-bar.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();


        });
    } else if (pg === "comparisonLine") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./comparison/pages/comparison-generate-line.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });
    } else if (pg === "comparisonsTable") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./comparison/pages/comparison-generated-table.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });


    } else if (pg === "comparisonMap") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        fs.readFile("./comparison/pages/comparison-generate-map.html", function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(htmlContent);
            res.end();
        });


    } else if (req.url === "/styling/comparison-main.css" || req.url === "/styling/comparison-generate-bar.css" || req.url === "/styling/comparison-generate-line.css" || req.url === "/styling/comparison-generate-table.css" || req.url === "/styling/comparison-generate-map.css") {
        fs.readFile("./comparison" + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(htmlContent);
            res.end();

        });


    } else if (req.url === "/comparison-main-filter.js" || req.url === "/comparison-year-filter.js" || req.url === "/comparisonBar.js") {
        fs.readFile("./comparison/pages" + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'text/javascript'})
            res.write(htmlContent);
            res.end();


        });
    } else if (req.url === "/comparison/images/close.png") {
        fs.readFile("." + req.url, function (error, htmlContent) {
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.write(htmlContent);
            res.end();
        });


    }
        //------------render html, css, js MyProfile---------
        // else if (pg === "myProfile") {//req.url.substring(req.url.length-3,req.url.length)==="html"){
        //     fs.readFile("./logo_myProfile_about/myProfile.html", function (error, htmlContent) {
        //         res.writeHead(200, {'Content-Type': 'text/html'})
        //         res.write(htmlContent);
        //         res.end();
        //     });
        // } else if (req.url === "/myProfile.css") {
        //     fs.readFile("./logo_myProfile_about" + req.url, function (error, htmlContent) {
        //         res.writeHead(200, {'Content-Type': 'text/css'})
        //         res.write(htmlContent);
        //         res.end();
        //
        //
        //     });
        // } else if (req.url === "/myProfile.js") {
        //     fs.readFile("./logo_myProfile_about" + req.url, function (error, htmlContent) {
        //         res.writeHead(200, {'Content-Type': 'text/javascript'})
        //         res.write(htmlContent);
        //         res.end();
        //     });
        // } else if (req.url === "/logo_myProfile_about/images/bck2.jpg") {
        //     fs.readFile("." + req.url, function (error, htmlContent) {
        //         res.writeHead(200, {'Content-Type': 'image/jpg'})
        //         res.write(htmlContent);
        //         res.end();
        //     });
        // }else if (req.url === "/logo_myProfile_about/images/profilepic.jpg") {
        //     fs.readFile("." + req.url, function (error, htmlContent) {
        //         res.writeHead(200, {'Content-Type': 'image/jpg'})
        //         res.write(htmlContent);
        //         res.end();
        //     });
        // }


//-------------------------------------Statistics-----------------------------------------
    else if (req.url.substring(0, 11) === '/statistics') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            fetch('http://localhost:8082/api/v1/statistics/' + req.url.substring(12, req.url.length),
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
                    res.end()
                })
        });

    }


//-------------------------------------Comparison-----------------------------------------
    else if (req.url.substring(0, 11) === '/comparison') {

        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const url = new URL(req.url, `http://${req.headers.host}`);
            const countries = url.searchParams.getAll('country');
            const year = url.searchParams.get('year');
            const queryUrl = `http://localhost:8083/api/v1/comparison?country=${countries.join('&country=')}&year=${year}`;

            fetch(queryUrl, {method: 'GET'})
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    console.log(data); // Log the received data
                    res.write(JSON.stringify(data));
                    res.end();
                })
                .catch((error) => {
                    console.error(error);
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify({error: 'Internal Server Error'}));
                    res.end();
                });
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
                        const user = results[0];
                        if (user.role === "admin") {
                            const token = generateToken(email);
                            const dateAdmin = {
                                "token": token,
                                "role": "admin"
                            }
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify(dateAdmin));
                        } else {
                            const token = generateToken(email);
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({token: token}));
                        }
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

    }// ------------------------------------------ Informations ------------------------------------------------------------
    if (reqUrl.pathname.startsWith('/api/data') && req.method === 'POST') {
        let url = new URLSearchParams(reqUrl.query);
        let y = reqUrl.query.year;
        let c = reqUrl.query.country;
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        if (y !== "all" && !c.includes(',')) {
            req.on('end', async () => {
                try {
                    let query = "SELECT country, c." + y + " FROM countries c WHERE c.country = ?";
                    let formatedQuery = mysql.format(query, [c]);
                    console.log(formatedQuery);
                    connection.query(formatedQuery, async (error, results, fields) => {

                        if (error) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal server error');
                        }
                        if (results.length === 0) {
                            res.writeHead(400, {'Content-Type': 'text/plain'});
                            res.end('Information not found');
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({results}));
                        }
                    });
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal server error');
                }
            })
        } else if (y === "all" && !c.includes(',')) {
            req.on('end', async () => {
                try {
                    let query = "SELECT * FROM countries WHERE country = ?";
                    let formatedQuery = mysql.format(query, [c]);
                    console.log(formatedQuery);
                    connection.query(formatedQuery, async (error, results, fields) => {

                        if (error) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal server error');
                        }
                        if (results.length === 0) {
                            res.writeHead(400, {'Content-Type': 'text/plain'});
                            res.end('Information not found');
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({results}));
                        }
                    });
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal server error');
                }
            })
        } else if (y !== "all" && c.includes(',')) {
            let countryList = c.replaceAll(",", "\',\'");
            req.on('end', async () => {
                try {
                    let query = "SELECT c.country, c." + y + " FROM countries c WHERE country IN (\'" + countryList + "\')";
                    console.log(query);
                    connection.query(query, async (error, results, fields) => {

                        if (error) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal server error');
                        }
                        if (results.length === 0) {
                            res.writeHead(400, {'Content-Type': 'text/plain'});
                            res.end('Information not found');
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({results}));
                        }
                    });
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal server error');
                }
            })
        } else if (y === "all" && c.includes(',')) {
            let countryList = c.replaceAll(",", "\',\'");
            console.log(countryList);
            req.on('end', async () => {
                try {
                    let query = "SELECT * FROM countries WHERE country IN (\'" + countryList + "\')";
                    console.log(query);
                    connection.query(query, async (error, results, fields) => {

                        if (error) {
                            res.writeHead(500, {'Content-Type': 'text/plain'});
                            res.end('Internal server error');
                        }
                        if (results.length === 0) {
                            res.writeHead(400, {'Content-Type': 'text/plain'});
                            res.end('Information not found');
                        } else {
                            res.writeHead(200, {'Content-Type': 'application/json'});
                            res.end(JSON.stringify({results}));
                        }
                    });
                } catch (error) {
                    res.writeHead(500, {'Content-Type': 'text/plain'});
                    res.end('Internal server error');
                }
            })
        }
    }


// ------------------------------------------ Countries ------------------------------------------------------------
    if (reqUrl.pathname === ('/api/countries') && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', async () => {
            try {
                let query = "SELECT c.country FROM countries c";
                let formatedQuery = mysql.format(query, []);
                console.log(formatedQuery);
                connection.query(formatedQuery, async (error, results, fields) => {

                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    }
                    if (results.length === 0) {
                        res.writeHead(400, {'Content-Type': 'text/plain'});
                        res.end('Information not found');
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify({results}));
                    }
                });
            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        })

    }

//---------------------------------------- Admin -------------------------------------------------------------------
    if (reqUrl.pathname === '/api/admin/getUsers' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const email = body;
            try {
                connection.query('SELECT * FROM users ', [], (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    }
                    console.log(results.length);
                    if (results.length === 0) {
                        res.writeHead(401, {'Content-Type': 'text/plain'});
                        res.end('Invalid email or password.');
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(results));
                    }
                });

            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        });
    }

    if (reqUrl.pathname === '/api/admin/deleteUser/' && req.method === 'DELETE') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const requestData = JSON.parse(body);
            const id = requestData.id;
            console.log(id);
            try {
                connection.query('DELETE FROM users WHERE id = ?', [id], async (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end("Successfully deleted the user");
                    }
                });
            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        })
    }


    if (reqUrl.pathname === '/api/admin/editUser/' && req.method === 'PUT') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            const requestData = JSON.parse(body);
            const id = requestData.id;
            const firstname = requestData.firstname;
            const lastname = requestData.lastname;
            const email = requestData.email;
            const username = requestData.username;
            const password = requestData.password;
            const country = requestData.country;
            console.log(requestData);
            try {
                connection.query('UPDATE users SET firstname = ?, lastname = ?, username = ?, password = ?, country = ? WHERE email = ?', [firstname, lastname, username, password, country, email], async (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    } else {

                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(JSON.stringify(requestData));
                    }
                });
            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        })
    }
    if (reqUrl.pathname === '/api/admin/addUser/' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const requestData = JSON.parse(body);
                const firstname = requestData.firstname;
                const lastname = requestData.lastname;
                const username = requestData.username;
                const email = requestData.email;
                const password = requestData.password;
                const country = requestData.country;
                console.log(requestData);
                connection.query('INSERT INTO users (firstname, lastname, email, username, password, country) VALUES (?, ?, ?, ?, ?, ?)', [firstname, lastname, email, username, password, country], async (error, results, fields) => {
                    if (error) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal server error');
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end("Successfully added the user");
                        console.log("ok");
                    }
                });
            } catch (error) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal server error');
            }
        })
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
    console.log('Server running at http://localhost:8081');
});

