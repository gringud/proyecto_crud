const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({path: 'config.env'});
const PORT=process.env.PORT||8080;

// log request - devuelve el tiempo que tardar en cargar en terminal
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//pasar solicitud al body-parse
app.use(bodyparser.urlencoded({extended: true}));

//ver el motor
app.set("view engine", "ejs");
/* app.set("view", path.resolve(__dirname, "views")) */

app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

// con la siguente linea cargo todo el index
/* app.get('/', (rec,res)=>{
    res.render('index.ejs');
}) */

//load routers


app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=>{console.log(`Server esta corriendo en http://localhost:${PORT}`)});