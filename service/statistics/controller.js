const db = require("./database.js");

async function defaultHandler(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    response.write(
        JSON.stringify({
            message: `Not found.`,
        })
    );
    response.end();
}

async  function getOneCountryHandler(request, response, country, year) {
    let responseBody = null;
    let chunks = [];
    var conn = db.getDb();
    let number;
    console.log(country);
    console.log(year);


        try {
            conn.query('SELECT  `' + year + '` AS "index" FROM `mydb`.`countries` WHERE country="' + country + '" ', function (err, result, fields) {
                JSON.parse(JSON.stringify(result), (key, value) => {
                    if (key === "index") {
                        number = value;
                    }

                });

                console.log(number);

                response.write(
                    JSON.stringify({
                        data: number,
                    })
                );
                response.end();
            });
        } catch (err) {
            response.write(
                JSON.stringify({
                    err: "Database",
                })
            );
            response.end();
        }





}

        module.exports = {getOneCountryHandler, defaultHandler}