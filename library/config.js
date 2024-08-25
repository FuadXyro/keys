const LocalStrategy = require("passport-local").Strategy;
const { getHashedPassword } = require("./functions");
//const { User } = require("../database/model");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async function (email, password, done) {
        let hashed = getHashedPassword(password);
        let users = await global.db.get(`Member_${email}`);
        if (!users)
          return done(null, false, {
            message: "That Email is not registered",
          });
        if (!users.verif)
          return done(null, false, {
            message: "Your Email Not Verified Please Check Your Email",
          });
        if (email === users.email && hashed === users.password)
          return done(null, users, {
            message: "Login Success",
          });
        else
          return done(null, false, {
            message: "Your Password Invalid",
          });
      }
    )
  );
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  passport.deserializeUser(async function (id, done) {
    let users = Object.values(global.db.JSON()).find((x) => x.id == id);
    if (!users) return done("Error: User not Login", null);
    return done("", users);
  });
};
