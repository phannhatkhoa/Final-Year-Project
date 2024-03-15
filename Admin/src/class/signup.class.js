class UserRegister {
    constructor(email, password, confirm_password, full_name, date_of_birth, location) {
      this.email = email;
      this.password = password;
      this.confirm_password = confirm_password;
      this.full_name = full_name;
      this.date_of_birth = date_of_birth;
      this.location = location;
    }
}

module.exports = UserRegister;