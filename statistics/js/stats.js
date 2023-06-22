let country = '', year = '';

function getCountry() {
    country = document.getElementById('country-select').value;
}

function getYear() {
    year = document.getElementById('year-select').value;
}

function getStats(type) {

    // if (country !== '' && year !== '') {
    //     fetch('http://localhost:8081/statistics' + country + "/" +year,
    //         {method: 'GET'})
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((data) => {
    //             let dataa = parseInt(data.number);
    //             res.writeHead(200, {"Content-Type": "application/json"});
    //
    //             res.end(JSON.stringify(dataa));
    //         })
    // }
    // if(document.location==="statistics-generated-table.html"){
    //     document.getElementById("table").innerHTML+='';
    // }
    if (type === "table") {
        window.location = "../pages/statistics-generated-table.html"
    } else if (type === "line") {
        window.location = "../pages/statistics-generate-line.html"
    } else if (type === "bar") {
        window.location = "../pages/statistics-generate-bar.html"
    }
}