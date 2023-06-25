const db=require("./database.js");

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


 async function getMultipleCountriesHandler(request, response, countryParams, year) {
        let responseBody = [];
        var conn = db.getDb();

        try {
            for (const country of countryParams) {
                const query = 'SELECT `' + year + '` AS "year" FROM `mydb`.`countries` WHERE country="' + country + '"';
                await new Promise((resolve, reject) => {
                    conn.query(query, function (err, result, fields) {
                        if (err) {
                            reject(err);
                        } else {
                            const number = JSON.parse(JSON.stringify(result))[0].year;
                            responseBody.push(number);
                            resolve();
                        }
                    });
                });
            }
        } catch (err) {
            responseBody = { error: 'Database error' };
        }

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(responseBody));
        response.end();


}
module.exports = {getMultipleCountriesHandler,defaultHandler}