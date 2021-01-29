const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes');
const connection = require('./database');

//importa models
const Game = require('./models/Game');
const User = require('./models/User');

//cors - para liberar o acesso da API para outros domínios na WEB
app.use(cors());

//bodyparser - converte os dados da requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//acesso a route
app.use('/', route);

//conexão com o banco de dados
connection
    .authenticate()
    .then(()=>{

    })
    .catch((error)=>{
        console.log(error);
    });


app.listen(3040, ()=>{
    console.log("API Rodando!");
});