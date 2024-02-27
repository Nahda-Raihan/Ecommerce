const express = require('express');
const ErrorHandler = require('./middleware/Error')
const bodyParser = require("body-parser")
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/", express.static("uploads"))
app.use(bodyParser.urlencoded({ extended: true}))

//routes
const user = require('./controller/User')
app.use("/api/v2", user)

app.use(ErrorHandler)
module.exports = app;