const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

app.use('/', express.static('js'))
app.use('/', express.static('css'))
app.use('/', express.static('dados'))
app.engine('html', require('ejs').renderFile)

app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

app.get('/', (req, res) => {
    res.render('home.html')
})

app.route('/login')
    .get((req, res) => {
        res.render('login.html')
    })
    .post((req, res) => {
        if(req.body.usuario == 'admin' && req.body.senha == '123') {
            res.sendStatus(200)
            return
        }
        res.sendStatus(403)
    })


app.route('/cadastra_testes')
    .get((req, res) => {
        res.render('cadastra_testes.html')
    })
    .post((req, res) => {
        file = fs.readFileSync(path.resolve(__dirname + '/dados/testes.json'), 'utf-8')
        testes = JSON.parse(file)
        testes.push({
            "titulo": req.body.titulo,
            "perguntas": []
        })
        fs.writeFileSync(path.resolve(__dirname + '/dados/testes.json'), JSON.stringify(testes))
        res.sendStatus(200)
    })

app.route('/cadastra_perguntas/:titulo')
    .get((req, res) => {
        res.render('cadastra_perguntas.html')
    })
    .post((req, res) => {
        testes = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/dados/testes.json'), 'utf-8'))
        testes.forEach(e => {
            if(e.titulo === req.params.titulo) {
                e.perguntas.push(req.body)
            }
        })
        fs.writeFileSync(path.resolve(__dirname + '/dados/testes.json'), JSON.stringify(testes))
        res.sendStatus(200)
    })

app.get('/lista_testes', (req, res) => {
    res.render('lista_testes.html')
})

app.route('/realiza_pergunta/:titulo')
    .get((req, res) => {
        res.render('realiza_pergunta.html')
    })

app.post('/resultado/:titulo', (req, res) => {
    resultado = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/dados/resultados.json'), 'utf-8'))
    existe = false
    resultado.forEach(e => {
        if (e.teste == req.params.titulo) {
            e.qnt_respostas += req.body.qnt_respostas
            e.qnt_acertos += req.body.qnt_acertos
            fs.writeFileSync(path.resolve(__dirname + '/dados/resultados.json'), JSON.stringify(resultado))
            existe = true
            return
        }
    })
    if(!existe) {
        resultado.push(req.body)
        fs.writeFileSync(path.resolve(__dirname + '/dados/resultados.json'), JSON.stringify(resultado))
    }
    res.sendStatus(200)
})

app.get('/apresenta_resultado/:titulo', (req, res) => {
    res.render('apresenta_resultado.html')
})

app.get('/lista_resultados', (req, res) => {
    res.render('lista_resultados.html')
})

app.get('/testes', (req, res) => {
    testes = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/dados/testes.json'), 'utf-8'))
    
    res.json(testes)
})

app.get('/resultados', (req, res) => {
    resultados = JSON.parse(fs.readFileSync(path.resolve(__dirname + '/dados/resultados.json'), 'utf-8'))

    res.json(resultados)
})
    

app.listen(8000, () => {
    console.log(`servidor funcionando, local http://localhost:8000`)
})