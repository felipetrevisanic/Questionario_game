fetch('/resultados')
.then(req => {
    req.json()
    .then(res => {
        res.sort((a, b) => {
            return a.qnt_respostas < b.qnt_respostas
        })
        main = document.querySelector('.tela__resultado')
        res.forEach(e => {
            let div = document.createElement('div')
           div.className ="div__resultado"
            let teste = document.createElement('h2')
                teste.textContent = e.teste
            let qnt_respostas = document.createElement('p')
                qnt_respostas.innerHTML = 'Respostas: ' + e.qnt_respostas + '<br>'
            let qnt_acertos = document.createElement('p')
                qnt_acertos.textContent = 'Acertos: ' + e.qnt_acertos
            
            div.appendChild(teste)
            div.appendChild(qnt_respostas)
            div.appendChild(qnt_acertos)

            main.appendChild(div)
        })
        
    })
})