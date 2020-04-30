let createPostForm = document.querySelector('.create-post-form');
let createTitle = document.querySelector('#create-title');
let createCountry = document.querySelector('#create-country');
let createImage = document.querySelector('#create-image');
let createText = document.querySelector('#create-text');
let createImageFile = document.querySelector('#create-image-file');
createPostForm.addEventListener('submit', (e) => {
    let tex = createText.value;
    let data = new FormData();
    data.append('title', createTitle.value);
    data.append('country', createCountry.value);
    data.append('text', tex);
    data.append('description', tex.substring(0, 50));
    data.append('imageUrl', createImageFile.files[0]);

    e.preventDefault();
    fetch('http://localhost:3000/posts', {
        method: 'POST',
        body: data
    }).then((res) => res.text()).then((data) => window.history.go());
})
