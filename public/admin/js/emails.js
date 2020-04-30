async function getEmails() {
    return await fetch('http://localhost:3000/emails').then((res) => res.json()).then((data) => data);
}

let emailBlock = document.querySelector('#v-pills-mails');
emailBlock.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-remove')) {
            let konfirmasi = confirm('Apakah anda Yakin Ingin menghapus ini?');
            if (konfirmasi) {
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('http://localhost:3000/emails/' + id, {
                method: 'DELETE'
            }).then((res) => res.text()).then((data) => window.history.go());
        }
    }
})