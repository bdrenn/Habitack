import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
import axios from 'axios'


const Chart = require('react-chartjs-2').Chart;

/*
 * By defualt, the Doughnut char does not support a number at the center.
 * This code helps support this functionality.
*/
const originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
    draw() {
        originalDoughnutDraw.apply(this, arguments);

        const chart = this.chart;
        const width = chart.width;
        const height = chart.height;
        const ctx = chart.ctx;

        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';

        const text = `${chart.config.data.datasets[0].data[0]}%`
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
    }
});


class ProgressChart extends Component {

    render() {
        return (
            <div>
                <h1>Goal Stats</h1>
                <Doughnut
                    data={{
                        datasets: [{
                            data: [
                                this.props.total_goals, 
                                this.props.goals_completed
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.2)',
                            ],
                        }],
                        labels: [
                            'Completed',
                            'Working'
                        ]
                    }}
                    options={{
                        cutoutPercentage: 70,
                        rotation: 120
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
            total_goals: 90,
            goals_completed: 10
        }
    }

    render() {
        return (
            <div>
                <ProgressChart
                    total_goals={this.state.total_goals}
                    goals_completed={this.state.goals_completed}
                />
            </div>
        )
    }
}

export default Stats;
