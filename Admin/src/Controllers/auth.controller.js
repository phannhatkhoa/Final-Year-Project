const databaseServices = require("../Services/database.connect");
const userServices = require("../Services/user.services");



const signupController = async (req, res, next) => {
    const insertedData = await userServices.userRegister(req.body);
    if (insertedData) {
        res.status(201).json({ message: "User created successfully", user: insertedData });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
}

const signinController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userServices.userLogin(email, password);
    console.log('abc', user);
    return res.status(200).json({message: "Sign in successfull", user: user})
}

const profileController = async (req, res, next) => {
        const { id } = req.body;
        const result = await userServices.userProfile(id);
        return res.status(200).json({message: "User profile", user: result});
}

module.exports = {
    signupController,
    signinController,
    profileController
}
