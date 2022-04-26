//Configuração inicial
require('dotenv').config()
const express = require('express')
const mongose = require('mongoose')
const app = express()

//forma de ler JSON/MIddlewares
app.use(express.urlencoded({extended: true,}),)

app.use(express.json())

const lojaRoutes = require('./routes/lojaRoutes')
app.use('/loja', lojaRoutes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.k4khr.mongodb.net/bancoApi?retryWrites=true&w=majority`
)
.then(()=>{
    console.log('Conectamos com o MongoDB!')
    app.listen(4000)
})
.catch((err)=>console.log(err))
