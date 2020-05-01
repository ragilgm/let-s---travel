let loginForm = document.querySelector('.login-form');
let registerForm = document.querySelector('.register-form');


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;
    fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((res) => {
        if(res.status === 404){
            return new Error();
        }
        return  res.json();

    }).then((data) => {
        window.location.href = data.redirectURL;
    }).catch(()=> alert('wrong email or password'));
});
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let Repassword = document.getElementById('register-re-password').value;
    if(password !== Repassword){
        alert('Password not match');
        return window.history.go();
    }
    fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            Repassword : Repassword
        })
    }).then((res) => res.text()).then((data) => alert(data));
});