var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({
        email: email
    }).then(user => {
        if(!user) {
            return done(null, false, 'Wrong credentials.');
        }
        if(!user.checkPassword(password)) {
            return done(null, false, "Wrong credentials.");
        }
        return done(null, user);
    }, error => {
        return done(error);
    })
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

// passport.use(new FacebookStrategy({
//     clientID: '251160725417925',
//     clientSecret: 'f8f6b24b6a0f4fd737ad98ea983fe873',
//     callbackURL: '/api/auth/facebook/callback',
//     profileFields: ['id', 'emails', 'name']
// }, function(token, refreshToken, profile, done) {
//     process.nextTick(() => {
//         User.findOne({
//             email: profile.emails[0].value
//         }).then(user => {
//             var profilePicture = 'https://graph.facebook.com/' + profile.id + '/picture?type=large';
//             if(user) {
//                 user.token = user.generateJwt();                
//                 if(user.profilePicture != profilePicture) {
//                     user.profilePicture = profilePicture;
//                     user.save().then(savedUser => {
//                         return done(null, savedUser);
//                     }, error => {
//                         return done(null, user);
//                     })
//                 } else {
//                     return done(null, user);
//                 }
//             } else {
//                 var newUser = new User();
//                 newUser.email = profile.emails[0].value;
//                 newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
//                 newUser.profilePicture = profilePicture;
//                 newUser.isFacebookUser = true;
//                 newUser.save().then(user => {
//                     user.token = user.generateJwt();   
//                     return done(null, user);
//                 }, error => {
//                     return done(error);
//                 })
//             }
//         }, error => {
//             return done(error);
//         });
//     });
// }));