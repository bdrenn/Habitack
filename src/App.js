import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import login from "./pages/login"
import signup from "./pages/signup"
<<<<<<< HEAD
import editAccount from './pages/EditAccount'
import './Styles.css'
import home from "./pages/home"
import myCalendar from "./pages/myCalendar"
=======
import EditAccount from './pages/EditAccount'
import Stats from './pages/stats'
>>>>>>> 9b15e2b1a5c50435a177c41b7cb86f1ecc587be9


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/signup" component={signup} />
<<<<<<< HEAD
          <Route exact path ="/editAccount/" component={editAccount} />
          <Route exact path="/home" component={home} />
          <Route exact path="/calendar" component={myCalendar}/>
=======
          <Route exact path ="/EditAccount" component={EditAccount} />
          <Route exact path='/stats' component={Stats} />
>>>>>>> 9b15e2b1a5c50435a177c41b7cb86f1ecc587be9
        </Switch>
      </div>
    </Router>
  )
}
export default App
