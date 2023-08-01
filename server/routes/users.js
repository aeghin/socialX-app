import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ 

// this route will be /users/id that we get. Known as query string.
router.get("/:id", verifyToken, getUser);
// grab the users friends
router.get("/:id/friends", verifyToken, getUserFriends);

// UPDATE
// getting the loggedin user and the friendid 
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;