const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')
const passport = require("passport");
const passportSetup = require("./passport");
const cookieSession = require("cookie-session");
const app = express()

app.use(
    cookieSession({ name: "session", keys: ["SWP"], maxAge: 24 * 60 * 60 * 100 })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());

app.use(cors({
    origin : process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});
app.use("/api",router)


const PORT = 5000 

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running " + PORT)
    })
})

