const bcrypt = require("bcryptjs");
const User = require("../models/User");
const CREATED = require("../utils/errors/errors");
const BadRequestError = require("../utils/errorClasses/badRequest");
const NotFoundError = require("../utils/errorClasses/notFound");

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const { username, email, password, avatar } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      username,
      email,
      password: hash,
      avatar,
    })
      .then((user) => {
        res.status(CREATED).send({
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
        });
      })
      .catch((err) => {
        if (err.code === 11000) {
          return res
            .status(409)
            .send({ message: "User with this email already exists" });
        }
        if (err.name === "ValidationError") {
          return next(new BadRequestError("Invalid Request"));
        }
        return next(err);
      });
  });
};

const updateUser = (req, res, next) => {
  const { username, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { username, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid Request"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID format"));
      }
      return next(err);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateUser,
};
