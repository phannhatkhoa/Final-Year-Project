const registerController =(req, res  ) => {
    const {username: username, email: email, password:password , re_pass:re_pass} = req.body;
    return res.json({ username:username, email: email, password: password , re_pass:re_pass });
}

module.exports = registerController;