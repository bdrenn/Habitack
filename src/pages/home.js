//import statments 
//useful icons here: https://material-ui.com/components/material-icons/

import React , { Component } from 'react';
//import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MyBar from "../Utilities/myBar";
import BottomNav from "../Utilities/myBotNav";
import {FitnessCenter as workoutIcon} from '@material-ui/icons';
import axios from "axios";
import { authMiddleWare } from '../Utilities/auth'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import Goals from '../Utilities/Goals';
import AddGoal from '../Utilities/AddGoal';




class home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            today: new Date().toLocaleString(),
            goals: [], //local copy of goals , only goals active today
            goalsAPI: [] // goals pulled from the back end


        }

    }

    componentDidMount() {
        authMiddleWare(this.props.history);
        const authToken = localStorage.getItem('AuthToken');
        axios.defaults.headers.common = { Authorization: `${authToken}` };
        axios
            .get("/goals")
            .then((response) => {
                this.setState({
                    goalsAPI: response.data,
                })
                
                console.log("mount :", this.state.goalsAPI)
                

            })
            .catch((err) => {
                console.log(err)
            })
        this.setDate()
    }

    setDate() {
        var day = this.state.today.split(',');
        this.setState({ today: day[0] });
    } 

    render() {

        const handleClickOpen = () => {
            this.setState({ isOpen: true });
        };

        const handleClose = () => {
            this.setState({ isOpen: false });
        };

        const handleSubmit = () => {
            //post to back end
            this.setState({ isOpen: false });
        };

        return (
            //Main div box which will contain all the entire page, needed because must have one parent div for everything
            <div className='home'>
                <React.Fragment>
                    <CssBaseline />
                    <MyBar page="My Goals" />
                    <main>
                        {/* goal unit */}

                        <div >
                            <Container maxWidth="sm">
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Habitact
                        </Typography>
                                <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                                    {this.state.today}
                                </Typography>
                                
                                <div >
                                    <Grid container spacing={2} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                                                Create new goal
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Dialog open={this.state.isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Create a Goal</DialogTitle>
                                        <DialogContent>
                                            <DialogContentText>
                                                Enter a goal description and the start and end date.
                                             </DialogContentText>

                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="title"
                                                label="title"
                                                type="string"
                                                fullWidth
                                            />
                                            Start
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="start"
                                                type="date"
                                                fullWidth
                                            />
                                            End
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="end"
                                                type="date"
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={handleSubmit} color="primary">
                                                Save
                                             </Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </Container>
                        </div>
                        <Container maxWidth="md">
                            {/* End goal unit */
                            }

                            <Grid container spacing={4}>
                                {this.state.goalsAPI.map((goal, index) => (
                                    <Grid item key={goal.id} xs={12} sm={6} md={4}>
                                        <Card >
                                            <CardMedia
                                                
                                                image="https://source.unsplash.com/random"
                                                title="Image title"
                                            />
                                            <CardContent >
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    #{index + 1} {goal.title}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                    Complete
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Edit
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>


                    <BottomNav/>
                </React.Fragment>
            </div>
        )
    }
}



export default home
