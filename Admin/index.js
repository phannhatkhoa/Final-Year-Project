const express = require('express');
const bodyParser = require('body-parser');
const { MongoDBConnector } = require('./database');
const loginRouter = require('./Route/LoginRoute');

const app = express();
const databaseClass = new MongoDBConnector();

app.use(bodyParser.json());
// app.post('/login', myLogger, (req, res) => {
//     // You should not log or send sensitive information like passwords in the response.
//     res.json({ message: 'Login successful' });
// });

app.use('/auth',loginRouter);


databaseClass.connect();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
