import React from 'react'
import Button from '@material-ui/core/Button'

import axios from 'axios'

export default function LogoutButton () {
  
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('AuthToken');
        window.open("/", "_self")
        }
    
    return (
        <div>
        <Button variant="contained" color="secondary" onClick = {handleLogOut}>Log Out</Button>
        </div>
    )
}