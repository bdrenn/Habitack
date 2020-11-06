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
            goals: [{ "goalsId": "GNeY2hXoU2p5YmBHopzn", "title": "runAPI", "start": "11/1/2020", "end": "11/30/2020", "completion": false },
                { "goalsId": "fZgE5LfOtMfHDVLOYOe2", "title": "laundryAPI", "start": "11/20/2020", "end": "11/20/2020", "completion": false },
                { "goalsId": "tg4wFqMYAMx2cl8cA8ji", "title": "studyAPI", "start": "10/14/2020", "end": "10/15/2020", "completion": true }]
        }

    }

    componentDidMount() {
        axios
            .get("/goals")
            .then((response) => {
                this.setState({
                    goals: response.data,
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    schedulerGen() {
            this.state.goals.map((goal) => (
                <Typography>
                    Description: {goal.title}
                            Start: {goal.start}
                </Typography>
            ))

    }

    render() {
        const currentDate = '2020-11';
        const schedulerData = [        //pull goal data from back end and place here 
            { startDate: '2020-11-18T09:45', endDate: '2020-11-18T11:00', title: 'Read' },
            { startDate: '2020-11-18T12:00', endDate: '2020-11-18T13:30', title: 'Go to a gym' }];


        return (
            //Main div box which will contain all the entire page, needed because must have one parent div for everything
            <div className='calendar'>
                {/*App bar on top of the page that displays little user icon and name of the page */}
                <MyBar page="My Calendar" />

                <Container maxWidth="md">
                    <Typography component="h3" >
                       Testing the goal format
                    </Typography>
                    {this.state.goals.map((goal) => (
                            <Typography>
                            Description: {goal.title}
                            Start: {goal.start}
                            </Typography>
                        ))}
                </Container>


                {/* This container is the essentially a <div> but can define the max allowed width */}
                <Container maxWidth='lg' >
                    <div className='calendar'>
                        {/* This is a calendar view, can also set to DayView instead of MonthView*/}
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Habitact
                        </Typography>
                        <Scheduler
                            data={schedulerData}
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