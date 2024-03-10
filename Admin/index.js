const express = require("express");
const signupRoute = require("./src/Routes/signup");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

app.use("/user",signupRoute);

app.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);
})