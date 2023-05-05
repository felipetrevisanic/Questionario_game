nome_do_teste = document.location.pathname.split('/')[2]
resposta_certa = null
qnt_respostas = 0
qnt_acertos = 0

function mudaPergunta() {
    fetch('/testes')
    .then(req => {
        req.json()
        .then(res => {
            res.forEach(e => {
                if(e.titulo == nome_do_teste) {
                    pergunta_random = e.perguntas[randomNum(0, e.perguntas.length)]
                    document.querySelector('.descricao').textContent = pergunta_random.pergunta

                    document.querySelector('#lbl_opcao_a').textContent = pergunta_random.opcao_a
                    document.querySelector('#lbl_opcao_b').textContent = pergunta_random.opcao_b
                    document.querySelector('#lbl_opcao_c').textContent = pergunta_random.opcao_c
                    document.querySelector('#lbl_opcao_d').textContent = pergunta_random.opcao_d
                    document.querySelector('#lbl_opcao_e').textContent = pergunta_random.opcao_e

                    resposta_certa = pergunta_random.opcao_correta
                }
            })
        })
    })
}


document.querySelector('#responder')
.addEventListener('click', () => {
    let resposta = null

    qnt_respostas++
    document.querySelectorAll('.opcoes').forEach(e => {
        if(e.checked) {
            resposta = e
        }
    })
    if(resposta.id[6] == resposta_certa) {
        qnt_acertos++
    }
    mudaPergunta()
})

document.querySelector('#parar')
.addEventListener('click', () => {
    console.log('clico')
    fetch(`/resultado/${nome_do_teste}`,{
        method: 'post',
        mode: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            teste: nome_do_teste,
            qnt_respostas: qnt_respostas,
            qnt_acertos: qnt_acertos
        })
    })
    .then(() => {
        document.location.replace(`/apresenta_resultado/${nome_do_teste}`)
        console.log(nome_do_teste)
    })
})
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min
}

mudaPergunta()