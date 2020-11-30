import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import LogOut from './logoutButton'

export default class MyBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        {document.title = 'Habitact'}
        let renderButtons = this.props.renderButtons || true;
        if(renderButtons === "true")
        {
        return (
            <AppBar className='app' position="relative">
                <Toolbar style = {{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton href='/editAccount' color='inherit'>
                        <AccountCircleIcon className='icon' />
                    </IconButton>
                    {/*Typogragpy is imported form material-ui can have different types of text if you change the variant and color*/}
                    <Typography variant="h6" color="inherit" noWrap>
                        {this.props.page}
                    </Typography>
                    <LogOut />
                </Toolbar >
            </AppBar>
        )
        }
        else{
            if(renderButtons === "false")
            {
            return (
                <AppBar className='app' position="relative">
                <Toolbar style = {{display: 'flex', justifyContent: 'center'}}>
                    {/*Typogragpy is imported form material-ui can have different types of text if you change the variant and color*/}
                    <Typography variant="h6" color="inherit" noWrap>
                        {this.props.page}
                    </Typography>
                </Toolbar >
            </AppBar>
            )
            }
        }
    }
}

