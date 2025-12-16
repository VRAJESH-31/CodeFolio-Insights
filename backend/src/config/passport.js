import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import UserModel from '../models/user.model.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config/config.js';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            // First check if user exists by googleId
            let user = await UserModel.findOne({ googleId: profile.id });

            if (user) {
                return done(null, user);
            }

            // Check if user exists by email (registered via email/password)
            user = await UserModel.findOne({ email: profile.emails[0].value });

            if (user) {
                // Link Google account to existing user
                user.googleId = profile.id;
                if (!user.profile) user.profile = profile.photos[0].value;
                await user.save();
                return done(null, user);
            }

            // Create new user if no existing account found
            const newUser = new UserModel({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                profile: profile.photos[0].value,
                jobTitle: 'Developer',
                lastRefresh: Date.now(),
            });

            await newUser.save();
            return done(null, newUser);
        } catch (err) {
            return done(err, false);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (err) {
        done(err, false);
    }
});

export default passport;