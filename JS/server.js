//Necessary imports for server
const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');

//Global variable to use in the Typing Game
var endTyping = false;
var getName = false;

const fs = require('fs');
var file = fs.readFileSync('./GameStats.json');
var stats = JSON.parse(file);
var netGamesType = stats.games_played.typing;
var netPointsType = stats.total_points.typing;
var netGamesPattern = stats.games_played.pattern;
var netPointsPattern = stats.total_points.pattern;

var newName = stats.tempName;
var newTName = stats.temptName;
var newScore = stats.tempScore;
newScore = parseInt(newScore);
var newTScore = stats.temptName;
newTScore = parseInt(newTScore);

//pattern players`s name
var patP1Name=stats.pPlayer1.player_name;
var patP2Name=stats.pPlayer2.player_name;
var patP3Name=stats.pPlayer3.player_name;
var patP4Name=stats.pPlayer4.player_name;
var patP5Name=stats.pPlayer5.player_name;
//pattern player`s score
var patP1Score = stats.pPlayer1.player_score;
patP1Score = parseInt(patP1Score);
var patP2Score = stats.pPlayer2.player_score;
patP2Score = parseInt(patP2Score);
var patP3Score = stats.pPlayer3.player_score;
patP3Score = parseInt(patP3Score);
var patP4Score = stats.pPlayer4.player_score;
patP4Score = parseInt(patP4Score);
var patP5Score = stats.pPlayer5.player_score;
patP5Score = parseInt(patP5Score);
//typing player`s name
var typP1Name=stats.tPlayer1.player_name;
var typP2Name=stats.tPlayer2.player_name;
var typP3Name=stats.tPlayer3.player_name;
var typP4Name=stats.tPlayer4.player_name;
var typP5Name=stats.tPlayer5.player_name;
//typing player`s score
var typP1Score=parseInt(stats.tPlayer1.player_score);
var typP2Score=parseInt(stats.tPlayer2.player_score);
var typP3Score=parseInt(stats.tPlayer3.player_score);
var typP4Score=parseInt(stats.tPlayer4.player_score);
var typP5Score=parseInt(stats.tPlayer5.player_score);


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Set response for homepage of server
app.get('/', (req, res) => {
    //Generic response to show up on successful request
    res.writeHead(200);
    res.end('Home Page');
})

//Repsonse for phrase of gameplay
app.post('/phrase', (req, res) => {
    //Reimport word on each request to ensure random generation
    const {word} = require('./Typing/TypingGame.js');
    //Set variable to the word
    var randWord = word;
    //Split request into separate variables
    var input = req.body.input;
    var phrase = req.body.phrase;
    var score = req.body.score;
    var diffId = req.body.diffId;
    //Parse the score as an integer
    var scoreNum = parseInt(score);
    //Check to see if scoreNum is a number
    if(isNaN(scoreNum)){
        //If not, set the variable equal to 0
        scoreNum = 0;
    }
    //If the user input and the phrase on the screen match, increase the score
    if(input === phrase && phrase !== ""){
        scoreNum += 10;
    }else if(score != 0 || (input !== phrase && phrase !== "")){
        //End condition reached
        //Alter score based on difficulty
        if(diffId === "hard"){
            score *= 2;
        }else if(diffId === "easy"){
            score /= 2;
        }
        netGamesType++;
        netPointsType += scoreNum;
        stats.games_played.typing = netGamesType;
        stats.total_points.typing = netPointsType;
        fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(stats));
            console.log('writing to ' + './GameStats.json');
        });
        scoreNum = 0;
        endTyping = true;
    }
    //Create response
    res.writeHead(200);
    //Add the scoreNum and endTyping variables to the response
    res.write(String(scoreNum) + "/" + endTyping + "/");
    //Reset end game to ensure the user can start a new game
    endTyping = false;
    //Add the new random word at the end of the response
    res.end(randWord);
})

//Handles updating the scores in the JSON
app.post('/patternScore', (req, res) => {
    //Set the JSON variables to the current server variables
    var player_1 = patP1Name; var score_1 = patP1Score;
    var player_2 = patP2Name; var score_2 = patP2Score;
    var player_3 = patP3Name; var score_3 = patP3Score;
    var player_4 = patP4Name; var score_4 = patP4Score;
    var player_5 = patP5Name; var score_5 = patP5Score;
    stats.pPlayer1.player_name = player_1; stats.pPlayer1.player_score = score_1;
    stats.pPlayer2.player_name = player_2; stats.pPlayer2.player_score = score_2;
    stats.pPlayer3.player_name = player_3; stats.pPlayer3.player_score = score_3;
    stats.pPlayer4.player_name = player_4; stats.pPlayer4.player_score = score_4;
    stats.pPlayer5.player_name = player_5; stats.pPlayer5.player_score = score_5;
    //Write to the JSON file
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
    //Send variables in the response
    res.writeHead(200);
    res.write(player_1 + "/" + player_2 + "/" + player_3 + "/" + player_4 + "/" + player_5 + "/" +
              score_1 + "/" + score_2 + "/" + score_3 + "/" + score_4 + "/" + score_5);
    res.end();
})

//Handles updating the scores in the JSON
app.post('/typingScore', (req, res) => {
    //Set the JSON variables to the current server variables
    var player_1 = typP1Name; var score_1 = typP1Score;
    var player_2 = typP2Name; var score_2 = typP2Score;
    var player_3 = typP3Name; var score_3 = typP3Score;
    var player_4 = typP4Name; var score_4 = typP4Score;
    var player_5 = typP5Name; var score_5 = typP5Score;
    stats.tPlayer1.player_name = player_1; stats.tPlayer1.player_score = score_1;
    stats.tPlayer2.player_name = player_2; stats.tPlayer2.player_score = score_2;
    stats.tPlayer3.player_name = player_3; stats.tPlayer3.player_score = score_3;
    stats.tPlayer4.player_name = player_4; stats.tPlayer4.player_score = score_4;
    stats.tPlayer5.player_name = player_5; stats.tPlayer5.player_score = score_5;
    //Write to the JSON file
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
    //Send variables in the response
    res.writeHead(200);
    res.write(player_1 + "/" + player_2 + "/" + player_3 + "/" + player_4 + "/" + player_5 + "/" +
              score_1 + "/" + score_2 + "/" + score_3 + "/" + score_4 + "/" + score_5);
    res.end();
})

//Check if user has a new high score
app.get('/checkPattern', (req, res) => {
    var patternNamePos = checkPatternScores();
    var needName = false;
    if(patternNamePos !== 0){
        needName = true;
    }
    res.writeHead(200);
    res.write(String(needName));
    res.end();
})

//Check if user has a new high score
app.get('/checkTyping', (req, res) => {
    var typingNamePos = checkTypingScores();
    var needName = false;
    if(typingNamePos !== 0){
        needName = true;
    }
    res.writeHead(200);
    res.write(String(needName));
    res.end();
})

//Check if score is larger than any current high scores
function checkPatternScores() {
    if (newScore > patP1Score) {
        return 1;
    }
    else if (newScore > patP2Score) {
        return 2;
    }
    else if (newScore > patP3Score) {
        return 3;
    }
    else if (newScore > patP4Score) {
        return 4;
    }
    else if (newScore > patP5Score) {
        return 5;
    }
    else {
        return 0;
    }
}

//Check if score is larger than any current high scores
function checkTypingScores() {
    if (newTScore > typP1Score) {
        return 1;
    }
    else if (newTScore > typP2Score) {
        return 2;
    }
    else if (newTScore > typP3Score) {
        return 3;
    }
    else if (newTScore > typP4Score) {
        return 4;
    }
    else if (newTScore > typP5Score) {
        return 5;
    }
    else {
        return 0;
    }
}

//Handles global user statistics
app.post('/stats', (req, res) => {
    var gameType = JSON.stringify(netGamesType);
    var pointType = JSON.stringify(netPointsType);
    var gamePattern = JSON.stringify(netGamesPattern);
    var pointPattern = JSON.stringify(netPointsPattern);

    res.writeHead(200);
    res.write(pointType + "/" + gameType + "/" + pointPattern + "/" + gamePattern);
    res.end();
})

//Update score for pattern game
app.post('/pScore', (req,res) => {
    newScore = req.body.score;
    newScore = parseInt(newScore);
    stats.tempScore = newScore;
    netGamesPattern += 1;
    netPointsPattern += newScore;
    stats.games_played.pattern = netGamesPattern;
    stats.total_points.pattern = netPointsPattern;
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
    res.writeHead(200);
    res.end();
})

//Update score for typing game
app.post('/tScore', (req,res) => {
    newTScore = req.body.score;
    newTScore = parseInt(newTScore);
    console.log(newTScore);
    stats.tempTScore = newTScore;
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
    res.writeHead(200);
    res.end();
})

//Update names for pattern game
app.post('/pName', (req, res) => {
    newName = req.body.name;
    stats.tempName = newName;
    var position = checkPatternScores();
    switch(position){
        case 1:
            patP5Name = patP4Name; patP5Score = patP4Score;
            patP4Name = patP3Name; patP4Score = patP3Score;
            patP3Name = patP2Name; patP3Score = patP2Score;
            patP2Name = patP1Name; patP2Score = patP1Score;
            patP1Name = newName; patP1Score = newScore;
            break;
        case 2:
            patP5Name = patP4Name; patP5Score = patP4Score;
            patP4Name = patP3Name; patP4Score = patP3Score;
            patP3Name = patP2Name; patP3Score = patP2Score;
            patP2Name = newName; patP2Score = newScore;
            break;
        case 3:
            patP5Name = patP4Name; patP5Score = patP4Score;
            patP4Name = patP3Name; patP4Score = patP3Score;
            patP3Name = newName; patP3Score = newScore;
            break;
        case 4:
            patP5Name = patP4Name; patP5Score = patP4Score;
            patP4Name = newName; patP4Score = newScore;
            break;
        case 5:
            patP5Name = newName; patP5Score = newScore;
            break;
        default:
            break;
    }
    //Write to JSON
    stats.pPlayer1.player_name = patP1Name; stats.pPlayer1.player_score = patP1Score;
    stats.pPlayer2.player_name = patP2Name; stats.pPlayer2.player_score = patP2Score;
    stats.pPlayer3.player_name = patP3Name; stats.pPlayer3.player_score = patP3Score;
    stats.pPlayer4.player_name = patP4Name; stats.pPlayer4.player_score = patP4Score;
    stats.pPlayer5.player_name = patP5Name; stats.pPlayer5.player_score = patP5Score;
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
})

//Update names for typing game
app.post('/tName', (req, res) => {
    newTName = req.body.name;
    stats.tempTName = newTName;
    var position = checkTypingScores();
    switch(position){
        case 1:
            typP5Name = typP4Name; typP5Score = typP4Score;
            typP4Name = typP3Name; typP4Score = typP3Score;
            typP3Name = typP2Name; typP3Score = typP2Score;
            typP2Name = typP1Name; typP2Score = typP1Score;
            typP1Name = newTName; typP1Score = newTScore;
            break;
        case 2:
            typP5Name = typP4Name; typP5Score = typP4Score;
            typP4Name = typP3Name; typP4Score = typP3Score;
            typP3Name = typP2Name; typP3Score = typP2Score;
            typP2Name = newTName; typP2Score = newTScore;
            break;
        case 3:
            typP5Name = typP4Name; typP5Score = typP4Score;
            typP4Name = typP3Name; typP4Score = typP3Score;
            typP3Name = newTName; typP3Score = newTScore;
            break;
        case 4:
            typP5Name = typP4Name; typP5Score = typP4Score;
            typP4Name = newTName; typP4Score = newTScore;
            break;
        case 5:
            typP5Name = newTName; typP5Score = newTScore;
            break;
        default:
            break;
    }
    //Write to JSON
    stats.tPlayer1.player_name = typP1Name; stats.tPlayer1.player_score = typP1Score;
    stats.tPlayer2.player_name = typP2Name; stats.tPlayer2.player_score = typP2Score;
    stats.tPlayer3.player_name = typP3Name; stats.tPlayer3.player_score = typP3Score;
    stats.tPlayer4.player_name = typP4Name; stats.tPlayer4.player_score = typP4Score;
    stats.tPlayer5.player_name = typP5Name; stats.tPlayer5.player_score = typP5Score;
    fs.writeFile('./GameStats.json', JSON.stringify(stats), function writeJSON(err) {
        if (err) return console.log(err);
    });
})

//Start server
app.listen(8080, () => {
    //Message to ensure server has started correctly
    console.log('Server running on port 8080');
})
