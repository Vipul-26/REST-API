const mongoose = require('mongoose');

const DB = process.env.DATABASE || 'mongodb://localhost:27017/student-restapi';

// mongodb connection
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`connnection successful`);
}).catch((err) => console.log(`no connection ${err}`));