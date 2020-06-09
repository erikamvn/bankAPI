var fs = require("fs");
var express = require("express");
var router = express.Router();

router.post("/", (req, res) =>{
    let account = req.body;

    fs.readFile(fileName, "utf8", (err, data) =>{
        if (!err){
            try{
                let json = JSON.parse(data);
                account = { id: json.nextId, ...account };
                json.nextId ++;
                json.accounts.push(account);

                fs.writeFile(fileName, JSON.stringify(json), err => {
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

router.get("/", (_, res) =>{
    fs.readFile(fileName, "utf8", (err, data) =>{
        if(!err){
            let json = JSON.parse(data);
            delete json.nextId;
        
            res.send(json);
        }else {
            res.status(400).send({ error: err.message });
        }
    });
});

router.get("/:id", (req, res) => {

        fs.readFile(fileName, "utf8", (err, data) =>{
            try{
                if(!err){
                    let json = JSON.parse(data);
                    const account = json.accounts.find(account => account.id === parseInt(req.params.id));
                    
                    if(account){
                        res.send(account);
                    }else{
                        res.end();
                    }
                }else {
                    res.status(400).send({ error: err.message });
                }
            } catch (err){
                res.status(400).send({ error: err.message })
            }
        });
});


module.exports = router;