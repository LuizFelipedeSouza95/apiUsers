const express = require("express")
const bodyParser = require('body-parser').json();
const app = express()
const PORT = 3000

const users = [
    {
        "id": 1,
        "email" : "luizfelipedesouza94@gmail.com",
        "senha" : "061730Abra?"
    }
]

app.get("/", bodyParser, async function (req, res) {
    return users.length > 0
        ? res.status(200).json("Online server!!!")
        : res.status(204).send();
});

app.get("/verify", bodyParser, async function (req, res) {
    const { email, senha } = req.body
    const teste = { email, senha }
    let regex = /(?=.*\d)(?=.*[}{,.$^?~=+\-_\/*\-+.\|])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9a-zA-Z$*&@#]).{8,}/;
    const validacaoSenha = regex.test(teste.senha)

    const messages = async () => {
        const errorSenha = {
            "Sua senha deve conter": [
                "- 8 caracteres no mínimo",
                "- 1 Letra Maiúscula no mínimo",
                "- 1 Número no mínimo",
                "- 1 Símbolo no mínimo"
            ]
        }
        const sucessLogin = [
            "Sucesso no login"
        ]
        const semDados = [
            "Insira um ausuario e uma senha"
        ]
        return {
            errorSenha,
            sucessLogin,
            semDados
        }
    }

    const message = await messages()

    if (!email || !senha) {
        return res.status(400).send(message.semDados)
    } else if (validacaoSenha == true) {
        return res.status(200).send(message.sucessLogin)
    } else if (validacaoSenha == false) {
        return res.status(401).send(message.errorSenha)
    } else {
        return res.status(200).send(teste)
    }

})

app.get("/createUsers", bodyParser, async function (req, res) {

    const id = users.length+1
    const { email, senha } = req.body
    const InsertUsers = {
        id,
        Usuario: email,
        Senha: senha
    }
    const create = users.push(InsertUsers)

    if (create) {
        return res.status(201).send()
    } else {
        return res.status(404).send()
    }

});

app.get("/searchAll", bodyParser, async function (req, res) {
    return users.length > 0
        ? res.status(200).json(users)
        : res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Online server at the door ${PORT} ctrl click to access --> http://localhost:${PORT}/`)
})