import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// import user model to use in the register function
import User from '../models/User.js';

// REGISTER USER

export const register = async (req, res) => {
    try {
        // Destructure request body object from the front-end. 
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
        const passwordHash = await bcrypt.hash(password, salt);

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
         //save user to db
        const savedUser = await newUser.save();

        // sending back the user to the front-end can receive the correct, updated user information
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
        // comparing the passwords from incoming and the database password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" })
        };

        // signing with the user id and passing the secret string
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        // delete the password so it doesn't get sent to the front-end
        delete user.password;
        res.status(200).json({ token, user});


    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};