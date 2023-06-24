const http = require("http");
const controller = require("./controller.js");

const server = http.createServer(async (request, response) => {
    console.log(request.method);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const reqMethod = request.method;
    let array = request.url.split("/"); // /api/v1/country/year

    try {
        switch (reqMethod) {
            case "GET": {
                if (array[2] === "v1") {
                    const url = new URL(request.url, `http://${request.headers.host}`);
                    const countryParams = url.searchParams.getAll('country');
                    const year=url.searchParams.getAll('year');
                    await controller.getMultipleCountriesHandler(request, response, countryParams, year);
                }
                break;
            }
            // default: {
            //     await controller.defaultHandler(request, response);
            // }
        }
    } catch (e) {
        console.log(e);
    }
});

server.listen(8083, () => {
    console.log('Comparison API running at http://localhost:8083/');
});
