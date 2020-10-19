import React , { Component } from 'react';
//import Header from './components/layout/Header';
import Goals from './Utilities/Goals';
import AddGoal from './Utilities/AddGoal';
//import {v4 as uuid} from 'uuid';

import './App.css';

class OldApp extends Component {
  
  state ={
    goals: [ 
      {
        id: 1,
        title: 'Work out',
        completed: false
      },
      {
        id: 2,
        title: 'Read book',
        completed: false
      },
      {
        id: 3,
        title: 'Paint',
        completed: false
      },
    ]
    
  }
  //Mark goal complete
  markComplete = (id) => {
    this.setState({ goals: this.state.goals.map(goal => {
      if(goal.id === id) {
        goal.completed = !goal.completed
      }
      return goal;
    }) });
  }

  //Delete goal
  delGoal = (id) => {
    this.setState({ goals: [...this.state.goals.filter(goal => goal.id !== id)] });
  }

  //add goal
  addGoal = (title) => {
    const newGoal = {
      id:  4,
      title,
      completed: false
    }
    this.setState({ goals: [...this.state.goals, newGoal]});
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Header />
          <AddGoal addGoal={this.addGoal} />
          <Goals goals={this.state.goals} markComplete={this.markComplete} delGoal={this.delGoal}/>
        </div>  
      </div>
    );
  }
}

export default App;
