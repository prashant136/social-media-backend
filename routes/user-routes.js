const express = require("express");
const route = express.Router();
const { getAllUser, signup, login } = require("../controllers/user-controller");

route.get("/", getAllUser);
route.post("/signup", signup);
route.post("/login", login);

module.exports = route;
