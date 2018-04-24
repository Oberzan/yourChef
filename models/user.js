let mongoose = require('mongoose');
let crypto = require('crypto');
var jwt = require('jsonwebtoken');
let Schema = mongoose.Schema;

let userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  //profilePicture: {type: String, required: false, 'default': 'https://openclipart.org/download/247319/abstract-user-flat-3.svg'},
  role: {type: Number, 'default': 0},
  hash: String,
  salt: String,
}, 
{ 
    usePushEach: true 
});

userSchema.methods.setPassword = function(password) {
  console.log("dcdcsdcsdcscdscdscsd")
  console.log(this);
  
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
};

userSchema.methods.checkPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString('hex');
  return this.hash == hash;
};

// exports.create = (req, res) => {
//   user.create();
// }

userSchema.methods.generateJwt = function() {
  let expired = new Date();
  expired.setDate(expired.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    // profilePicture: this.profilePicture,
    role: this.role,
    // isFacebookUser: this.isFacebookUser,
    expiration: parseInt(expired.getTime() / 1000, 10)
  }, process.env.JWT_PASSWORD);
};

mongoose.model('user', userSchema, 'users');