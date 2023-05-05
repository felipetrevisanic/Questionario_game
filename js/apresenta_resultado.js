nome_do_teste = document.location.pathname.split('/')[2]
document.querySelector('.titulo').textContent = nome_do_teste

fetch('/testes')
.then(req => {
    req.json()
    .then(res => {
        main = document.querySelector('main')
        teste = null
        res.forEach(e => {

            if(e.titulo == nome_do_teste) {
                teste = e
            }
        })
        teste.perguntas.forEach(e => {
            div = document.createElement('div')
            
            h2 = document.createElement('h2')
                h2.textContent = e.pergunta
            opcao_a = document.createElement('p')
                opcao_a.textContent = 'A) ' + e.opcao_a
            opcao_b = document.createElement('p')
                opcao_b.textContent = 'B) ' + e.opcao_b
            opcao_c = document.createElement('p')
                opcao_c.textContent = 'C) ' + e.opcao_c
            opcao_d = document.createElement('p')
                opcao_d.textContent = 'D) ' +e.opcao_d
            opcao_e = document.createElement('p')
                opcao_e.textContent = 'E) ' +e.opcao_e
            opcao_correta = document.createElement('p')
                opcao_correta.textContent = 'Opção correta: ' + e.opcao_correta.toUpperCase()

            div.appendChild(h2)
            div.appendChild(opcao_a)
            div.appendChild(opcao_b)
            div.appendChild(opcao_c)
            div.appendChild(opcao_d)
            div.appendChild(opcao_e)
            div.appendChild(opcao_correta)

            main.appendChild(div)
        })
    })
})