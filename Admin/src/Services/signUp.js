const User = require("../Models/user");
const bcrypt = require("bcrypt");

async function createUser(userData){
    const {email, user_name, password, confirm_password} = userData
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPassword = await bcrypt.hash(confirm_password,10);
    const createUser = new User({
        user_name,
        email,
        password: hashedPassword,
        confirm_password: confirmPassword,
        role: "customer"
    });

    const savedUser = await createUser.save();
    return savedUser;
}

module.exports = {createUser};