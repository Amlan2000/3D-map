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
				// If user exists, return the user
				return done(null, existingUser);
			  }
		  
			  // If user does not exist, create a new user
			  const newUser = new User({
				googleId: profile.id,
				displayName: profile.displayName,
				email: profile.emails[0].value,
			  });
		  
			  // Save the new user to the database
			  await newUser.save();
			  
			  // Return the newly created user
			  done(null, newUser);
			} catch (error) {
			  // Handle any errors that occur
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