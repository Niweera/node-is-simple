const config = require("../config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractStrategy = require("passport-jwt").ExtractJwt;
const StudentService = require("../services");
const studentService = new StudentService();

module.exports = app => {
  const authStrategy = new JwtStrategy(
    {
      secretOrKey: config.JWT_SECRET,
      algorithms: config.VERIFY_ALGORITHM,
      issuer: config.TOKEN_ISSUER,
      ignoreExpiration: false,
      jwtFromRequest: ExtractStrategy.fromAuthHeaderWithScheme("Bearer") //Authorization: Bearer <TOKEN>
    },
    async (payload, done) => {
      const student_id = payload.sub;
      const student_data = await studentService.getStudent(student_id);
      if (student_data) {
        done(null, student_id, payload);
      } else {
        done(null, false);
      }
    }
  );

  passport.use("jwt", authStrategy);
  app.use(passport.initialize());
};
