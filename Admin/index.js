const express = require("express");
const authRoute = require("./src/Routes/auth.route");
const productRoute = require("./src/Routes/product.route");
const cartRoute = require("./src/Routes/cart.route");
const paymentRoute = require("./src/Routes/payment.route");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
//const createAdminAccount = require("./src/scripts/admin");
const databaseServices = require("./src/Services/database.connect");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

//createAdminAccount();

databaseServices.connect();

app.use("/user",authRoute);
app.use("/product",productRoute);
app.use("/cart",cartRoute);
app.use("/cart",paymentRoute);



app.listen(PORT,()=>{
    console.log(`Server is running on: http://localhost:${PORT}`);
})