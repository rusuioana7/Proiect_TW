function getChart() {
    try {

        fetch('http://localhost:8081/api/v1/statistics/' + country + '/' + year, {
            method: 'GET'
        })
            .then((response) => {
                return response.json();
            })
    } catch (e) {
        console.log(e);
    }
}