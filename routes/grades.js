var fs = require('fs').promises;
var express = require('express');
var router = express.Router();

router.post("/", async (req, res) => {
    let grade = req.body;

    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        let timestamp = new Date();
        grade = { id: json.nextId, ...grade, timestamp };

        json.nextId++;
        json.grades.push(grade);
        await fs.writeFile(global.fileName, JSON.stringify(json, null, 4));

        res.send(grade);

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});


router.get("/", async (_, res) => {
    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        delete json.nextId;

        res.send(json);

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    const gradeId = parseInt(req.params.id);

    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        let grade = json.grades.find(grade => grade.id === gradeId);

        if(grade){
            res.send(grade);
        }else{
            res.end();
        }
    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.put("/", async (req, res) => {
    const newGrade = req.body

    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        let index = json.grades.findIndex(grade => grade.id === newGrade.id);

        if (index < 0) throw new Error('grade não encontrada');

        json.grades[index] = newGrade;

        await fs.writeFile(fileName, JSON.stringify(json, null, 4));
        res.end();

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    const gradeId = parseInt(req.params.id);

    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);
        let grades = json.grades.filter(grade => grade.id !== gradeId);

        json.grades = grades;

        await fs.writeFile(fileName, JSON.stringify(json, null, 4));         
        res.end();
    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.post('/sumGrade', async(req, res) =>{
    const { student, subject } = req.body;

    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);

        studentGrades = json.grades.filter( grade => 
            (grade.student === student && grade.subject === subject));

        console.log(studentGrades);

        let grades = studentGrades.map(grade => grade.value);
        
        let sum = grades.reduce(function(sum, grade){
            return sum + grade;
        });

        res.send({sum});

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.post("/avgGrade", async(req, res) =>{
    const { subject, type } = req.body;
    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);

        studentGrades = json.grades.filter( grade => 
            (grade.subject === subject && grade.type === type));

        console.log(studentGrades);

        let grades = studentGrades.map(grade => grade.value);
        
        let sum = grades.reduce(function(sum, grade){
            return sum + grade;
        });

        let avg = sum / grades.length;

        res.send({avg});

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});

router.post("/bestGrades", async(req, res) =>{
    const { subject, type } = req.body;
    try{
        let data = await fs.readFile(global.fileName, "utf8");
        let json = JSON.parse(data);

        studentGrades = json.grades.filter( grade => 
            (grade.subject === subject && grade.type === type));

        studentGrades = studentGrades.sort((a, b) => b.value - a.value);
        console.log(studentGrades);
        studentGrades = studentGrades.slice(0,3);
        
        res.send(studentGrades);

    }catch (err){
        res.status(400).send({ error: err.message });
    }
});


module.exports = router;