const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {

        // condition 1 - Check the user mail is exist or not

        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ message: "User account already exists" });
        }

        // Condition 2 - password hashing

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: "User account created", newUser });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'User account creation failed' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        // Step-1 Check the email is registered or not

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User account not found" });
        }

        // Step-2 Password check

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password mismatch' });
        }

        // Step-3 Token generation
        
        const token = jwt.sign(
            {userId: user._id, username: user.username, email: user.email, role: user.role},
            process.env.secret_key,
            {expiresIn: '24h'}
        )
        res.status(200).json({message: "Login successful", token: token});

    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'User login failed' });
    }
}



module.exports = { registerUser, loginUser };