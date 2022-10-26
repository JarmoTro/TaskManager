const userSchema = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    if (!req.body.username ||
        !req.body.password) {
        return res.status(400).send("Missing one or all required request body fields: username, password");
    }
    else {
        const newUser = userSchema({
            username: req.body.username,
            password: req.body.password
        });
        try {
            await newUser.save();
        } catch (err) {
            return res.status(400).send('Username is already in use!');
        }
        let token;
        try {
            token = jwt.sign(
                { userId: newUser._id, username: newUser.username },
                process.env.SECRET,
                { expiresIn: "1h" }
            );
        } catch (err) {
            return res.status(500).send("Couldn't create JWT.")
        }
        return res.status(201).send("User created!")
    }
}

exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send("Missing one or all required request body fields: username, password");
    }
    let existingUser;
    try {
        existingUser = await userSchema.findOne({ username: req.body.username });
    } catch (err) {
        return res.status(500).send("Internal server error.");
    }
    if (!existingUser) {
        return res.status(404).send('User not found');
    }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, existingUser.password);
    if (!isPasswordCorrect) {
        return res.status(401).send('Invalid credentials');
    }
    let token;
    try {
        token = jwt.sign(
            { userId: existingUser._id, username: existingUser.username },
            process.env.SECRET,
            { expiresIn: "1h" }
        );
    } catch (err) {
        return res.status(500).send("Couldn't create JWT.")
    }
    return res.status(200).json({ token: token });
}



