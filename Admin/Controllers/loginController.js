const loginController = (req, res  ) => {
    const {email: email, password: password} = req.body;
    return res.json({ email: email, password: password });
}

module.exports = loginController;