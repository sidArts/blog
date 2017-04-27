var mongoose = require('mongoose');
var express = require("express");
var Comment = require("../models/commentModel");

var commentRoutes = express.Router();

commentRoutes.post("/create", function(req, res){
    var data = req.body;
    data.createdAt = new Date();
    var comment = new Comment(data);
    comment.save().then(function(comment){
        res.status(201).send({ status: "success" });
    }, function(err) {
        console.log(err);
        res.status(400).send({status: "failed", error: err.errmsg});
    });
});

commentRoutes.get("/get/:id", function(req, res){
    Comment.findOne({ _id: req.params.id }).then(function(comment){
        if(comment != null) {
            res.status(200).send(comment);
        } else {
            res.status(204).send({
                status: "no content"
            });
        }
    });
});

commentRoutes.get("/getCommentsByPostId/:id", function(req, res){
    Comment.find({ postId: req.params.id }).then(function(comments){
        if(comments != null) {
            res.status(200).send(comments);
        } else {
            res.status(204).send({
                status: "no content"
            });
        }
    });
});


commentRoutes.put("/update", function(req, res){
    var data = req.body;
    Comment.findOneAndUpdate({_id: data._id}, data).then(function(comment){
        if(comment != null) {
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

commentRoutes.delete("/delete/:id", function(req, res){
    var id = mongoose.Types.ObjectId(req.params.id);
    Comment.findOne({_id: id}).then(function(comment){
        if(comment != null){
            comment.remove().then(function(doc){
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


module.exports = commentRoutes;
