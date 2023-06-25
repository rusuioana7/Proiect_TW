let country;
let obIndex;
let year;
async function getChart() {

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
                const statistics = {
                    'Country': country,
                    'Obesity index': data.data,
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
                    type: 'line',
                    data: chartData,
                    options: chartOptions
                });
            });
    } catch (e) {
        console.log(e);
    }


}
function download(){

    let type=document.getElementById("format-select").value.toString();
    console.log(type);
    if(type==="CSV"){

    }
    else if(type==="WebP"){

    }

    else if(type==="SVG"){

    }

}