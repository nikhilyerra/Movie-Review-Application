const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    movieTitle : {type : String, required: true},
    reviewerName : {type : String, required: true},
    reviewText : {type : String, required: true},
    rating : {type : Number, min: 0, max: 5, required: true},
}, { timestamps:true});

module.exports  = mongoose.model('Review', reviewSchema);

