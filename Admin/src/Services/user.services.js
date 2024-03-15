const UserRegister = require('../class/signup.class');
const databaseServices = require('./database.connect');

class UserServices {
  async userRegister(email, password, full_name, date_of_birth, location) {
    const newUser = {
      email,
      password,
      full_name,
      date_of_birth,
      location
    };

    const user = await databaseServices.userCollection.insertOne(newUser);
    return user;
}
}

const userServices = new UserServices();
module.exports = userServices;
