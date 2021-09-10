//require express
const express = require('express');
//pass the refrence of express method to constant app
const app = express();



const cookieParser = require('cookie-Parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');



const errorMiddleware = require('./middlewares/errors');

//set dotenv path or setting up config files
dotenv.config({ path: 'backend/config/config.env' })


//app should used the express.json() method to send data in json formate




app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(fileUpload());




// import all routes

const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment');


app.use('/api/v1', products);

app.use('/api/v1', auth);

app.use('/api/v1', order);

app.use('/api/v1', payment);



//middlewares to handle errors
app.use(errorMiddleware);


module.exports = app;