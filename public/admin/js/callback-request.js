async function getCallbackRequest() {
    return await fetch('http://localhost:3000/callback-request/').then((res) => res.json()).then((data) => data);
}

let requestBlcok = document.querySelector('#v-pills-callback');
requestBlcok.addEventListener('click', (e) => {
    
        if (e.target.classList.contains('btn-remove')) {
            let konfirmasi = confirm('Confirm for delete ?');
            if(konfirmasi){
            let id = e.target.parentNode.parentNode.querySelector('.id').value;
            fetch('http://localhost:3000/callback-request/' + id, {
                method: 'DELETE'
            }).then((res) => res.text()).then((data) => window.history.go());
        }
    }
    
})

