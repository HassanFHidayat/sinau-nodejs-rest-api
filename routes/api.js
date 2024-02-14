const express = require("express");
const Ninja = require("../models/ninja");

const router = express.Router();

// get a list of ninjas from the database
router.get("/ninjas", function (req, res, next) {
    // res.send({type: 'GET'});
    // Ninja.find({}).then(function(ninjas){
    //     res.send(ninjas);
    // });
    Ninja.aggregate().near({
        near: {type: "Point", coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
        maxDistance: 100000, // in meter
        spherical: true,
        distanceField: "dis",
    }).then(function(ninjas) {
        res.send(ninjas);
    });
});

// add a new ninja to database
router.post("/ninjas", function (req, res, next) {
    // console.log(req.body);
    // let ninja = new Ninja(req.body);
    // ninja.save();
    Ninja.create(req.body)
        .then(function (ninja) {
            res.send(ninja);
        })
        .catch(next);
});

// update a ninja in the database
router.put("/ninjas/:id", function (req, res, next) {
    Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Ninja.findOne({ _id: req.params.id }).then(function (ninja) {
            res.send(ninja);
        });
    });
    // res.send({type: 'PUT'});
});

// delete a ninja from the database
router.delete("/ninjas/:id", function (req, res, next) {
    // console.log(req.params.id);
    Ninja.findByIdAndDelete({ _id: req.params.id }).then(function (ninja) {
        res.send(ninja);
    });
    // res.send({type: 'DELETE'});
});

module.exports = router;
