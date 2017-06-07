var express = require('express');
var router = express.Router();
var db = require('../models');
var auth = require('../middleware/auth');

router.get('/',auth.ensureAdmin, function(req,res,next){
	db.User.find().then(function(users){
		res.status(200).send(users);
	})
});

router.get('/:id',auth.ensureAdminOrCorrectUser, function(req,res,next){
	db.User.findById(req.params.id).then(function(user) {
		res.status(200).send(user);
	})
})

router.patch('/:id', auth.ensureAdminOrCorrectUser, function(req,res) {
	db.User.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(function(user) {
		res.status(200).send(user);
	})
})

router.delete('/:id', auth.ensureAdminOrCorrectUser,function(req,res,next) {
	db.User.findByIdAndRemove(req.params.id).then(function(user) {
		res.status(204).send(user);
	})
})

module.exports = router;