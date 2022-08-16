const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const [prefix, token] = req.headers.authorization.split(" ");
        if (prefix !== 'Bearer') {
            return res.status(400).json({ message: "Invalid token" })
        }
        if (!token) {
            return res.status(400).json({ message: "Invalid token" });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        User.findByPk(decoded.id)
        .then((user)=>{
            if (!user) {
                return res.status(400).json({ message: "Invalid token" })
            }
            req.user = decoded;
            next();
        })
    } catch (e) {
        res.status(401).json({ message: "The user is not authorized" });
    }
};


module.exports = userMiddleware;