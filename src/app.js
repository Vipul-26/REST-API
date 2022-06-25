// This is for REST API
const express = require('express');
const studentRouter = require('./router/studentRouter');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(studentRouter);

app.listen(PORT, () => {
    console.log(`server is runnig at port no ${PORT}`);
});