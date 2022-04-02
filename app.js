const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser')
const path = require("path");
const app = express();
const {db} = require("./models");
require("dotenv").config();


var corsOptions = {
    origin: process.env.DOMAIN
  };
app.use(cors(corsOptions));


app.use(express.urlencoded({extended: false}));
app.use(express.json());

db.sequelize.sync();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.set('view engine', 'hbs');

require('./routes/pages') (app);

require('./routes/auth') (app);


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`))