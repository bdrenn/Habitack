import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home'
import { CalendarToday } from '@material-ui/icons';
import ShowChart from '@material-ui/icons/ShowChart'

export default function MyBotNav (props) {
    /* TODO:
        - Currently the bottom-nav is re-rendered everytime a page is clicked. 
        Ideally, the bottom nav should be rendered once as a component, and everytime a page 
        is clicked the selected icon will update.
        - Since we re-render every time, the state needs to be updated manually through a prop.
    */
    const [value, setValue] = React.useState(props.state);
    return (
        <div className='bot-nav-container'>
                    <BottomNavigation
                        value={value}
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