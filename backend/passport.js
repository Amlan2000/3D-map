const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User= require("./models/user")

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
			  // Check if the user already exists in the database
			  const existingUser = await User.findOne({ googleId: profile.id });
			  
			  if (existingUser) {
				return done(null, existingUser);
			  }
		  
			  const newUser = new User({
				googleId: profile.id,
				displayName: profile.displayName,
				email: profile.emails[0].value,
			  });
		  
			  await newUser.save();
			  
			  done(null, newUser);
			} catch (error) {
			  console.error('Error in Google Strategy:', error);
			  done(error, null);
			}
		  }

	)
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});