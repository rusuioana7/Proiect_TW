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
async function sendSelection() {
    try {
        applySelection();
        // Send the selected countries to the backend
        const response = await fetch('http://localhost:8081/api/data?country=' + selectedCountries + '&year=' + selectedYear, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify("helloPeople")
        });
        if (response.ok) {
            console.log('Selection sent successfully');
        } else {
            throw new Error('Failed to send selection');
        }
    } catch (error) {
        console.error('Error sending selection:', error);
    }
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