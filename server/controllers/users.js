import User from "../models/User.js";

// READ

export const getUser = async (req, res) => {
    try {
            // this id will be mongoose _id 
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
};

export const getUserFriends = async (req, res) => {

    try {

         // this id will be mongoose _id 
        const { id } = req.params;
        const user = await User.findById(id);
        // mapping over user.friends array and getting all their info with friends id(s)
        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );
            // destructuring friends object with these properties to use in the front-end
        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        });
            //sending this object to the front-end
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    };
};

// UPDATE 

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);
        // removing friends from friends arr on both user and friend.
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            // otherwise here we are pushing the friends so they are added as friends
            user.friends.push(friendId);
            friend.friends.push(id);
        };

        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map(id => User.findById(id))
        );

        const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location, picturePath }) => {
            return { _id, firstName, lastName, occupation, location, picturePath }
        });

        res.status(200).json(formattedFriends);

    } catch (err) {
        res.status(404).json({ message: err.message })
    };
};