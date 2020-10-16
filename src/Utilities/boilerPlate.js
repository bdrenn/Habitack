import React from 'react';
import Container from '@material-ui/core/Container';
import MyBar from './myBar'
import BottomNav from './myBotNav'




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
                <div className='content'>
                    {/* Place your content Here* */}
                </div>
                {/* Bottom navigation module */}
                <BottomNav />
            </Container>
        </div>
    )
}