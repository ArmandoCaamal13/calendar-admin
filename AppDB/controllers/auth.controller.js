const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

function generateToken(){
    return jwt.sign({id: db.user.id}, config.secret,{
        algorithm: 'HS256',
        expiresIn: 900
    });
}

exports.signup = async (req, res) => {
    try {
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        await user.save();

        if (req.body.roles) {
            const roles = await Role.find({ name: { $in: req.body.roles } });

            user.roles = roles.map((role) => role._id);
            await user.save();
        } else {
            const role = await Role.findOne({ name: "user" });

            user.roles = [role._id];
            await user.save();
        }

        res.status(200).send({ message: "User was registered successfully!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
        }).populate("roles", "-__v");

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({ 
                accessToken: null,
                message: "Invalid Password!" 
            });
        }
        const token = generateToken(user);
        const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

        res.status(200).send({
            id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            roles: authorities,
            accessToken: token
        });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.signout = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

