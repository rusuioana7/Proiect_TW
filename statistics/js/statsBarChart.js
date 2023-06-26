let country;
let obIndex;

function getInfoBar() {
    document.getElementById("info").innerHTML += ' <center><h2 className="title" style="color:white">Details</h2> ' +
        '<p className="text" style="color:white"> Format: Bar</p>' +
        ' <p className="text" style="color:white">Region: ' + country + '</p> ' +
        '<p className="text" style="color:white">Year: ' + year + '</p></center>';
}

async function getChartBar() {

    try {
        let array = location.href.split("/");
        country = array[3];
        year = array[4];
        await fetch('http://localhost:8082/api/v1/' + country + '/' + year, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                obIndex = data.data;
                let rest = 100 - obIndex


                const statistics = {
                    'Obesity index': data.data,
                    'Rest of population': rest
                };

                const chartData = {
                    labels: Object.keys(statistics),
                    datasets: [
                        {
                            label: 'Statistic',
                            backgroundColor: 'rgba(0, 123, 255, 0.5)',
                            borderColor: 'rgba(0, 123, 255, 1)',
                            borderWidth: 1,
                            data: Object.values(statistics).map((value) => value)
                        }
                    ]
                };

                const chartOptions = {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                };

                const canvas = document.getElementById('chartCanvas');
                new Chart(canvas, {
                    type: 'bar',
                    data: chartData,
                    options: chartOptions
                });
            });
    } catch (e) {
        console.log(e);
    }
}


function downloadBar() {

    let type = document.getElementById("format-select").value.toString();

    if (type === "CSV") {
        const csvContent = "Country,Year,Obesity index\n" + country + "," + year + "," + obIndex;
        const csvData = new Blob([csvContent], {type: 'text/csv'});
        const csvUrl = URL.createObjectURL(csvData);
        const downloadLink = document.createElement("a");
        downloadLink.href = csvUrl;
        downloadLink.download = "statistics.csv";
        downloadLink.click();

    } else if (type === "WebP") {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = 400; // Adjust the dimensions as needed
        canvas.height = 300;

        // Render the country, year, and obIndex on the canvas (hidden)
        const text = `Country: ${country}, Year: ${year}, Obesity index: ${obIndex}`;
        context.font = "14px Arial";
        context.fillText(text, 10, 20);

        canvas.toBlob(function (webpData) {
            const webpUrl = URL.createObjectURL(webpData);
            const downloadLink = document.createElement("a");
            downloadLink.href = webpUrl;
            downloadLink.download = "chart.webp";
            downloadLink.click();
        }, 'image/webp');
    } else if (type === "SVG") {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svgElement = document.createElementNS(svgNamespace, "svg");

        // Set SVG dimensions
        svgElement.setAttribute("width", "400"); // Adjust the dimensions as needed
        svgElement.setAttribute("height", "300");

        // Create a text element for country, year, and obIndex
        const textElement = document.createElementNS(svgNamespace, "text");
        textElement.setAttribute("x", "10");
        textElement.setAttribute("y", "20");
        textElement.setAttribute("fill", "black");
        textElement.textContent = `Country: ${country}, Year: ${year}, Obesity index: ${obIndex}`;

        // Append the text element to the SVG
        svgElement.appendChild(textElement);

        const svgData = new Blob([svgElement.outerHTML], {type: 'image/svg+xml'});
        const svgUrl = URL.createObjectURL(svgData);
        const downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = "chart.svg";
        downloadLink.click();
    }
}