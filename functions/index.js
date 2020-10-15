//index.js

const functions = require("firebase-functions")
const express = require('express');
const app = express();

const { 
  getAllGoals,
  addGoal,
  deleteGoal,
  editGoal,
} = require("./APIs/goals")

const {
  loginUser,
  signUpUser
} = require("./APIs/users")


// Goals
app.get("/goals", getAllGoals);
app.post("/goal", addGoal);
app.delete("/goal/:goalId", deleteGoal);
app.put("/goal/:goalId", editGoal);

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);

const main = express();
main.use('/api', app);

exports.main = functions.https.onRequest(main);
