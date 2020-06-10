var fs = require("fs");
var express = require("express");
var router = express.Router();

router.post("/", (req, res) =>{
    let account = req.body;

    fs.readFile(fileName, "utf8", (err, data) =>{
        
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
    });
});

router.get("/", (_, res) =>{
    fs.readFile(fileName, "utf8", (err, data) =>{
        try{
            if(err) throw err;
            let json = JSON.parse(data);
            delete json.nextId;
            
            res.send(json);
        }catch (err){
            res.status(400).send({ error: err.message });            
        }
    });
});

router.get("/:id", (req, res) => {

        fs.readFile(fileName, "utf8", (err, data) =>{
            try{
                if(err) throw err;

                    let json = JSON.parse(data);
                    const account = json.accounts.find(account => account.id === parseInt(req.params.id));
                    
                    if(account){
                        res.send(account);
                    }else{
                        res.end();
                    }
            } catch (err){
                res.status(400).send({ error: err.message })
            }
        });
});

router.delete("/:id", (req, res) => {
    fs.readFile(fileName, "utf8", (err, data) =>{
        try{
            if(err) throw err;
            let json = JSON.parse(data);
            const accounts = json.accounts.filter(account => account.id !== parseInt(req.params.id));
            json.accounts = accounts;

            fs.writeFile(fileName, JSON.stringify(json), err => {
                if (err) {
                    console.log(err);
                }else {
                    res.end();
                }
            });

        } catch (err){
            res.status(400).send({ error: err.message })
        }
    });
});


module.exports = router;