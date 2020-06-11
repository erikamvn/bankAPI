var express = require("express");
var fs = require("fs").promises;
var app = express();
var accountsRouter = require("./routes/accounts.js")

global.fileName = "accounts.json";

app.use(express.json());
app.use("/account", accountsRouter);


app.listen(3000, async () => {

    try{
        await fs.readFile(global.fileName, "utf8");
    } catch (err){
        const initialJson = {
            nextId: 1,
            accounts: []
        };
        fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch(err => {
            console.log(err);
        });
    }

    console.log("Api Started!");
});