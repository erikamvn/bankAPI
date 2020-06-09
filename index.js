var express = require("express");
var fs = require("fs");
var app = express();
var accountsRouter = require("./routes/accounts.js")

global.fileName = "accounts.json";

app.use(express.json());
app.use("/account", accountsRouter);


app.listen(3000, function () {

    try{
        fs.readFile(fileName, "utf8", (err, data) => {
            if (err){
                const initialJson = {
                    nextId: 1,
                    accounts: []
                };
                fs.writeFile(fileName, JSON.stringify(initialJson), err => {
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
