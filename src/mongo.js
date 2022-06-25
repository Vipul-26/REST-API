// This is for mongodb & mongoose

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/users', async (req, res) => {
    try {
        const userData = await User.find({});
        res.send(userData);
    } catch (e) {
        res.status(500).send();
        console.log(e);
    }
});

// mongodb connection

mongoose.connect('mongodb://localhost:27017/mongoose-node', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection`));

// schema creation
// A mongoose schema defines the structure of the document

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

// collection creation
// mongoose modal provides an interface to the database for CRUD operations

const User = mongoose.model('USER', userSchema);

// document creation Create

const createDocument = async () => {
    try {
        const userA = new User({
            name: 'Vipul',
            email: 'vipulsinghssm1@gmail.com',
            phone: 9472028436
        });

        const userB = new User({
            name: 'Kishan',
            email: 'kishan.svt0108@gmail.com',
            phone: 7033656018
        });

        const userC = new User({
            name: 'Amrit',
            email: '26amritsingh@gmail.com',
            phone: 9472028902
        });

        const userD = new User({
            name: 'Gaurav',
            email: 'gaurav.svt@gmail.com',
            phone: 9472028486
        });

        // const result = await userA.save(); for single document
        const result = await User.insertMany([userA, userB, userC, userD]);
    } catch (err) {
        console.log(err);
    }
};

// createDocument();

// document read Read

const readDocument = async () => {
    try {
        // const result = await User.find();
        // const result = await User.find({name: 'Vipul'}).select({_id: 0});
        const result = await User.find({ name: 'Vipul' }).select({ _id: 1 }).limit(1);
        // const result = await User.find({ age: { $gt: 50 } }).select({ name: 1 }); // Comparison Operator
        // const result = await User.find({ $or: [{ age: { $lt: 20 } }, { name: 'Vipul' }] }); // Logical Operator
        // const result = await User.find({name: 'Vipul'}).sort({name: 1 or -1}); // Sort assending or decending
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// readDocument();

// document update Update

const updateDocument = async () => {
    try {
        const result = await User.updateOne({ name: 'Vipul' }, { $set: { name: 'Vipul Singh' } });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// updateDocument();

// document delete Delete

const deleteDocument = async () => {
    try {
        const result = await User.deleteOne({ name: 'Vipul' });
        console.log(result);
    } catch (err) {
        console.log(err);
    }
};

// deleteDocument();

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
})