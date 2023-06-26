

document.addEventListener('DOMContentLoaded', function() {
    var openButton = document.getElementById('open-button');
    var modal = document.getElementById('modal');
    var exitButton = document.getElementById('exit-button');
    var applyButton = document.getElementById('apply-button');

    openButton.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    exitButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    applyButton.addEventListener('click', function() {
        var selectedCountries = Array.from(document.querySelectorAll('input[name="country"]:checked'))
            .map(function(checkbox) {
                return checkbox.value;
            });

        console.log(selectedCountries);
        modal.style.display = 'none';
    });
});
let selectedCountries;
let selectedYear;
function applySelection() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    selectedCountries = [];
    selectedYear = document.getElementById("year-select").options[document.getElementById("year-select").selectedIndex].value;


    checkboxes.forEach(function(checkbox) {
        selectedCountries.push(checkbox.value);
    });

    const selectedCountriesElement = document.getElementById('selected-countries');
    let countryList = "";
    selectedCountriesElement.innerHTML = "Selected Countries: " + selectedCountries.join(", ");
    countryList += selectedCountries.join(',');
    console.log(countryList);
    console.log(selectedYear);
}



const applyButton = document.getElementById('submit-button');
applyButton.addEventListener('click', sendSelection);

function createPieChart(data) {
    // Extract the country names and values from the data
    const countries = data.map(item => item.country);
    const values = data.map(item => item[selectedYear]);

    // Create the chart
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: countries,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#efac07',
                    '#74ff65',
                    '#0a1744',
                    '#ebe236',
                    '#f956ff',
                    '#65ffed'
                    // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        },
    });
}

function createLineChart(data) {
    // Extract the country names and values from the data
    const countries = data.map(item => item.country);
    const values = data.map(item => item[selectedYear]);

    // Create the chart
    const ctx = document.getElementById('lineChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: countries,
            datasets: [{
                data: values,
                borderColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#efac07',
                    '#74ff65',
                    '#0a1744',
                    '#ebe236',
                    '#f956ff',
                    '#65ffed'
                    // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        },
    });
}

function createBarChart(data) {
    // Extract the country names and values from the data
    const countries = data.map(item => item.country);
    const values = data.map(item => item[selectedYear]);

    // Create the chart
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: countries,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#efac07',
                    '#74ff65',
                    '#0a1744',
                    '#ebe236',
                    '#f956ff',
                    '#65ffed'
                    // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        },
    });
}

function createDoughnutChart(data) {
    // Extract the country names and values from the data
    const countries = data.map(item => item.country);
    const values = data.map(item => item[selectedYear]);

    // Create the chart
    const ctx = document.getElementById('doughnutChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: countries,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#efac07',
                    '#74ff65',
                    '#0a1744',
                    '#ebe236',
                    '#f956ff',
                    '#65ffed'
                    // Add more colors as needed
                ],
            }],
        },
        options: {
            responsive: true,
            legend: {
                position: 'bottom',
            },
        },
    });
}

async function sendSelection() {
    try {
        applySelection();
        // Send the selected countries to the backend
        const response = await fetch(
            'http://localhost:8081/api/data?country=' +
            selectedCountries +
            '&year=' +
            selectedYear,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify('helloPeople'),
            }
        );
        if (response.ok) {
            console.log('Selection sent successfully');
            const data = await response.json();
            createPieChart(data.results);
            createLineChart(data.results);
            createBarChart(data.results);
            createDoughnutChart(data.results);

            // Export data in multiple formats
            exportDataToCSV(data.results);
            exportDataToWebP(data.results);
            exportDataToSVG(data.results);
        } else {
            throw new Error('Failed to send selection');
        }
    } catch (error) {
        console.error('Error sending selection:', error);
    }
}

function exportDataToCSV(data) {
    // Convert data to CSV format
    const csvData = convertToCSV(data);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    link.download = 'data.csv';

    // Trigger the download
    link.click();
}

function exportDataToWebP(data) {
    // Convert data to WebP format
    const webpData = convertToWebP(data);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = webpData;
    link.download = 'data.webp';

    // Trigger the download
    link.click();
}

function exportDataToSVG(data) {
    // Convert data to SVG format
    const svgData = convertToSVG(data);

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgData);
    link.download = 'data.svg';

    // Trigger the download
    link.click();
}

function convertToCSV(data) {
    // Extract the keys from the first object to create CSV headers
    const headers = Object.keys(data[0]);

    // Create the CSV content
    const csvContent =
        headers.join(',') +
        '\n' +
        data
            .map((row) =>
                headers.map((header) => JSON.stringify(row[header])).join(',')
            )
            .join('\n');

    return csvContent;
}

function convertToWebP(data) {
    // Convert data to WebP format using a canvas element
    const canvas = document.createElement('canvas');
    // Set the canvas dimensions based on your chart or data visualization requirements
    canvas.width = 800;
    canvas.height = 600;

    // Render the data on the canvas (example: drawing a red rectangle)
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Convert canvas content to WebP format
    const webpData = canvas.toDataURL('image/webp');

    return webpData;
}

function convertToSVG(data) {
    // Convert data to SVG format using an SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // Set the SVG dimensions based on your chart or data visualization requirements
    svg.setAttribute('width', '800');
    svg.setAttribute('height', '600');

    // Create SVG elements and populate them with your data
    // Example: creating a rect element with red color
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '800');
    rect.setAttribute('height', '600');
    rect.setAttribute('fill', 'red');
    svg.appendChild(rect);

    // Convert SVG element to XML string
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);

    return svgData;
}


loadCountries();

async function loadCountries(){
    try {
        const response = await fetch('http://localhost:8081/api/countries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("helloPeople")
        });
        let countries = await response.json();
        if (response.ok) {
            console.log('Countries loaded successfully');
        } else {
            throw new Error('Failed to send selection');
        }

        for(let country of countries.results){
            let countryOptions = document.getElementsByClassName("country-options")[0];
            let label = document.createElement("label");
            let input = document.createElement("input");
            input.type = "checkbox";
            input.name = country.country;
            input.value = country.country;
            input.id = country.country;
            label.htmlFor = country.country;
            label.innerHTML = country.country;
            countryOptions.appendChild(input);
            countryOptions.appendChild(label);

        }


    } catch (error) {
        console.error('Error sending selection:', error);
    }
}

