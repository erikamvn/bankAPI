var express = require("express");
var fs = require("fs");

var app = express();

app.use(express.json());

app.post("/acount", (req, res) =>{
    let account = req.body;

    fs.readFile("accounts.json", "utf8", (err, data) =>{
        if (!err){
            try{
                let json = JSON.parse(data);
                account = { id: json.nextId, ...account };
                json.nextId ++;
                json.accounts.push(account);

                fs.writeFile("accounts.json", JSON.stringify(json), err => {
                    if (err) {
                        console.log(err);
                    }else {
                        res.end();
                    }
                });
            } catch (err){
                res.status(400).send({ error: err.menssage });    
            }
            
        }else {
            res.status(400).send({ error: err.menssage });
        }
    });
});


app.listen(3000, function () {

    try{
        fs.readFile("accounts.json", "utf8", (err, data) => {
            if (err){
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile("accounts.json", JSON.stringify(initialJson), err => {
                    if(err){
                        console.log(err)
                    }
                });
            }
        });
    } catch (err){
        console.log(err);
    }

    console.log("Api Started!");
});
