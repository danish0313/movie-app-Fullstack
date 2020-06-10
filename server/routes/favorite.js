const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/favorite");

const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", auth, (req, res) =>
{
        // finding the favorite info inside the favorite collection by id

        Favorite.find({ "movieId": req.body.movieId })
                .exec((err, favorite) =>
                {
                        if (err) return res.status(400).send(err)
                        res.status(200).json({ success: true, FavoriteNumber: favorite.length })
                })


});



router.post("/favorited", auth, (req, res) =>
{
        // finding the favorite info inside the favorite collection by id & userFrom

        Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
                .exec((err, favorite) =>
                {
                        if (err) return res.status(400).send(err)
                        // how we can know if i already added to
                        let result = false;
                        if (favorite.length !== 0)
                        {

                                result = true;
                        }
                        res.status(200).json({ success: true, Favorited: result })
                })


});


router.post("/addToFav", auth, (req, res) =>
{
        // save to database  the favorite
        const favorite = new Favorite(req.body);

        favorite.save((err, doc) =>
        {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true , doc })
        })
});


// remove from database the favorite
router.post("/remove", auth, (req, res) =>
{

        Favorite.findOneAndDelete({ movieId: req.body.movieId, "userFrom": req.body.userFrom })
                .exec((err, doc) =>
                {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).json({ success: true, doc })
                })
});



// get the favorite movies list 
router.post("/getFav", auth, (req, res) =>
{

        Favorite.find({"userFrom": req.body.userFrom })
                .exec((err, favorites) =>
                {
                        if (err) return res.status(400).json({ success: false, err })
                        res.status(200).json({ success: true, favorites })
                })
});






module.exports = router;
