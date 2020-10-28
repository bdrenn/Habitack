import React , { Component } from 'react';
import GoalItem from './GoalItem';
import PropTypes from 'prop-types';

class Goals extends Component {
  render() {
    return this.props.goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} markComplete= {this.props.markComplete} delGoal={this.props.delGoal}/>
    ));
  }
}
//PropTypes
Goals.propTypes = {
  goals: PropTypes.array.isRequired
}


export default Goals;