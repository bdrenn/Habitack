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

import Goals from '../Utilities/Goals';
import AddGoal from '../Utilities/AddGoal';




class home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            goals: [],
            goalsAPI: [],
            images : [
                { source: "https://cdn3.iconfinder.com/data/icons/vacation-4/32/vacation_18-512.png" },
                { source: "https://cdn3.iconfinder.com/data/icons/book-shop-category-ouline/512/Book_Shop_Category-06-512.png" },
                { source: "https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_trending_up_48px-512.png" },
                { source: "https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_trending_up_48px-512.png" }]//default


        }

    }

    componentDidMount() {
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
    }

    

    render() {

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

                                <div >
                                    <Grid container spacing={2} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary">
                                                Create new goal
                                    </Button>
                                        </Grid>
                                    </Grid>
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



                </React.Fragment>
            </div>
        )
    }
}



export default home
