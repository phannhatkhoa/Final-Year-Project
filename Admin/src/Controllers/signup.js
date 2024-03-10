const userService = require("../Services/signUp");

async function createUser(req, res){
    try{
        const user = await userService.createUser(req.body);
        return  res.status(201).json({user: user, message:"User created successfully"});
    } catch(error){
        console.log(error);
 return res.status(400).json({message: error.message});
    }
}

module.exports = {createUser};