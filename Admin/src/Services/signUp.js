const bcrypt = require("bcrypt");

async function createUser(userData){
    const {email, full_name, password, confirm_password,location,gender} = userData
    const hashedPassword = await bcrypt.hash(password, 10);
    const confirmPassword = await bcrypt.hash(confirm_password,10);
    const createUser = new User({
        full_name,
        email,
        password: hashedPassword,
        confirm_password: confirmPassword,
        location,
        gender,
        role: "customer"
    });

    const savedUser = await createUser.save();
    return savedUser;
}

module.exports = {createUser};