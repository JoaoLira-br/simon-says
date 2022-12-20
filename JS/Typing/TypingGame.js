//Import fs to read in JSON file
const fs = require('fs');
var list = fs.readFileSync('./Typing/list.json');
//Parse list as JSON object
var listObj = JSON.parse(list);

//Create export to use in the server
module.exports = {
    //Set word function to the loop
    get word() {
        //Repeat loop if word is not found in list
        while(1){
            //Generate random number and initialize variables
            var num = Math.floor(Math.random() * 69894) + 1;
            var randWord;
            //Iterate through list until the JSON key matches num
            for(var i in listObj){
                if(num == i){
                    //Set word from list to randWord variable and return result
                    randWord = listObj[num];
                    return randWord;
                }
            }
        }
    }
};
