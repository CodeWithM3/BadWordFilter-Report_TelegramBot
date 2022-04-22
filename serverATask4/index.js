const express = require('express')
const connectDb = require('./dbConnection/connection')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes/apiRoutes')

const app = express()
connectDb()
require('dotenv').config();
const PORT = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json())

app.use('/api', apiRoutes);

app.listen(PORT, console.log(`Server is running on ${PORT}`))