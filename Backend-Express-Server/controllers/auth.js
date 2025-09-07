const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { SUCCESS } = require("../utils/errors");
const JWT_SECRET = process.env.JWT_SECRET;

const BadRequestError = require("../utils/errorClasses/badRequest");
const UnauthorizedError = require("../utils/errorClasses/unauthorized");

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(SUCCESS).send({ token });
    })
    .catch((err) => {
      if (err.message === "Incorrect email or password") {
        return next (new UnauthorizedError ("Incorrect email or password"));
      }
      return next(err);
    });
};

module.exports = login ;
