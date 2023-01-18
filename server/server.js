const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const UserRoute = require('./routes/user')
mongoose.connect("mongodb://localhost:27017/db1", {useNewUrlParser: true, useUnifiedTopology: true})
db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
})

db.once('open', () => {
    console.log("Database connected");
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const PORT = process.env.port || 3000

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

app.use('/api/user', UserRoute)

// app.get("/api", (req,res)=>{
//     res.json({"users": ["user1: 100", "user2: 90", "user3: 40", "user4: 70"]})
// })

// app.listen(5000, ()=>{console.log("Server is running on port 5000")})