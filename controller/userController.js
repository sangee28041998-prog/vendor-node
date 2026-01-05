const User = require("../model/userModel");

//post api


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'User account creation failed' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({message: "User details updated", updatedUser});
    }catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'User account creation failed' });
    }
};

const deleteUser = async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json({message: "User account deleted"});
    }catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'User account creation failed' });
    }
};



module.exports = { getUsers, updateUser, deleteUser };