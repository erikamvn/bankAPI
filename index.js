var express = require('express');
var fs = require('fs').promises;
var app = express();
var gradesRouter = require('./routes/grades.js');

global.fileName = "grades.json";

app.use(express.json());
app.use('/grade', gradesRouter);

app.listen(3000, async () => {
    try{
        await fs.readFile(global.fileName, "utf8");
    }catch (err){
        console.log("Atenção o arquivo grades.json não existe no sistema");
    }

    console.log("Api started!");
});
