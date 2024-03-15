const databaseServices = require("../Services/database.connect");
const userServices = require("../Services/user.services");
const bcrypt = require('bcrypt');

const signupController = async (req, res, next) => {
    const { email, password, confirm_password, full_name, date_of_birth, location } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const insertedData = userServices.userRegister(email, passwordHash, confirm_password, full_name, date_of_birth, location);
    if (insertedData) {
        res.status(201).json({ message: "User created successfully" });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
}

const signinController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await databaseServices.userCollection.findOne({ email: email });
    if (!user) {
        res.status(401).json({ message: "Invalid email or password" });
    } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid email or password" });
        } else {
            res.status(200).json({ message: "Sign-in successful"});
        }
    }
}
module.exports = {
    signupController,
    signinController
}