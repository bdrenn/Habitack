import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import { Scheduler, DayView, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Typography from '@material-ui/core/Typography';
import MyBar from "../Utilities/myBar";
import BottomNav from "../Utilities/myBotNav";
import axios from "axios";


class myCalendar extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            goals: [],
            goalsAPI: []
        }

    }

    componentDidMount() {
        axios
            .get("/goals")
            .then((response) => {
                this.setState({
                    goalsAPI: response.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    formatter() {
        //this.state.goals = [        //pull goal data from back end and place here 
        //    { startDate: '2020-11-18T09:45', endDate: '2020-11-18T11:00', title: 'Read' },
        //     { startDate: '2020-11-18T12:00', endDate: '2020-11-18T13:30', title: 'Go to a gym' }];
        this.state.goalsAPI.map((goal, index) => (
            this.state.goals[index] = { startDate: this.formatDate(goal.start, true) , endDate: this.formatDate(goal.end, false), title: goal.title }
        ))
    };

    formatDate(date, startFlag) {
        var year = date.slice(6, 10);
        var dtg = year + "-";
        var month = date.slice(0, 2)
        dtg = dtg + month + "-";
        var day = date.slice(3, 5);
        if (startFlag) {
            console.log('was true');
            dtg = dtg + day + "T09:00";
        }
        else
            dtg = dtg + day + "T09:10";
        return dtg;
    };

    render() {
        const currentDate = '2020-11';

        { this.formatter() }

        return (
            //Main div box which will contain all the entire page, needed because must have one parent div for everything
            <div className='calendar'>
                {/*App bar on top of the page that displays little user icon and name of the page */}
                <MyBar page="My Calendar" />

                {/* This container is the essentially a <div> but can define the max allowed width */}
                <Container maxWidth='lg' >
                    <div className='calendar'>
                        {/* This is a calendar view, can also set to DayView instead of MonthView*/}
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Habitact
                        </Typography>
                        <Scheduler
                            data={this.state.goals}
                        >
                            <ViewState
                                currentDate={currentDate}
                            />
                            <MonthView
                                title="Month"
                                selectedDateFormat="{0:M}"
                                selectedShortDateFormat="{0:M}"
                            />
                            <Appointments />
                        </Scheduler>
                    </div>
                    {/* Bottom navigation module */}
                    <BottomNav />
                </Container>
            </div>
        )
    }
}



export default myCalendar