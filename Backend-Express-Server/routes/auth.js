const express = require("express");
const login = require("../controllers/auth");
const { createUser } = require("../controllers/users");

const router = express.Router();

// signup
router.post("/signup", createUser);

// login
router.post("/login", login);

module.exports = router;