const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
    games: [
        { 
            id: 1,
            name: "Call of duty",
            year: 2018,
            price: 90
        },
        { 
            id: 23,
            name: "Mortal Kombat",
            year: 2019,
            price: 112
        },
        { 
            id: 36,
            name: "GTA San Andreas",
            year: 2017,
            price: 65
        }
    ]
}

app.get('/games',(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get('/game/:id',(req, res) => {
   
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find( g => g.id === id);
        if(game != undefined){
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

app.listen(3040, ()=>{
    console.log("API Rodando!");
});