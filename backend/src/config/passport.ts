import { Strategy } from "passport-google-oauth20";
import { db } from "../models/index";
import { PassportStatic } from "passport";
const Users = db.users;

export function auth(passport: PassportStatic) {
  passport.use(
    new Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const newUser = {
          googleId: profile.id,
          firstName: profile.name?.givenName,
          lastName: profile.name?.familyName,
          email: profile.emails ? profile.emails[0].value : "",
          profilePhoto: profile.photos ? profile.photos[0].value : "",
        };
        try {
          let user = await Users.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await Users.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    Users.findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(null, err));
  });
}
