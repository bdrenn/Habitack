import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home'
import { CalendarToday } from '@material-ui/icons';
import ShowChart from '@material-ui/icons/ShowChart'

export default function MyBotNav () {
    const [value, setValue] = React.useState(0);
    return (
        <div className='bot-nav-container'>
                    <BottomNavigation
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        showLabels
                        className='botNav'
                    >
                        <BottomNavigationAction label="Stats" icon={<ShowChart />} href="stats" />
                        <BottomNavigationAction label="Goals" icon={<HomeIcon />} href="home" />
                        <BottomNavigationAction label="Calendar" icon={<CalendarToday />} href="calendar" />

                    </BottomNavigation>
                </div>
    )
}