//index.js

const functions = require("firebase-functions")
const express = require('express');
const app = express();
const auth = require('./util/auth')

const { 
  getAllGoals,
  addGoal,
  deleteGoal,
  editGoal,
  addGoalPic,
} = require("./APIs/goals")

const {
  loginUser,
  signUpUser,
  getCurrentUser,
  updateName,
  updateEmail,
  updatePass,
  changeDisplay
} = require("./APIs/users")


// Goals
app.get("/goals", getAllGoals);
app.post("/goal", auth, addGoal);
app.delete("/goal/:goalId", deleteGoal);
app.put("/goal/:goalId", editGoal);

// Users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.get("/getUser", auth, getCurrentUser);
app.put("/updateUser", auth, updateName);
app.put("/updateEmail", updateEmail)
app.put("/updatePass", updatePass)
app.put("/changeDisplay", changeDisplay)
app.post("/addGoalPic",auth, addGoalPic);





const main = express();
main.use('/api', app);

exports.main = functions.https.onRequest(main);
