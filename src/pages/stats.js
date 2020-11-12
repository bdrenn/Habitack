import React, { Component } from "react"
import { Doughnut } from "react-chartjs-2"
import axios from "axios"
import MyBar from "../Utilities/myBar"
import BottomNav from "../Utilities/myBotNav"
import { authMiddleWare } from '../Utilities/auth'

// Materials UI
import { 
  Button,
  Container,
  Grid
} from '@material-ui/core'

const Chart = require("react-chartjs-2").Chart

/*
 * By defualt, the Doughnut char does not support a number at the center.
 * This code helps support this functionality.
 */
const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw() {
    originalDoughnutDraw.apply(this, arguments)

    const chart = this.chart
    const width = chart.width
    const height = chart.height
    const ctx = chart.ctx

    const fontSize = (height / 114).toFixed(2)
    ctx.font = `${fontSize}em sans-serif`
    ctx.textBaseline = "middle"

    const text = `${chart.config.data.datasets[0].data[1]}%`
    const textX = Math.round((width - ctx.measureText(text).width) / 2)
    const textY = height / 2

    ctx.fillText(text, textX, textY)
  },
})

class ProgressChart extends Component {
  render() {
    return (
      <div>
        <Doughnut
          data={{
            datasets: [
              {
                data: [this.props.total_goals, this.props.goals_completed],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.5)",
                  "rgba(54, 162, 235, 0.2)",
                ],
              },
            ],
            labels: ["Todo", "Completed"],
          }}
          options={{
            cutoutPercentage: 70,
            rotation: 120,
          }}
        />
      </div>
    )
  }
}

class Stats extends Component {
  constructor(props) {
    super(props)

    this.state = {
      total_goals: 0,
      goals_completed: 0,
      goals: [],
    }

    this.getPercentageGoalsCompleted.bind(this)
    this.getPercentageGoalsIncomplete.bind(this)
  }

  getPercentageGoalsIncomplete() {
    return 100 - this.getPercentageGoalsCompleted()
  }

  getPercentageGoalsCompleted() {
    const completed = this.state.goals.filter(
      (goal) => goal.completion === false
    )
    return Math.floor((completed.length / this.state.goals.length) * 100)
  }

  componentDidMount() {
    authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios
      .get("/goals")
      .then((response) => {
        console.log(response.data)
        this.setState({
          goals: response.data,
        })
      })
      .catch((err) => {

          if (err.response.status == 403)
              this.props.history.push('/')
          else
              console.log(err)
      })
  }

  render() {
    return (
      <div>
        <MyBar page="Goal Stats" />
        <Container component="main" maxWidth="xs">
          <ProgressChart
            total_goals={this.getPercentageGoalsIncomplete()}
            goals_completed={this.getPercentageGoalsCompleted()}
          />
          <Grid container alignItems="center" justify="center">
          <Button variant="contained">Day</Button>
          <Button variant="contained">Week</Button>
          <Button variant="contained">Month</Button>
          <BottomNav />
          </Grid>
        </Container>
      </div>
    )
  }
}

export default Stats
