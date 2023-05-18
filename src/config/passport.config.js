import passport from "passport";
import jwtStrategy from "passport-jwt";
import { PRIVATE_KEY } from "../util.js";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JwtStrategy(
      {
        //Extract cookie
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY,
      },
      async (jwt_payload, done) => {
        try {
          console.log("JWT got from payload");
          console.log(jwt_payload);
          return done(null, jwt_payload.user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
  );

  //Serializacion y Desserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    console.log("Cookies presentes: ");
    console.log(req.cookies);
    token = req.cookies["jwtCookieToken"];
    console.log("Token obtenido desde Cookie:");
    console.log(token);
  }
  return token;
};

export default initializePassport;
