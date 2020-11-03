//index.js

const functions = require("firebase-functions")
const express = require("express")
const app = express()
const auth = require("./util/auth")

const cors = require("cors")
app.use(cors())

const { getAllGoals, addGoal, deleteGoal, editGoal, addGoalPic } = require("./APIs/goals")

const {
  loginUser,
  signUpUser,
  getCurrentUser,
  updateName,
  updateEmail,
  updatePass,
  changeDisplay,
} = require("./APIs/users")

// Goals
app.get("/goals", auth, getAllGoals)
app.post("/goal", addGoal)
app.delete("/goal/:goalId", deleteGoal)
app.put("/goal/:goalId", editGoal)
app.post("/addGoalPic",auth, addGoalPic);

// Users
app.post("/login", loginUser)
app.post("/signup", signUpUser)
app.get("/getUser", auth, getCurrentUser)
app.put("/updateUser", auth, updateName)
app.put("/updateEmail", updateEmail)
app.put("/updatePass", updatePass)
app.put("/changeDisplay", changeDisplay)


const main = express()
main.use("/api", app)

exports.main = functions.https.onRequest(main)
