const http =require ("http");
const controller= require("./controller.js");

const server = http.createServer(async (request, response) => {
    console.log(request.method);
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    const reqMethod = request.method;
    let array= request.url.split("/"); // /api/v1/country/year
    let country=array[4];
    let year=array[5];
    try {
        switch (reqMethod) {
            case "GET": {
                if (array[2] === "v1") {
                     await controller.getOneCountryHandler(request, response, country, year);
                }
                break;
            }
            // default: {
            //     await controller.defaultHandler(request, response);
            // }

        }
    }catch (e){console.log(e);}
});

server.listen(8082, () => {
    console.log('Statistics api running at http://localhost:8082/');
});