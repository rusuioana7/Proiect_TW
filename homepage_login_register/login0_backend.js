const loginForm = document.querySelector("form.login")
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm)

    const loginData =
        {
            "email": formData.get("email"),
            "password": formData.get("password")
        }
        console.log(loginData)
    try {
        const response = await fetch("http://localhost:8081/api/auth/login",
            {
                method: "POST",
                headers:
                    {
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(loginData)
            })
        if (!response.ok) {
            console.log('An error occurred:', response.statusText);
            const err = document.querySelector('form.login .error');
            err.textContent = 'Invalid email or password!';
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
            const err = document.querySelector('form.login .error')
            err.classList.add('show')
        }
    } catch (error) {
        console.error('An error has occured', error.message)
    }
})
