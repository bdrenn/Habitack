import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
const Chart = require('react-chartjs-2').Chart;

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

        const text = chart.config.data.datasets[0].data[0]
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
    }
});

class Stats extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Goal Stats</h1>
                <Doughnut
                    data={{
                        datasets: [{
                            data: [80, 50],
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

export default Stats;