const http = require('http');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
let contador = 2;
const porta = 3000;
app.set('port', porta);

app.get('/teste', (req, res, next) => {
    res.send("Olá");    
});

const server = http.createServer(app);
server.listen(3000);

/*
C - create (insert) - POST
R - retrieve (select) - GET
U - update - PUT
D - delete - DELETE
*/

const clientes = [
    {
        id: 1,
        nome: 'João',
        email: 'joao@email.com'
    },
    {
        id: 2,
        nome: 'Cristina',
        email: 'cristina@email.com'
    }
]

// Retrieve
app.get('/clientes', (req, res, next) => {
    res.json(clientes);
});

// Create
app.post('/clientes', (req, res, next) => {
    const cliente = req.body;
    clientes.push({id: contador += 1, nome: cliente.nome, email: cliente.email });
    console.log(clientes);
    res.status(201).json(clientes);
});

// Update
app.put('/clientes', (req, res, next) => {
    const novo = req.body;
    clientes.forEach((cliente) => {
        if(cliente.id === novo.id){
            cliente.nome = novo.nome;
            cliente.email = novo.email;
        }
    });
    console.log(clientes);
    res.status(200).json(clientes);
});

//Delete
app.delete('/clientes/:id', (req, res, next) => {
    const id_apagar = req.params.id;
    clientes.forEach((cliente, index) => {
        if(cliente.id == id_apagar){
            clientes.splice(index, 1);
        }
    });
    console.log(clientes);
    res.status(200).json(clientes);
});

//Retrieve com parâmetro
app.get('/clientes/:id', (req, res, next) => {
    const id_consultar = req.params.id;
    retorno = 'id ' + id_consultar + ' não encontrado'
    clientes.forEach((cliente) => {
        if(cliente.id == id_consultar){
            retorno = cliente;
        }
    });
    console.log(retorno);
    res.status(200).json(retorno);
});