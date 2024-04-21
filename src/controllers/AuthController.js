const authenticateJWT = require("../middleware/authenticateJWT");
const generateToken = require("../Helper/GenerateJWT");

const AuthController = {
  async login(req, res) {
    const user = { id: 1, username: req.body.username };
    const token = generateToken(user);
    res.json({ token: token });
  },
};

module.exports = AuthController;
