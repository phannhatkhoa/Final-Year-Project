const databaseServices = require("../Services/database.connect");
const userServices = require("../Services/user.services");



const signupController = async (req, res, next) => {
    const insertedData = await userServices.userRegister(req.body);
    if (insertedData) {
        res.status(201).json({ data: { message: "User created successfully", user: insertedData } });
    } else {
        res.status(500).json({ message: "Internal server error" });
    }
}

const signinController = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userServices.userLogin(email, password);
    console.log('user', user)
    return res.status(200).json({ message: "Sign in successfull", ...user });
}

const profileController = async (req, res, next) => {
    const user = await userServices.userProfile(req.params.id);
    return res.status(200).json({ message: "User profile", body: user })
}



module.exports = {
    signupController,
    signinController,
    profileController
}
