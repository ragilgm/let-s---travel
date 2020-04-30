let articlesBlcok = document.querySelector('.articles');
articlesBlcok.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-remove')) {
        let konfirmasi = confirm('Apakah anda Yakin Ingin menghapus ini?');
        if (konfirmasi) {
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('http://localhost:3000/posts/' + id, {
                method: 'DELETE'
            }).then((res) => res.text()).then(() => window.history.go());
        }
    }
})