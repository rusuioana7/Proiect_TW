const mysql =require("mysql");

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "STUDENT",
    database: "mydb"
});

con.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log("Connected to database!");

});

function getDb () {
    if (con) {
        return con;
    } else {
        throw 'No database found!'
    }
}
module.exports={getDb}