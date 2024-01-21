const express = require('express');
const bodyParser = require('body-parser');
const { MongoDBConnector } = require('./database'); // Sử dụng named import

const app = express();
const databaseClass = new MongoDBConnector(); // Tạo thực thể của MongoDBConnector

app.use(bodyParser.json());

const myLogger = function (req, res, next) {
    const { password, email } = req.body;

    if (password === '123' && email === 'test@gmail.com') {
        next();
    } else {
        res.status(400).json({
            error: 'Invalid credentials',
        });
    }
};

app.post('/login', myLogger, (req, res) => {
    // You should not log or send sensitive information like passwords in the response.
    res.json({ message: 'Login successful' });
});

databaseClass.connect();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
