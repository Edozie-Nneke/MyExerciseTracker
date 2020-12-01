const express = require('express');//require express
const cors = require('cors'); //require cors: *cross origin resource sharing*
const mongoose = require('mongoose'); 

require('dotenv').config();

//import and assign routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }); //connect mongoose
const connection = mongoose.connection; //connected mongoose is assigned 

connection.once('open', () => {
    console.log('MongoDB connected successfully!')
});


//use routes in middleware
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`I'm listening on port: ${port}`)
});
