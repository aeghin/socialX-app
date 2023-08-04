import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
// get all the posts on the feed from the database to display at the home page
router.get("/", verifyToken, getFeedPosts);

//get posts by user
router.get("/:userId/posts", verifyToken, getUserPosts);

// UPDATE 

router.patch("/:id/like", verifyToken, likePost);

export default router;
