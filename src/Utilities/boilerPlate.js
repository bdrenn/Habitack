import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import MyBar from './myBar'  // update path to '../Utilities/myBar' when adding a .js in pages dir
import BottomNav from './myBotNav' // update path to '../Utilities/myBotNav' when adding a .js in pages dir




export default function BoilerPlate() {

    return (
        //Main div box which will contain all the entire page, needed because must have one parent div for everything
        <div className='parent-div'>
            {/*App bar on top of the page that displays little user icon and name of the page
              *replace string in page with name of page
              */}
            <MyBar page="name goes here"/>
            {/* This container is the essentially a <div> but can define the max allowed width */}
            <Container maxWidth='xs'>
                {/* Habitack page Title (replace with logo in laster sprint) */}
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Habitack
                </Typography>
                <div className='content'>
                    {/* Place your content Here* */}
                </div>
                {/* Bottom navigation module */}
                <BottomNav />
            </Container>
        </div>
    )
}