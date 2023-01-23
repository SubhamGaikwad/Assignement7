const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const { json } = require('express');
const port = 8080
app.use(express.urlencoded());
const initialData = require("./InitialData")

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/api/student", (req, res) => {

    const newData = initialData.map((data) => {
        const {id, name, currentClass, division} = data;
        return {id, name, currentClass, division}
    })
    if (!newData) {
        res.status(404).send({success: false, massage: "data not found"});
    }
    res.status(200).json(newData); 
})

app.get("/api/student/:newId", (req, res) => {
    const {newId} = req.params

    const findById = initialData.find((data) => data.id === Number(newId))

    if (!findById) { 
        res.status(404).send({success: false, massage:`Invalid respose for ${newId}`})
    }
    res.status(200).json(findById)
})

app.post("/api/student", (req, res) => {
    const {name , currentClass, division, id} = req.body;

    if(!name && !currentClass && ! division) {
        res.status(400).send({success: false, massage:`Invalid respose`})
    }

    res.status(201).json({success: true, id:id})
})

app.put("/api/student/:newId", (req, res) => {
    const {name} = req.body;
    const {newId} = req.params;

    const student = initialData.find((data) => data.id === Number(newId))

    if (!student) {
        res
        .status(404)
        .send({success: false, massage: `Invalid respose for ${newId}`})
    }

    const newStudent = initialData.map((data) => {
        if (data.id === Number(newId)) {
            data.name = name;
        }
        return data
    })
    res.status(200).json({ success: true, name: newStudent })
})

app.delete("/api/student/:newId", (req, res) => {
    const {newId} = req.params;

    const student = initialData.find((data) => data.id === Number(newId))

    if (!student) {
        res
        .status(400)
        .send({success: false, massage: "Invalide response 400"})
    }

    const deleteStudent = initialData.filter((data) => data.id !== Number(newId))

    res
    .status(200)
    .json({success:true, data: deleteStudent})
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   