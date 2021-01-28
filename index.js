const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./database');

//importa a model Game
const Game = require('./model/Game');

//cors - para liberar o acesso da API para outros domínios na WEB
app.use(cors());

//bodyparser - converte os dados da requisição
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//conexão com o banco de dados
connection
    .authenticate()
    .then(()=>{

    })
    .catch((error)=>{
        console.log(error);
    });
/* var DB = {
    games: [
        { 
            id: 1,
            title: "Call of duty",
            year: 2018,
            price: 90
        },
        { 
            id: 23,
            title: "Mortal Kombat",
            year: 2019,
            price: 112
        },
        { 
            id: 36,
            title: "GTA San Andreas",
            year: 2017,
            price: 65
        }
    ]
} */

//listar todos games
app.get('/games',(req, res) => {
    res.statusCode = 200;
    //res.json(DB.games);
    Game.findAll().then( games => {
        res.json(games);
    });
});

//listar game por id
app.get('/game/:id',(req, res) => {
   
    if(isNaN(req.params.id)){

        res.sendStatus(400);
    
    }else{

        var id = parseInt(req.params.id);
       // var game = Game.find( g => g.id == id);
        Game.findByPk(id).then(game => {        
                if(game != undefined){
                    res.statusCode = 200;   
                    res.json(game)
                }else{
                    res.sendStatus(404);
                }
            }
        ).catch(erro =>{
            res.sendStatus(404);
        });
    }
});

//cadastrar game
app.post("/game",(req, res)=>{
    
    var { title, year, price } = req.body;

    if(title != undefined){
        Game.create({
            title, year, price
        }).then(()=>{
            res.sendStatus(200);
        });
    }else{
        res.sendStatus(400);
    }
});

//deletar game
app.delete("/game/:id",(req, res)=> {
   
     if(isNaN(req.params.id)){

        res.sendStatus(400);
    
    }else{

        var id = parseInt(req.params.id);
        Game.findByPk(id).then(game => {        
                if(game != undefined){
                    Game.destroy({
                        where:{
                            id: id
                        }
                    });
                    res.sendStatus(200);
                }else{
                    res.sendStatus(404);
                }
            }
        ).catch(erro =>{
            res.sendStatus(404);
        });
        
    }
});

//edição de games
app.put("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        //var game = DB.games.find( g => g.id == id);
        Game.findByPk(id).then(game => {
            if(game != undefined){
            
                var {title, year, price} = req.body;

                if((title != undefined) || (price != undefined)){
                    Game.update({
                        title, year, price
                        },
                        {
                            where: {
                                id
                            }
                        }
                    );
                
                    res.sendStatus(200);
                }else{
                    res.sendStatus(404);
                }

            }else{
            res.sendStatus(404);
        }
        })
        

           
    }
});

app.listen(3040, ()=>{
    console.log("API Rodando!");
});