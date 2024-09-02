const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.log(error);
    }
    if (users) {
        return res.status(404).json({ message: "No Users Found" });
    }
    return res.status(200).json({ users });
};

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User is already exists! login instead" });
    }

    // we need salt to hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res
            .status(404)
            .json({ message: "Couldnt Find User By This Email" });
    }

    // we need salt to hash password
    const salt = await bcrypt.genSalt(10);
    const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
    );
    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Successfull" });
};

module.exports = {
    getAllUser,
    signup,
    login
};
