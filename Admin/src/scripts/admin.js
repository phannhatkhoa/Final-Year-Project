const User = require("../Models/user");
const bcrypt = require("bcrypt");


async function createAdminAccount(){
    try{
        const existingAdmin = await User.findOne({email: "admin@test.com"});
        if(!existingAdmin){
            const newAdmin = new User({
                email: "admin@test.com",
                user_name: "Admin",
                password: await bcrypt.hash("admin123", 10),
                role: "admin"
            })
            await newAdmin.save();
            console.log("Admin account created successfully");
        }else{
            console.log("Admin already exists");
        }
    }catch(error){
        console.error(error.message);
    }
}
module.exports = createAdminAccount;