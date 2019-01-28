const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Account = require("../models/accountModel");

passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
	try {
		const user = await Account.findById(id);
		return done(null, user);
	} catch (error) {
		return done(error, false, error.message);
	}
});

passport.use(
	new LocalStrategy({}, async function(username, password, done) {
		try {
			let userId = parseInt(username);
			const user = await Account.findOne({ userId: userId });
			console.log("signInPassport", user, username, password);
			if (!user) {
				return done(null, false);
			}
			const isMatch = await user.isPasswordValid(password);
			if (!isMatch) {
				return done(null, false);
			}

			done(null, user);
		} catch (error) {
			console.log(error);
			done(error, false);
		}
	})
);