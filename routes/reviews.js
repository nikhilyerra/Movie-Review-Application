const express = require('express');
const Review = require('../models/Review');

const router = express.Router();

router.get('/reviews', async (req, res) => {

    try{
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({message: 'failed to fecth reviews', error: err});

    }

});

// router.get('/reviews', async (req, res) => {


//     res.status(200).json({message: "test review"});
    

// });


router.post('/reviews', async(req, res) => {
    console.log('Received data:', req.body);
    const{movieTitle, reviewerName, reviewText, rating} = req.body;

    if(!movieTitle || !reviewerName || !reviewText || typeof rating !== 'number'){
        return res.status(400).json({
            message: 'please enter required fields',
            receivedData: {movieTitle, reviewerName, reviewText, rating}

        });
    }

    try {
        const newReview = new Review({movieTitle, reviewerName, reviewText, rating});


        const savedReview = await newReview.save();
        res.status(201).json(savedReview);


    } catch (err){
        res.status(400).json({message: "failed to save review"});

    }
});



router.put('/reviews/:id', async(req, res) => {
    const{id} = req.params;
    const{movieTitle, reviewerName, reviewText, rating} = req.body;

    try{
        const updatedReview = await Review.findByIdAndUpdate(id, {movieTitle, reviewerName, reviewText, rating}, {new: true});
        if(!updatedReview) return res.status(404).json({message: "review not found"});
        res.json(updatedReview);


    } catch(err) {
        res.status(400).json({message: "failed to update"});

    }
    
});


router.delete('/reviews/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const deteleReview = await Review.findByIdAndDelete(id);
        if(!deleteReview) return res.status(404).json({message: 'review not found'});
        res.json({message: 'review deleted'});


    } catch (err) {
        res.status(400).json({message: 'failed to delete review' });

    }
     

});

module.exports = router;



