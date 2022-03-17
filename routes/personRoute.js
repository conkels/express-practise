const router = require("express").Router();
const Person = require("../db");

router.get("/", (req, res) => {
    res.send("Hello, my name is CK!");
})

let names = ['CK', 'AH', 'CS', 'TM', 'KH'];

router.get("/getAll", (req, res, next) => {
    Person.find().then((results) =>  {
        return res.json(names);
    }).catch(err => next({status: 400, message: err.message}));

});


router.get("/get/:id", (req, res, next) => {
    const id = Number.parseInt(req.params.id);
    if (id == null || undefined || id === NaN) 
    return next({ status: 400, message: "Invalid id" });
    else if (id > names.length) 
    return next({ status: 404, message: "No person found with id " + id });
    res.send(names[req.params.id])
});

router.delete("/delete/:id", (req, res) => res.send(names.splice(req.params.id, 1)));

router.post("/create", (req, res, next) => {
    const person = req.body;
    new Person(person).save().then(() => {
        res.status(201).send("Successfully created");
    }).catch(err => next({status: 400, message: err.message}));
    
})

router.put("/replace/:index", (req,res) => {
    const name = req.query.name;
    const index = req.params.index;
    const old = names[index];
    names[index] = name;
    res.status(202).send(`${old} successfully replaced with ${name}`);
})

module.exports = router