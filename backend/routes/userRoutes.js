const express = require("express");
const router = express.Router();

// Dummy users (replace with real database integration)
const users = [];

// Register route
router.post("/register", (req, res) => {
  const { email, password } = req.body;

  // Add logic to hash password and save user to DB
  const newUser = { email, password };
  users.push(newUser);

  res.status(201).send("User registered successfully");
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (user) {
    res.status(200).send("Login successful");
  } else {
    res.status(400).send("Invalid credentials");
  }
});

module.exports = router;

