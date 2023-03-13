const form = document.querySelector('form')
const errorAlert = document.querySelector('#alert')
const closeAlert = document.querySelector('.close')

form.addEventListener('submit', handleAuth)

async function handleAuth (e) {
    e.preventDefault();

    try {
        const data = new FormData(e.target);
        const response = await fetch('/signin', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            body: new URLSearchParams(data)
        })
        const json = await response.json()
        
        if (response.ok) {
            localStorage.setItem('jwtToken', json.token)
            location.href = '/redirect?to=/provas&token=' + json.token
        }
        else {
            throw(json.error)
        }
    } catch (error) {
        displayError(error)
    }
    
}

async function displayError(error) {
    let message;
    if (error?.status === 400) {
        message = 'E-mail ou senha inválidos.'
    }
    else if (!error.status) {
        message = `Ocorreu um erro.`
    }
    else {
        message = `Status ${error.status}. ${error.message}`
    }
    errorAlert.firstElementChild.innerText = message
    errorAlert.classList.remove('d-none')
}

closeAlert.addEventListener('click', e => {
    errorAlert.classList.add('d-none')
})