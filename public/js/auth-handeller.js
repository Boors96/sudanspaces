
const reg_form = document.getElementById('reg-form');

const img_hodlder = document.getElementById('avatar-bg');

const image_input = document.getElementById('user_image');

reg_form.addEventListener('submit', registerUser)

async function registerUser(event){
    event.preventDefault()
    const error_msg = document.getElementById('error-msg')
    error_msg.style.display = 'none';
    var avatar;
    if (image_input.files[0]) {
        avatar = image_input.files[0]
    } else {
        avatar = 'undefined'
    }
    let form_data = new FormData(reg_form)
    const username = document.getElementById('username').value;
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    
    form_data.append('username', username);
    form_data.append('full_name', full_name);
    form_data.append('email', email);
    form_data.append('password', password);
    form_data.append('confirm_password', confirm_password);
    form_data.append('avatar', avatar);
    console.log(form_data.values())
    const result = await fetch('auth/register',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: form_data
        
    }).then(res => res.json());
    console.log(result);
    if (result.status !== 200) {
        let err_msg = result.message
        if (result.status === 500) {
            err_msg = "Unknown error! try again!"
        }
        document.getElementById('password').value = ''
        document.getElementById('confirm_password').value = ''
        const error_msg = document.getElementById('error-msg')
        error_msg.innerHTML = err_msg;
        error_msg.style.display = 'block';
        return
    }

    localStorage.setItem('token', result.accessToken); 
    console.log(localStorage.getItem('token'));


}



function displayImg() {
    console.log(image_input.files[0].data)
    const reader = new FileReader();
    reader.addEventListener('load', () =>{
        uploaded_img = reader.result;
        
        img_hodlder.style.background= `url(${uploaded_img})`;
        img_hodlder.style.backgroundPosition= '50% 50%';
        img_hodlder.style.backgroundSize= 'cover';
    })
    reader.readAsDataURL(this.files[0]);
}



