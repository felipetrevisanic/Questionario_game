document.querySelector('.btn__enviar').addEventListener('click', (e) => {
    e.preventDefault()
    console.log("funciona")
    fetch('/login', {
        method: 'post',
        mode: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            usuario: document.getElementById('login').value,
            senha: document.getElementById('senha').value
        }) 
    })
    .then(res => {
        console.log("funciona")
        if(res.status === 200) {
            location.replace('/cadastra_testes')
        }
    })
})









// document.querySelector('.btn__enviar').addEventListener('submit', (e) => {
//     e.preventDefault()
//     fetch('/login', {
//         method: 'post',
//         mode: 'same-origin',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify({
//             usuario: document.getElementById('login').value,
//             senha: document.getElementById('senha').value
//         }) 
//     })
//     .then(res => {

//         location.replace('/cadastra_testes')

//     })
// })