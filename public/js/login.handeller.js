
const login_form = document.getElementById('form-login');

login_form.addEventListener('submit', logUser)

async function logUser(event){
    console.log("login")
    event.preventDefault()
    const error_msg = document.getElementById('error-msg')
    error_msg.style.display = 'none';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const result = await fetch('auth/login',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then(res => res.json());
    console.log(result);
    if (result.status !== 200) {
        let err_msg = result.message
        if (result.status === 500) {
            err_msg = "Unknown error! try again!"
        }
        document.getElementById('password').value = ''
        const error_msg = document.getElementById('error-msg')
        error_msg.innerHTML = err_msg;
        error_msg.style.display = 'block';
        return
    }

}
