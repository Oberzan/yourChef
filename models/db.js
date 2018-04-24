var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = 'mongodb://localhost/yourChef';
// if(process.env.NODE_ENV === 'production') {
//     dbURI = process.env.MLAB_URI;
// }
mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose je povezan na ' + dbURI);
})
mongoose.connection.on('error', err => {
    console.log('Mongoose napaka pri povezavi: ' + err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose je zaprl povezavo');
})

let pravilnaUstavitev = (sporocilo, callback) => {
    mongoose.connection.close(() => {
        console.log('Mongoose je zaprl povezavo preko ' + sporocilo);
        callback();
    });
}

process.once('SIGUSR2', () => {
    pravilnaUstavitev('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', () => {
    pravilnaUstavitev('exiting the app', () => {
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
pravilnaUstavitev('exit from app on Heroku', () => {
        process.exit(0);
    });
});

require('./user');