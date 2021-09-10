const connectDatabase = require('./config/database');

const cloudinary = require('cloudinary');
//require app 
const app = require('./app');
//require dotenv
const dotenv = require('dotenv');


// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

//console.log(a)





//set dotenv path or setting up config files
dotenv.config({ path: 'backend/config/config.env' })

//setting up the database
connectDatabase();


//setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET



})

//listen our app on port number 4000
const server = app.listen(process.env.PORT, () => {

    console.log(`Server started on port no: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);

});

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})