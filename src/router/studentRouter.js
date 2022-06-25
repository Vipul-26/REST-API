const express = require('express');
const router = new express.Router();

require('../db/conn');
const Student = require('../model/studentSchema');

// Home route

router.get('/', (req, res) => {
    res.send(`Hello Home Page`);
});

// Create (new student) using promises

// router.post('/students', (req, res) => {
//     const student = new Student(req.body);
//     student.save().then(() => {
//         res.status(201).send(student);
//     }).catch((e) => res.status(400).send(e));
// });

// Create (new student) using async-await

router.post('/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        const createStudent = await student.save();
        res.status(201).send(createStudent);
        // res.send.json({ message: "data successfully created" });
    } catch (e) {
        res.status(400).send(e);
    }
});

// Read (students data)

router.get('/students', async (req, res) => {
    try {
        const studentData = await Student.find({});
        res.send(studentData);
    } catch (e) {
        res.status(500).send();
        console.log(e);
    }
});

// Read (indivisual student data using id)

router.get('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.find({ _id });
        if (!studentData) {
            res.status(404).json({ message: "student data with given id not found" });
        }
        res.send(studentData);
    } catch (e) {
        // res.status(404).send(e);
        res.status(404).json({ message: "student data with given id not found" });
        console.log(e);
    }
});

// Update (indivisual student data using id)

router.patch('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.updateOne({ _id }, req.body, { new: true });
        if (!studentData) {
            res.status(404).json({ message: "student data with given id not found" });
        }
        // res.send(studentData);
        res.send().json({ message: "data successfully updated" })
    } catch (e) {
        res.status(404).send();
        console.log(e);
    }
});

// Delete (indivisual student data using id)

router.delete('/students/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const studentData = await Student.findByIdAndDelete({ _id });
        if (!studentData) {
            res.status(404).json({ message: "student data with given id not found" });
        }
        // res.send(studentData);
        res.send().json({ message: "data successfully deleted" })
    } catch (e) {
        res.status(404).send();
        console.log(e);
    }
});

module.exports = router;

