var path = require("path");
var express = require("express");
var ejs = require("ejs");
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var jsonWebToken = require("jsonwebtoken");
var Promise = require('es6-promise').Promise;
var app = express();

mongoose.connect('mongodb://localhost:27017/forumDB');
mongoose.Promise = Promise;

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.render("homepage", { content: "Testing Express View Engine" });
});

var User = require("./app/models/userModel");
var Jwt = require("./app/models/JwtModel");
var crypto = require("./my_modules/EncryptDecryptMessage");
app.post("/authenticate", function(req, res) {
    console.log(req.body);
    User.findOne(req.body).exec(function(err, user){
        if(err) 
            res.status(400).send({
                status: "failed",
                error: err.errmsg
            });
        if(user != null){
            var jwt = new Jwt({
                token: crypto.cipher(JSON.stringify(user)),
                lastAccessed: new Date()
            });
            jwt.save().exec(function(err, jwt){
                console.log(user);
                res.status(200).json(jwt);
            });
        } else {
            res.status(204).send();
        }
    });
});

app.post("/register", function(req, res) {
     console.log(req.body);
     var newUser = new User(req.body);
     newUser.createdAt = new Date();
     newUser.save().then(function(user){
         console.log(user);
         res.status(201).send();
     }, function(err){
         res.status(500).json({
             error: err.errmsg
         });
     });
});

var userRoutes = require("./app/routes/userRoutes");
var postRoutes = require("./app/routes/postRoutes");
var commentRoutes = require("./app/routes/commentRoutes");

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/comment', commentRoutes);

var PORT = process.env.port || 1337;
app.listen(PORT, () => {
    console.log("app listening at 1337");
});