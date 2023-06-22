const registerForm = document.querySelector("form.register")
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm)
    const password = formData.get("password");
    const confirmPassword = formData.get("password2");

    if (password !== confirmPassword) {
        const err = document.querySelector('form.register .error');
        err.textContent = 'Passwords do not match.';
        err.style.display = 'block';
        return;
    }
    else{}
    const registerData =
        {
            "firstname": formData.get("firstname"),
            "lastname": formData.get("lastname"),
            "username": formData.get("username"),
            "email": formData.get("email"),
            "password": formData.get("password"),
            "country": formData.get("country")
        }
    console.log(registerData)
    try {
        const response = await fetch("http://localhost:8081/api/auth/register",
            {
                method: "POST",
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(registerData)
            })
        if (!response.ok) {
            console.log('An error occurred:', response.statusText);
            const err = document.querySelector('form.register .error');
            err.textContent = 'Email already used';
            err.style.display = 'block';
            return;
        }
        const data = await response.json()
        const token = data.token
        console.log(token)
        localStorage.setItem('token', token)
        if (token != null)
            window.location.href = 'homepage0.html'
        else {
            const err = document.querySelector('form.register .error')
            err.classList.add('show')
        }
    } catch (error) {
        console.error('An error has occured', error.message)
    }
})