var LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy({
        callbackURL: '/user/google/redirect',
        clientID: '583261927649-u20u1jiuefhor9nvjgjrkghr1p667v9t.apps.googleusercontent.com',
        clientSecret: 'hlwVayAfydhSN--ffpP06XYw'
    }, (accessToken, refreshToken, profile, done) => {
        // var userData = {
        //     email: profile.emails[0].value,
        //     name: profile.displayName,
        //     token: accessToken
        // };
        // var user = new User();
        // user.username = profile.emails[0].value;
        // user.password = '123123';
        // user.save(err => {
        //     if (err)
        //         console.log("save error");
        // })
        done(null, userData);
    })
)
};