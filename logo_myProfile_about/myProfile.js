let firstName = document.getElementById("Name");
let lastName = document.getElementById("Surnume");
let username = document.getElementById("username");
let email = document.getElementById("email");
let country = document.getElementById("country-select");

console.log(localStorage);
const token = localStorage.getItem('token');
function decodeToken(token) {
    const [, payloadBase64] = token.split('.');
    try {
        const payload = JSON.parse(atob(payloadBase64));
        return payload;
    } catch (error) {

        console.error('Error decoding token:', error);
        return null;
    }
}

console.log(token);
decodedToken= decodeToken(token);
const Email = decodedToken.email;
console.log(Email);
loadProfile();

async function loadProfile() {
    const token = localStorage.getItem('token');
    console.log(Email);
    const response = await fetch("http://localhost:8081/profile/", {
        method: "POST",
        headers:{
            'Content-Type': 'text/plain',
        },
        body: Email
    });
    const data = await response.json();
    console.log(data);
    firstName.innerHTML = "";
    lastName.innerHTML="";
    username.innerHTML = "";
    email.innerHTML = "";
    country.innerHTML="";

    firstName.innerHTML = data.firstName;
    lastName.innerHTML=data.lastName;
    username.innerHTML = data.username;
    email.innerHTML = data.email;
    country.innerHTML=data.country;
}


async function deleteProfile() {
    const token = localStorage.getItem('token');
    await fetch("http://localhost:8081/profileDelete/", {
        method: "DELETE",
        headers:{
            'Content-Type': 'text/plain',
        },
        body: Email
    });
    window.location.href = '../homepage_login_register/login0.html';
    localStorage.removeItem(token);
}

function goBack(){
    window.history.back();
}