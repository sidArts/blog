var mongoose = require('mongoose');
var express = require("express");
var Post = require("../models/postModel");

var postRoutes = express.Router();

postRoutes.post("/create", function(req, res){
    var data = req.body;
    data.createdAt = new Date();
    var post = new Post(data);
    post.save().then(function(post){
        res.status(201).send({ status: "success" });
    }, function(err) {
        console.log(err);
        res.status(400).send({status: "failed", error: err.errmsg});
    });
});

postRoutes.get("/get/:id", function(req, res){
    Post.findOne({ _id: req.params.id }).then(function(post){
        if(post != null) {
            res.status(200).send(post);
        } else {
            res.status(204).send({
                status: "no content"
            });
        }
    });
});

postRoutes.get("/getAll", function(req, res){
    Post.find({}).populate("createdBy").exec(function(err, posts){
        if(err) {
            res.status(400).send({
                status: "failed",
                error: err.errmsg
            });
        }
        if(posts.length == 0) 
            res.status(204).send();
        else
            res.status(200).json(posts);    
        
    });
});

postRoutes.get("/getPostsByUserId/:id", function(req, res){
    Post.find({ createdBy: req.params.id }).then(function(posts){
        if(posts != null) {
            res.status(200).send(posts);
        } else {
            res.status(204).send({
                status: "no content"
            });
        }
    });
});

postRoutes.put("/update", function(req, res){
    var data = req.body;
    Post.findOneAndUpdate({_id: data._id}, data).then(function(post){
        if(post != null) {
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

postRoutes.delete("/delete/:id", function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
    Post.findOne({_id: id}).then(function(post){
        if(post != null){
            post.remove().then(function(doc){
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


module.exports = postRoutes;
