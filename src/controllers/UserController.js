const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateJwt = (id, email) => {
    return jwt.sign({ id, email }, process.env.SECRET_KEY, {
        expiresIn: "1h",
    });
};

const registration = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("email and password are required");
    }

    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
        return res.status(400).send("user with this email already exists");
    };

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, password: hashPassword });
    const token = generateJwt(user.id, user.email);
    return res.json({ token });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).send("No active account with this credentials");
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
        return res.status(400).send("No active account with this credentials");
    }

    const token = generateJwt(user.id, user.email);
    return res.json({ token });
}

const check = async (req, res, next) => {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
}

module.exports = {
    registration,
    login,
    check
}