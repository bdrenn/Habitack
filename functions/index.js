//index.js

const functions = require("firebase-functions")
const express = require("express")
const app = express()
const nodemailer = require("nodemailer")
const auth = require("./util/auth")

const cors = require("cors")
app.use(cors())

const { getAllGoals, addGoal, deleteGoal, editGoal, addGoalPic, getGoalPic, updateCompletionField } = require("./APIs/goals")

const {
  loginUser,
  signUpUser, 
  getCurrentUser,
  updateName,
  updateEmail,
  updatePass,
  changeDisplay,
  addProfilePic,
  getProfilePic
} = require("./APIs/users")

// Goals
app.get("/goals", auth, getAllGoals); //works
app.post("/goal", auth, addGoal); //works
app.delete("/goal/:goalId", auth, deleteGoal); //works
app.put("/goal/:goalId", editGoal); 
app.post("/addGoalPic/:goalId",auth, addGoalPic); //works
app.get("/getGoalPic/:goalId", auth, getGoalPic); 
app.put("/complete/:goalId", auth, updateCompletionField); //works


// Users
app.post("/login", loginUser) 
app.post("/signup", signUpUser) //works
app.get("/getUser", auth, getCurrentUser)
app.put("/updateUser", auth, updateName)
app.put("/updateEmail", updateEmail)
app.put("/updatePass", updatePass)
app.put("/changeDisplay", changeDisplay)
app.post("/profile", auth, addProfilePic)
app.get("/profilePic", auth, getProfilePic)

//instantiates credentials
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "habitack2020@gmail.com", // generated ethereal user
    pass: "csulb2020" // generated ethereal password
  },
});

//trigger when a new user is created
exports.welcomeMessage = functions.firestore.document('/users/{user}').onCreate((snap,context) => {
  const firstName = snap.data().firstName;
  const lastName = snap.data().lastName;
  const email = snap.data().email;
  return mail(firstName, lastName, email)
})


//send email to users when first create a goal
function mail(firstName, lastName, email) {  
  //use predefined auth variables to send email with Habitack gmail
    return transporter.sendMail({
      from: 'Habitack Team <habitack2020@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Welcome to Habitack!", // Subject line
      //body
      html: `<h1>Hello ${firstName} ${lastName},</h1> <br /> 
      <p>Welcome to your journey towards self improvement! Below is an introduction guide to help get you started</p><br />
      <p>Habitack is a habit tracker designed to facilitate users with tracking goals that can change your life for the better. <br />
         Our job is to calculate your progress and show you results. Your job is to attack daily challenges with the help of habitack. </p> <br />
         <p>Pages: </p> <br />
         <ol> 
          <li>Goals Page</li>
            <ul>
              <li>List goals for the user</li>
              <li>Add new goal</li>
              <li>Delete goal</li>
              <li>Add photo to goal</li>
            </ul>
          <li>Stats Page</li>
            <ul>
              <li>Display the stats for a current goal</li>
            </ul>
          <li>Account Page</li>
            <ul>
              <li>Change account information</li>
            </ul>
         </ol>`
  })
  .then(r => r)
  .catch(e => e)
}




const main = express()
main.use("/api", app)

exports.main = functions.https.onRequest(main)