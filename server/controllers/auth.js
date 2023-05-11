import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register User

export const register = async (req, res) => {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
        // creating a salt to use in the hash function.
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        })

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// LOGGING IN 

export const login = async (req, res) => {
    try {
        // destructuring the request body to get email and password
        const { email, password } = req.body;
        // using the findOne method to get the email
        const user = await User.findOne({ email: email });
        // using conditional to respond if user is found or not
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" })
        };
        // this will proceed is previous conditonal is not true.
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" })
        };

        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user});


    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};