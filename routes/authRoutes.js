const router = require("express").Router();
const {check, validationResult} = require("express-validator");
const {users} = require("../db.js");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

router.post("/signup", [
        check("email", "Please enter valid email").isEmail(), 
        check("password", "Password has to be a min of 5 characters").isLength({
            min: 6
        })
    ], async (req, res) => {

    const {email, password} = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    //DataBase

    const user = users.find(user => {
        return user.email == email
    })

    if(user) {
        return res.status(400).json({
            error: {
                "msg": "User with this email already exists. Login instead",
            }
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    users.push({
        email, 
        password: hashedPassword
    })

    //generate the JWT token and send it to the client

    const token = await JWT.sign({
        email
    }, process.env.SECRET_KEY, {
        expiresIn: "36000000"
    })

    res.send({
        token
    })
})


router.post("/login", async (req, res) => {

    const {email, password} = req.body;

    const user = users.find(user => user.email == email);

    if(!user) {
        return res.status(400).json({
            error: {
                "msg": "Invalid Credentials",
            }
        })
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if(!isEqual) {
        return res.status(400).json({
            error: {
                "msg": "Invalid Credentials",
            }
        })
    }

    const token = await JWT.sign({
        email
    }, process.env.SECRET_KEY, {
        expiresIn: "36000000"
    })

    res.send({
        token
    })
})





module.exports = router;