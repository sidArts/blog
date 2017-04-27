var mongoose = require('mongoose');
var express = require("express");
var User = require("../models/userModel");

var userRoutes = express.Router();

userRoutes.post('/create', function(req, res){    
    var data = new User(req.body);
    data.createdAt = new Date();
    data.save().then(function(doc){
        console.log(doc);
        console.log('User saved successfully!');
        res.status(201).send({ status: "success" });
    }, function(err) {
        console.log(err);
        res.status(400).send({status: "failed", error: err.errmsg});
    });
});


userRoutes.get("/getAll", function(req, res){
    User.find({}).exec(function(err, users){
        if(err) res.status(204).send(users); 
        
        if(users.length == 0) {
            res.status(204).send({
                status: "no content"
            });
        }
        
        res.status(200).json(users);
    
    });
});

userRoutes.get("/get/:id", function(req, res){
    User.findOne({ _id: req.params.id }).then(function(user){
        if(user != null) {
            res.status(200).send(user);
        } else {
            res.status(204).send({
                status: "no content"
            });
        }
    });
});


userRoutes.put("/update", function(req, res){
    var data = req.body;
    User.findOneAndUpdate({_id: data._id}, data).then(function(user){
        if(user != null) {
            res.status(202).send({
                status: "success",
                message: "resource updated"
            });
        } else {
            res.status(410).send({
                status: "failed",
                message: "resource already deleted"
            });
        }
        
    }, function(err) {
        res.status(400).send({
            status: "failed",
            message: err
        });
    });
});

userRoutes.delete("/delete/:id", function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
    User.findOne({_id: id}).then(function(user){
        if(user != null){
            user.remove().then(function(doc){
                console.log(doc, "is removed");
                res.status(202).send({
                    status: "success",
                    message: "resource successfully deleted"
                });
            }, function(err) {
                res.status(500).send({
                    status: "failed",
                    error: err.errmsg
                });
            });
        } else {
            res.status(410).send({
                status: "failed",
                message: "resource already deleted"
            });
        }
        
    });
});

module.exports = userRoutes;