const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const _ = require("lodash")

mongoose.connect("mongodb+srv://admin_Shyam:test789@cluster0.r7ofm.mongodb.net/gameDB?retryWrites=true&w=majority");
// mongoose.connect("mongodb://localhost:27017/gameDB");

const gameSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    gmail:{
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

app.get("/game",async (req,res)=>{
    let username = req.query.param1;
    let mail = req.query.param2;
    mail = _.toLower(mail);
    
    // console.log(username);
    // console.log(mail);
    const data = await Game.find();

    data.forEach(gamer => {
        if(gamer.name === username && gamer.gmail === mail)
        {
            // console.log("Hello");
            user = gamer;
            res.render("game",{gamer: user});
        }
    });
    // console.log("user");
})

app.get("/start",(req,res)=>{
    res.render("start");
})
let user;
app.post("/start",async (req,res)=>{
    let username = req.body.userName;
    let mail = req.body.userMail;
    mail = _.toLower(mail);
    let find = false;
    const data = await Game.find();

    data.forEach(gamer => {
        if(gamer.name === username && gamer.gmail === mail)
        {
            user = gamer;
            find = true;
        }
    });
    if(!find){
        user = new Game({
            name: username,
            gmail: mail,
            MaxScore: 0
        });
        user.save();
    }
    let s = "/game?param1=";
    s+=username;
    s+="&param2=";
    s+=mail;

    res.redirect(s);
})

app.post("/game",async (req,res)=>{
    
    let nameusers = req.body.name;
    let nameusersscore = req.body.MaxLevel;
    let mail = req.body.userMail;
    let way = req.body.btncov;
    Game.updateOne({'name': nameusers, 'gmail': mail}, {MaxScore: nameusersscore}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Updated Successfully");
        }
    })

    const data = await Game.find();

    // data.forEach(gamer => {
    //     if(gamer.name === nameusers && gamer.gmail === mail)
    //     {
    //         console.log(gamer);
    //     }
    // });

    let s = "";
    s+=nameusers;
    s+="&param2=";
    s+=mail;
    if(way === "game"){
        let gameString = "/game?param1=";
        gameString+=s;
        res.redirect(gameString);
    }
    else if(way === "Score"){
        let scoreString = "/scorecard?param1=";
        scoreString += s;
        res.redirect(scoreString);
    }

})

app.get("/scorecard",async (req,res)=>{

    const data2 = await Game.find().sort({MaxScore: -1});
    let userGame = "/game?param1=";
    userGame += req.query.param1;
    userGame += "&param2=";
    userGame += req.query.param2;
    res.render("score2",{scores: data2, user : userGame});
})

app.get("/score2", (req, res)=>{
    res.render("score2");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}


app.listen(port,()=>{
    console.log("App has started Successfully");
})