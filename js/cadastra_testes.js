fetch('/testes')
.then(req => {
    req.json()
    .then(res => {
        for(teste of res) {
            const a = document.createElement('a')
            const div = document.querySelector('.listagem_testes')
            a.innerHTML = teste.titulo + '<br>'
            a.href = `/cadastra_perguntas/${teste.titulo}`
            div.appendChild(a)
        }
    })
})

document.querySelector('#botao')
.addEventListener('click', () => {
    if(document.querySelector('#titulo').value.length > 0) {
        fetch('/cadastra_testes', {
            method: 'post',
            mode: 'same-origin',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({titulo: document.querySelector('#titulo').value})
        })
        .then(() => {
            document.location.replace(`/cadastra_perguntas/${document.querySelector('#titulo').value}`)
        })
    }
})