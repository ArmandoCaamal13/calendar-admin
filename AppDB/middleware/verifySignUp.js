const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Verificar duplicado de Username
        const usernameUser = await User.findOne({ username: req.body.username }).exec();
        if (usernameUser) {
            return res.status(400).send({ message: "Failed! Username is already in use!" });
        }

        // Verificar duplicado de Email
        const emailUser = await User.findOne({ email: req.body.email }).exec();
        if (emailUser) {
            return res.status(400).send({ message: "Failed! Email is already in use!" });
        }

        next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
};

module.exports = verifySignUp;
