let country = '', year = '';

function getCountry() {
    country = document.getElementById('country-select').value;
    console.log(country)
}

function getYear() {
    year = document.getElementById('year-select').value;
    if(year==="All years available"){
        year="all";
    }
    console.log(year);
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
    // if(document.location==="statistics-generated-piechart.html"){
    //     document.getElementById("table").innerHTML+='';
    // }
    if (year !== "" && country !== "") {
        if (type === "pie") {
            window.location = country + "/" + year + "/" + "statisticsPieChart";
        } else if (type === "line") {
            window.location = country + "/" + year + "/" + "statisticsLine";
        } else if (type === "bar") {
            window.location = country + "/" + year + "/" + "statisticsBar";
        }
        else if (type === "polar") {
            window.location = country + "/" + year + "/" + "statisticsPolarArea";
        }
    } else {
        window.alert("Please choose a country and a year first.");
    }
}