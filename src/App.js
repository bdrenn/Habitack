import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import login from "./pages/login"
import signup from "./pages/signup"
import EditAccount from './pages/EditAccount'
import Stats from './pages/stats'


function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={login} />
          <Route exact path="/signup" component={signup} />
          <Route exact path ="/EditAccount" component={EditAccount} />
          <Route exact path='/stats' component={Stats} />
        </Switch>
      </div>
    </Router>
  )
}
export default App
