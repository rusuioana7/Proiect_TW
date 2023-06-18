// var mysql = require('mysql');

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "STUDENT"
// });

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE mydb", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });
// });

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "STUDENT",
    database: "mydb"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

// con.query("ALTER TABLE users ADD COLUMN country VARCHAR(255)", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

// var user = {
//     firstname: 'John',
//     lastname: 'Doe',
//     email: 'johndoe@example.com',
//     username: 'johndoe',
//     password: 'password123',
//     country:'Romania'
// };

// var sql = "INSERT INTO users (firstname, lastname, email, username, password, country) VALUES (?, ?, ?, ?, ?, ?)";
// var values = [user.firstname, user.lastname, user.email, user.username, user.password, user.country];

// con.query(sql, values, function (err, result) {
//     if (err) throw err;
//     console.log("Number of records inserted: " + result.affectedRows);
// });

//pentru afisare useri
con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});

//pentru sters useri
/*
var sql3 = "DELETE FROM users WHERE id = '1'";
con.query(sql3, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
}); */