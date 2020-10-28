import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import login from "./pages/login"
import signup from "./pages/signup"
import editAccount from './pages/EditAccount'
import home from "./pages/home"
import myCalendar from "./pages/myCalendar"
import Stats from './pages/stats'

import './Styles.css'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route exact path ="/editAccount/" component={editAccount} />
          <Route exact path="/home" component={home} />
          <Route exact path="/calendar" component={myCalendar}/>
          <Route exact path='/stats' component={Stats} />
        </Switch>
      </div>
    </Router>
  )
}
export default App
