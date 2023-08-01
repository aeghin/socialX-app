import jwt from "jsonwebtoken";

// using token logic to make sure we verify user access. 
export const verifyToken = async (req, res, next) => {
    try {

        // token will be set here by front end and we will grab it
        let token = req.header("Authorization");
        if (!token) {
            return res.status(403).send("Access Denied")
        };
        // grabbing the token to the right of the Bearer
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        };

        // veryfying the token that we already have.
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({ error: err.message })
    };
};

