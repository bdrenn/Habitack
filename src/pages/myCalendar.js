import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { Scheduler, DayView, MonthView, Appointments } from '@devexpress/dx-react-scheduler-material-ui';//install devextreme-react@20.1
import { ViewState } from '@devexpress/dx-react-scheduler';
import Typography from '@material-ui/core/Typography';
import MyBar from "../Utilities/myBar";
import BottomNav from "../Utilities/myBotNav"




export default function myCalendar() {

    const currentDate = '2020-10';
    const schedulerData = [
        //pull goal data from back end and place here 
        { startDate: '2020-10-18T09:45', endDate: '2020-10-18T11:00', title: 'Read' },
        { startDate: '2020-10-18T12:00', endDate: '2020-10-18T13:30', title: 'Go to a gym' },
    ];

    return (
        //Main div box which will contain all the entire page, needed because must have one parent div for everything
        <div className='parent-div'>
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