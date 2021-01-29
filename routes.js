const express = require('express');
const User = require('./models/User');
const Game = require('./models/Game');

const route = express();

//listar games
route.get('/games',(req, res) => {
    res.statusCode = 200;
    //res.json(DB.games);
    Game.findAll().then( games => {
        res.json(games);
    });
});

//listar game por id
route.get('/game/:id',(req, res) => {
   
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
route.post("/game",(req, res)=>{
    
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
route.delete("/game/:id",(req, res)=> {
   
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
route.put("/game/:id", (req, res)=>{
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
        });       
    }
});

//Autenticação de users
api.post('/auth',(req, res)=>{

    var {email, password } = req.body;

    if(email != undefined){

        var user = User.findOne({
            where:{ email }
        });

        if(user != undefined){

            if(user.password == password){

            }else{

            }

        }else{

        }
    }else{

    }

});

module.exports = route;