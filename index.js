const express = require("express");
const authRoute = require("./routes/authRoutes.js");
const postRoute = require("./routes/postRoutes.js")
const {users} = require("./db.js");
require('dotenv').config()

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/auth", authRoute);
app.use("/posts", postRoute);

app.get("/all", (req, res) => {
    res.send(users);
})


app.listen(PORT, () => {
    console.log(`Server is now listening to PORT ${PORT}`)
})