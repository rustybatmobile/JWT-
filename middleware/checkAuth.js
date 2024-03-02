const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.header("x-auth-token");

    if(!token) {
        return res.status(400).json({
            error: {
                "msg": "Token Missing",
            }
        }) 
    }

    // if it is actually valid
    try {
        const user = await JWT.verify(token, process.env.SECRET_KEY);
        req.email = user.email
        next();

    } catch(err) {
        return res.status(400).json({
            error: {
                "msg": "Token Invalid",
            }
        }) 
    }




}