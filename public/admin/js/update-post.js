{
    let articlesBlock = document.querySelector('.articles');
    let updateForm = document.querySelector('.update-post-form')

    let titleInp = document.querySelector('#update-title');
    let textArea = document.querySelector('#update-text');
    let id; 

    articlesBlock.addEventListener('click', async (e) => {
        id = e.target.parentNode.querySelector('.id').value;
        if (e.target.classList.contains('btn-edit')) {

            let postInfo = await fetch('http://localhost:3000/posts/' + id).then((res) => res.json()).then((data) => data);
            console.log(id);

            titleInp.value = postInfo.title;

            textArea.value = postInfo.text;

            let articleTab = document.getElementById('v-pills-articles');
            articleTab.classList.remove('show');
            articleTab.classList.remove('active');
            let updateTab = document.getElementById('v-pills-update-post');
            updateTab.classList.add('show');
            updateTab.classList.add('active');
        }
    })


updateForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/posts/'+id, {
        method: 'PUT',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title: titleInp.value,
            text: textArea.value,
            description: textArea.value.substring(0,50)
        })

    }).then((res) => res.text()).then((data) => window.history.go());
})
}