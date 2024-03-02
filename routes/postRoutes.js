const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/checkAuth.js")

const {publicPosts, privatePosts} = require("../db.js");

router.get("/publicPosts", (req, res) => {
    res.send(publicPosts)
})


router.get("/privatePosts", checkAuthMiddleware, (req, res) => {
    res.send(privatePosts)
})

//user needs to be authenticated - 



module.exports = router;