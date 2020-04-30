let addPostBtn = document.querySelector('.create-post-btn');
let logoutBtn = document.querySelector('.Logout-btn');

document.addEventListener('DOMContentLoaded', async () => {
    addPost();
    addCallbackRequest();
    addEmails();

})

addPostBtn.addEventListener('click', () => {
    let articleTab = document.getElementById('v-pills-articles');
    articleTab.classList.remove('show');
    articleTab.classList.remove('active');
    let createTab = document.getElementById('v-pills-create-post');
    createTab.classList.add('show');
    createTab.classList.add('active');

})

async function addPost() {
    let posts = await getPost();
    let articles = document.querySelector('.articles');
    let i = 1;
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `<article class="d-flex justify-content-between align-items-center inline-article">
        <div class="num w5">${i++}</div>
        <input type="hidden" class="id" value="${post.id}">
        <div class="name w30">${post.title}</div>
        <div class="date w30">${post.date}</div>
        <div class="country w20">${post.country}</div>
        <div class="edit btn btn-link w10 btn-edit">Edit</div>
        <div class="remove btn btn-link w5 btn-remove">X</div>
        </article>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
}

async function addCallbackRequest() {
    let RequestCallback = await getCallbackRequest();
    let RequestBlock = document.querySelector('#v-pills-callback');
    let i = 1;
    RequestBlock.innerHTML = '';
    RequestCallback.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between align-items-center inline-article">
        <div class="num w5">${i++}</div>
        <input type="hidden" class="id" value="${request.id}">
        <div class="name w60">${request.phoneNumber}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove btn btn-link w5 btn-remove">X</div>
        </article>`;
        RequestBlock.insertAdjacentHTML('beforeend', requestHTML);
    });
}

async function addEmails() {
    let requests = await getEmails();
    let emailBlock = document.querySelector('#v-pills-mails');
    let i = 1;
    emailBlock.innerHTML = '';
    requests.forEach((request) => {
        let requestHTML = `<article class="d-flex justify-content-between align-items-center inline-article">
        <div class="num w5">${i++}</div>
        <input type="hidden" class="id" value="${request.id}">
        <div class="name w30">${request.name}</div>
        <div class="email w30">${request.email}</div>
        <div class="date w30">${request.date}</div>
        <div class="remove btn btn-link w5 btn-remove">X</div>
        <div class="text w100">Message : <br>${request.text}</div>
        </article>`;
        emailBlock.insertAdjacentHTML('beforeend', requestHTML);
    });
}

let callMeForm = document.querySelector('.call-me-form');
callMeForm.addEventListener('submit', (e) => {
    let phoneInput = document.querySelector('input');
    e.preventDefault();
    fetch('http://localhost:3000/callback-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phoneNumber: phoneInput.value
        })
    }).then((resp) => resp.text()).then(() => alert('we will call back you as soon as possible'), window.history.go());

})

logoutBtn.addEventListener('click', () => {
    document.cookie.split(";").forEach(function (c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
})