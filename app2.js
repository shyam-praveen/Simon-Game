const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost:27017/gameDB");

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    MaxScore: Number
});

const Game = new mongoose.model("score", gameSchema);

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/game",(req,res)=>{
    res.render("game",{gamer: user});
})

app.get("/start",(req,res)=>{
    res.render("start");
})
let user;
app.post("/start",async (req,res)=>{
    let username = req.body.userName;
    let find = false;
    const resp = await Game.find();
    // const resData =await resp.json();
    console.log(resp);
    // console.log(resData);
        
    // console.log(user);
    // if(!find){
    //     user = new Game({
    //         name: username,
    //         MaxScore: 0
    //     });
    //     user.save();
    // }
    resp.forEach(gamer => {
        if(gamer.name === username){
            user = gamer;
        }
    });
    console.log(user);
      
    res.redirect("/game");
})

app.post("/game",(req,res)=>{
    let nameusers = req.body.name;
    let nameusersscore = req.body.MaxLevel;
    Game.updateOne({name: nameusers}, {MaxScore: nameusersscore}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Updated Successfully");
        }
    })
    res.redirect("/scorecard");

})

app.get("/scorecard",(req,res)=>{
    let gamerdata = [];
    Game.find(function(err,data){
        if(err){
            console.log(err);
        }else
        {
            res.render("scorecard",{scores: data});
        }
    })
   
    // res.render("scorecard",{scores: gamerdata});
})

app.listen(3000,()=>{
    console.log("Listenting in Port no 3000");
})