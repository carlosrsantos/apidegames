const express = require('express');
const User = require('./models/User');
const Game = require('./models/Game');
const jwt = require('jsonwebtoken');

const route = express();

//palavra chave
const secret = "$Unavaibled@System.000";

//listar games
route.get('/games',auth,(req, res) => {
    res.statusCode = 200;
    Game.findAll().then( games => {
        res.json(games);
    });
});

function auth(req, res, next){
    const authToken = req.headers['authorization']; 
    if(authToken){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, secret, (err, data)=>{
            if(err){
                res.status(401);
            }else{
                req.token = token;
                req.loggedUser = { id: data.id, email: data.email };
                next();
            }
        });


    }else{
        res.status(401);
    }
    
}

//listar game por id
route.get('/game/:id',(req, res) => {
   
    if(isNaN(req.params.id)){

        res.sendStatus(400);
    
    }else{

        var id = parseInt(req.params.id);
       
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
route.post('/auth',(req, res)=>{

    var {email, password } = req.body;

    if(email){

        User.findOne({ where: { email }})
        .then(user => {        
                if(user.password == password){

                    //payload ... expiresIn não utilize valor alto
                    jwt.sign({ id: user.id, email: user.email },secret,{expiresIn:'48h'},(err, token)=>{
                        if(err){
                            res.status(400);
                            res.json({err:"Falha interna!"});
                        }else{
                            res.status(200);   
                            res.json({token: token});
                        }
                    });

                }else{
                    res.status(401);
                    res.json({err:"Credenciais inválidas!"});
                }
            })
        .catch(err =>{
            res.status(404);
            res.json({err:"O e-mail enviado não existe na base de dados!"});
        });
        
    }else{
        res.status(400);
        res.json({err: "O e-mail enviado é inválido!"});
    }   

});

module.exports = route;