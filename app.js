const express = require('express')
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const url =  "mongodb+srv://Drashti:admin123@cluster0.trk5mpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express()

mongoose.connect(url)
const con = mongoose.connection

con.on('open',()=>{
    console.log('connected..')
})

app.use(cors());

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const itemRouter = require('./routes/items')
app.use('/items',itemRouter)

app.listen(3000, ()=>{
    console.log('Server started')
})

