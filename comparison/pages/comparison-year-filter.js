document.addEventListener('DOMContentLoaded', function() {
    var openButton = document.getElementById('open-button-year');
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
        var selectedYear = Array.from(document.querySelectorAll('input[name="year"]:checked'))
            .map(function(checkbox) {
                return checkbox.value;
            });

        console.log(selectedYear);
        modal.style.display = 'none';
    });
});
