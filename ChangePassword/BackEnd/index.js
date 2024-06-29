const express = require('express')
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes')


const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
app.use(express.json())
app.use("/api",router)



const PORT = 3000 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connnect to DB")
        console.log("Server is running " + PORT)
    })
})
