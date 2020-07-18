var express = require("express");
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var app = express();

dotenv.config();

//Connecting to Db
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,
    useUnifiedTopology: true},
()=>console.log("Connected To DB"))

app.use(express.json())

var authRoute = require("./routes/auth");
app.use('/api/user',authRoute);  

app.listen(5500,()=>{
    console.log("API Authentication Running")
})