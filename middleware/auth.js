require('dotenv').load();
var jwt = require('jsonwebtoken')
var db = require('../models');

exports.loginRequired = function(req,res,next) {
	try {
		var token = req.headers.authorization
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded) {
				next();
			} else {
				res.status(401).send('Please log in first')
			}
		});
	} catch(e) {
		res.status(401).send('There was an error processing your request')
	}
}

exports.ensureCorrectUser = function(req,res,next) {
	try {
		var token = req.headers.authorization;
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			if (decoded.user_id === req.params.id) {
				next();
			} else {
				res.status(401).send('Not authorised');
			}
		});
	} catch (e) {
		res.status(401).send('Not authorised');
	}
}

exports.ensureAdmin = function(req,res,next) {
	try {
		var token = req.headers.authorization;
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			db.User.findById(decoded.user_id).then(function(user) {
				if (user.isAdmin) {
					next();
				} else {
					res.status(401).send('Not authorised');
				}
			})
		});
	} catch (e) {
		res.status(401).send('Not authorised');
	}
}

exports.ensureAdminOrCorrectUser = function(req,res,next) {
	try {
		var token = req.headers.authorization;
		jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
			db.User.findById(decoded.user_id).then(function(user) {
				if (user.isAdmin || decoded.user_id === req.params.id) {
					next();
				} else {
					res.status(401).send('Not authorised');
				}
			})
		});
	} catch (e) {
		res.status(401).send('Not authorised');
	}
}