//index.js

const functions = require("firebase-functions")
const express = require('express');
const app = express();

const { 
  getAllGoals,
} = require("./APIs/goals")

const {
  loginUser,
  signUpUser
} = require("./APIs/users")


// Goals
app.get("/goals", getAllGoals)

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);

const main = express();
main.use('/api', app);

exports.main = functions.https.onRequest(main);
