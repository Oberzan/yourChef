let mongoose = require('mongoose');
let passport = require('passport');

// const user = require('../models/user');

const User = mongoose.model('user');

exports.renderRegister = (req, res) => {
  res.render('register', {

  });
}

exports.register = (req, res) => {
  if(!req.body.email || !req.body.password) {
    res.status(400).json("All fields required.");
    return;
  }
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save().then(user => {
    if(user) {
      // res.status(200).json({
      //   token: user.generateJwt()
      // });
      res.status(200).json(user);
    } else {
      res.sendStatus(400);            
    }
  }, error => {
    res.status(400).json(error);
  });
  
  // res.render('register', {

  // });
}

exports.renderLogin = (req, res) => {
  res.render('login', {

  });
}

exports.authenticate = (req, res) => {
  if(req.body.email && req.body.password) {
    passport.authenticate('local', (error, user, data) => {
        if(error) {
            res.status(404).json(error);
            return;
        }
        if(user) {
            let token = user.generateJwt();
            res.status(200)
               .cookie('token', token)
               .json({
                 token: token
               });
        } else {
            res.status(401).json(data);
        }
    })(req, res);
  } else {
      res.status(400).json("Missing email or/and password."); 
  }
}