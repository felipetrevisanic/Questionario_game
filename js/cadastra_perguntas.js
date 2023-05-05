nome_do_teste = document.location.pathname.split('/')[2]
h1 = document.querySelector('.titulo')
h1.textContent = nome_do_teste


document.querySelector('#btn__enviar')
.addEventListener('click', () => {
    let opcao;
    document.querySelectorAll('.opcoes').forEach(e => {
        if(e.checked) {
            opcao = e
        }
    })

    fetch(`/cadastra_perguntas/${nome_do_teste}`,{
        method: 'post',
        mode: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            pergunta: document.querySelector('#pergunta').value,
            opcao_a: document.querySelector('#input_a').value,
            opcao_b: document.querySelector('#input_b').value,
            opcao_c: document.querySelector('#input_c').value,
            opcao_d: document.querySelector('#input_d').value,
            opcao_e: document.querySelector('#input_e').value,
            opcao_correta: opcao.id
        })
    })
    document.querySelector('#pergunta').value = ''
    document.querySelector('#input_a').value = ''
    document.querySelector('#input_b').value = ''
    document.querySelector('#input_c').value = ''
    document.querySelector('#input_d').value = ''
    document.querySelector('#input_e').value = ''
})