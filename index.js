const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var DB = {
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
}

//listar todos games
app.get('/games',(req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

//listar game por id
app.get('/game/:id',(req, res) => {
   
    if(isNaN(req.params.id)){

        res.sendStatus(400);
    
    }else{

        var id = parseInt(req.params.id);
        var game = DB.games.find( g => g.id == id);
        
        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }else{
            res.sendStatus(404);
        }
    }
});

//cadastrar game
app.post("/game", (req, res)=>{
    
    var { title, year, price } = req.body;

    DB.games.push({
        id: 58,
        title,
        year,
        price
    });

    res.sendStatus(200);

});

//deletar game
app.delete("/game/:id",(req, res)=> {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = DB.games.findIndex(g => g.id == id);

         if(index == -1){
            res.sendStatus(404);
        }else{
            DB.games.splice(index, 1);
            res.sendStatus(200);
        }
    }
});

//edição de games
app.put("/game/:id", (req, res)=>{
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var game = DB.games.find( g => g.id == id);
        
        if(game != undefined){
            
            var {title, year, price} = req.body;

            if(title != undefined){
                game.title = title;
            }

            if(year != undefined){
                game.year = year;
            }

            if(price != undefined){
                game.price = price;
            }

            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }
});

app.listen(3040, ()=>{
    console.log("API Rodando!");
});