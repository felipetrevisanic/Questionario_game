fetch('/testes')
.then(req => {
    req.json()
    .then(res => {
        res.forEach(teste => {
            let item = document.createElement('li')
            let a = document.createElement('a')
            item.className = 'lista__item'
            a.className = 'lista__link'
            item.appendChild(a)
            let lista = document.querySelector('.lista')
            a.innerHTML = teste.titulo + '<br>'
            a.href = `/realiza_pergunta/${teste.titulo}`
            lista.appendChild(item)
        });
    })
})