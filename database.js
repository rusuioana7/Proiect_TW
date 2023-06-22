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
/*
    const countries = ['European Union-27 countries (from 2020)', 'European Union-28 countries (2013-2020)', 'European Union-27 countries (2007-2013)', 'Euro area- 19 countries(2015-2022)', 'Euro area- 18 countries(2014)', 'Belgium', 'Bulgaria', 'Czechia', 'Denmark', 'Germany (until 1990 former teritory of the FRG)', 'Estonia', 'Ireland', 'Greece', 'Spain', 'France', 'Croatia', 'Italy', 'Cyprus', 'Latvia', 'Lithuania', 'Luxembourg', 'Hungary', 'Malta', 'Netherlands', 'Austria', 'Poland', 'Portugal', 'Romania', 'Slovenia', 'Slovakia', 'Finland', 'Sweden', 'Iceland', 'Norway', 'Switzerland', 'United Kingdom', 'North Macedonia', 'Serbia', 'Turkiye'];
    const years = [2008, 2014, 2017, 2019];
    const collection={};
    fetch('https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/SDG_02_10?format=JSON&lang=en&bmi=BMI_GE30')
        .then(response => response.json())
        .then(data => {
            const output = {
                value: data.value
            };

            for (let number = 0; number <= 155; number++) {
                if (output.value.hasOwnProperty(String(number))) {
                    const column = (number % 4);
                    const countryIndex = Math.floor(number / 4);
                    const country = countries[countryIndex];

                    if (!collection.hasOwnProperty(country)) {
                        collection[country] = {};
                    }

                    const year = years[column];
                    collection[country][String(year)] = String(output.value[number]);
                }
            }

            console.log(collection);

            // Create the table with columns "country", "2008", "2014", "2017", "2019"
            const createTableQuery = `CREATE TABLE IF NOT EXISTS countries (country VARCHAR(255), \`2008\` VARCHAR(255), \`2014\` VARCHAR(255), \`2017\` VARCHAR(255), \`2019\` VARCHAR(255))`;

            con.query(createTableQuery, function (err, result) {
                if (err) throw err;
                console.log("Table created");

                // Insert the data into the table
                const insertQuery = `INSERT INTO countries (country, \`2008\`, \`2014\`, \`2017\`, \`2019\`) VALUES ?`;

                const values = [];
                for (const country in collection) {
                    const rowData = [country, collection[country]['2008'], collection[country]['2014'], collection[country]['2017'], collection[country]['2019']];
                    values.push(rowData);
                }

                con.query(insertQuery, [values], function (err, result) {
                    if (err) throw err;
                    console.log("Data inserted");
                });

                con.end(); // Close the database connection
            });
        })
        .catch(error => console.log(error)); */

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