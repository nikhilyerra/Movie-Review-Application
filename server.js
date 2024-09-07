const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());


const reviewRoutes = require('./routes/reviews');

app.use('/api', reviewRoutes);

app.get('/test',(req,res) => {
    res.status(200).send('Test route');
});


mongoose.connect('mongodb://localhost:27017/movie-reviews')
    .then(() => console.log("conencetd to mongodb"))
    .catch((err) => console.log("failed to connect to mongo", err));

const PORT = 5000;
app.listen(PORT, () => console.log("server runnning in 5000"));

