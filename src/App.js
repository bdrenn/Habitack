import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import login from "./pages/login"
import signup from "./pages/signup"
import editAccount from './pages/editAccount'
import Boiler from './Utilities/boilerPlate'
import './Styles.css'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route exact path ="/editAccount/" component={editAccount} />
        </Switch>
      </div>
    </Router>
  )
}
export default App
