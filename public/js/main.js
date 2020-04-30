document.addEventListener('DOMContentLoaded',async ()=>{
    let posts = await getPost();
    let articles = document.querySelector('.articles');
    articles.innerHTML = '';
    posts.forEach((post) => {
        let postHTML = `<div class="col-lg-4">
        <div class="card" >
              <img src="${post.imageUrl}" class="card-img-top" alt="${post.title}">
                  <div class="card-body">
                      <h4 class="card-title">${post.title}</h4>
                    <p class="card-text">${post.description} ....</p>
                    <a href="/sight?id=${post.id}" class="btn btn-primary">Details</a>
                </div>
        </div>
    </div>`;
        articles.insertAdjacentHTML('beforeend', postHTML);
    });
})
