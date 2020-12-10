import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import { Scheduler, DayView, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';
import { ViewState } from '@devexpress/dx-react-scheduler';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import MyBar from "../Utilities/myBar";
import BottomNav from "../Utilities/myBotNav";
import axios from "axios";
import { authMiddleWare } from '../Utilities/auth'


class myCalendar extends Component {

    //class consturctor 
    constructor(props) {
        //pass args to super class
        super(props)

        //init state variables 
        this.state = {
            goals: [],
            goalsAPI: []
        }
        
    }

    //method is called when component is lauched, make API calls
    componentDidMount() {
        //get the token to authenticate user
        authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            //pull the users goals 
            .get("/goals")
            .then((response) => {
                this.setState({
                    //set the goalsAPI list to the response from API call
                    goalsAPI: response.data,
                })
                //format the goals to use with scheduler tool
                this.formatter()
                //log the states of the lists 
                console.log("mount :", this.state.goalsAPI)
                console.log("after :", this.state.goals)
                
            })
            //if error return to home page
            .catch((err) => {
                if (err.response.status == 403)
                    this.props.history.push('/')
                else
                    console.log(err)
            })
    }

    //conditionally render the calendar
    displayCalendar() {
        //check if API call is done
        if (this.state.goals && this.state.goals.length > 0) {
            //pass the goals to the scheudler tool
            return <Scheduler
                data={this.state.goals}
            >

                
                <MonthView
                    title="Month"
                    selectedDateFormat="{0:M}"
                    selectedShortDateFormat="{0:M}"
                />
                <Appointments />
            </Scheduler>;
        }
        //if API call not done display circular progress
        return <Typography align="center" >
                  <CircularProgress />
               </Typography>
    }

    formatter() {
        //format the goals into data for the scheudler tool by mapping through the goals
        //example { startDate: '2020-11-18T09:45', endDate: '2020-11-18T11:00', title: 'Read' },
        
        this.state.goalsAPI.map((goal, index) => (
            this.state.goals[index] = {
                startDate: this.formatDate(goal.start, true),
                endDate: this.formatDate(goal.start, false),
                title: goal.title,
                rRule: this.repeatCount(goal.start, goal.end)
            },
            console.log("in formatter", this.state.goals[index])
        ))

        //update the state to re-render
        this.setState({        
        });

       
    };

    //format the date time group
    formatDate(date, startFlag) {
        var year = date.slice(6, 10);
        var dtg = year + "-";
        var month = date.slice(0, 2)
        dtg = dtg + month + "-";
        var day = date.slice(3, 5);
        if (startFlag) {
            dtg = dtg + day + "T09:00";
        }
        else
            dtg = dtg + day + "T10:00";
        return dtg;
    };

    //count the times of days the goal will repeat
    repeatCount(startGoal, endGoal) {
        var rule = 'FREQ=DAILY;COUNT=';
        var startday = startGoal.slice(3, 5);
        var endday = endGoal.slice(3, 5);
        var days = parseInt(endday, 10) - parseInt(startday, 10) + 1 ;
        rule = rule + days.toString();
        console.log("math", startday, endday, days);
        return rule;
    }

    render() {

        
        const currentDate = '2020-11';

        
        //main calendar function
        return (
            //Main div box which will contain all the entire page, needed because must have one parent div for everything
            <div className='calendar'>
                {/*App bar on top of the page that displays little user icon and name of the page */}
                <MyBar page="My Calendar" />

                {/* This container is the essentially a <div> but can define the max allowed width */}
                <Container maxWidth='lg' align="center"  >

                    <div className='calendar'>
                        {/* This is a calendar view, can also set to DayView instead of MonthView*/}
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Habitack
                        </Typography>
                                                
                        {this.displayCalendar()}
                                                
                    </div>
                    {/* Bottom navigation module with calendar as state */}
                    <BottomNav state={2} /> 
                </Container>
            </div>
        )
    }
}



export default myCalendar