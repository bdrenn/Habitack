//import statments 
//useful icons here: https://material-ui.com/components/material-icons/

import React, { Component } from 'react';
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
import { FitnessCenter as workoutIcon } from '@material-ui/icons';
import axios from "axios";
import { authMiddleWare } from '../Utilities/auth'

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DefautlGoal from '../Utilities/addDefault'


import Goals from '../Utilities/Goals';
import AddGoal from '../Utilities/AddGoal';




class home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            today: '',
            goals: [], //local copy of goals , only goals active today
            goalsAPI: [], // goals pulled from the back end
            title: "",
            start: "",
            end: "",
            imageUpload: 'n/a'
        }
        this.setDate = this.setDate.bind(this)
        this.filterGoals=this.filterGoals.bind(this)
        this.isToday=this.isToday.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.handleClickOpen=this.handleClickOpen.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
        this.getPic = this.getPic.bind(this)
        this.handlePicSubmit = this.handlePicSubmit.bind(this)

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
                this.setDate()
                this.filterGoals()

            })
            .catch((err) => {
                console.log(err)
            })
            


    }

    setDate() {
        this.state.today = new Date().toLocaleString();
        var day = this.state.today.split(',');
        this.setState({ today: day[0] });
    }

    filterGoals() {
        this.state.goalsAPI.map((goal, index) => (
            //this.state.goals[index] = { id: goal.goalsId, title: goal.title }, 
            this.state.goals[index] = this.isToday(goal),
            console.log("in filter", this.state.goals[index])
        ))

        //update the state to re-render
        this.setState({
        });
    }

    isToday(goal) {
        if (this.state.today < goal.end && this.state.today > goal.start)
            return goal
        else
            return null
    }

    handleChange(event){
        const name = event.target.name;
        console.log(event.target.value)
        this.setState({
          [name]: event.target.value,
        });
    }
    handleClickOpen(){
        this.setState({ isOpen: true });
    };

    handleClose(){
        this.setState({ isOpen: false });
    };

    handleSubmit(e){
        //post to back end
        e.preventDefault();
        let startSplit = this.state.start.split('-')
        let start = `${startSplit[1]}-${startSplit[2]}-${startSplit[0]}`
        let endSplit = this.state.end.split('-')
        let end = `${endSplit[1]}-${endSplit[2]}-${endSplit[0]}`
        let trimTitle = this.state.title.trim();

        let goal = { title: trimTitle, start: start, end: end }
        console.log(goal);

        axios
            .post("/goal", goal)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        this.setState({ isOpen: false });
    };

    getPic(event){
        this.setState({
            imageUpload: event.target.files[0]
        })
        console.log(this.imageUpload)
    }
    handlePicSubmit(e){
        e.preventDefault()
        let id = e.target.name
        console.log(id)
        if(this.imageUpload === 'n/a'){
            return;
        }
        let form_data = new FormData();
		form_data.append('image', this.state.imageUpload);
		form_data.append('content', this.state.content);
		
		axios
			.post(`/addGoalPic/${id}`, form_data, {
				headers: {
					'content-type': 'multipart/form-data'
				}
			})
			.then(() => {
				window.location.reload();
			})
			.catch((error) => {
				if (error.response.status === 403) {
					this.props.history.push('/login');
				}
				console.log(error);
				this.setState({
					uiLoading: false,
					imageError: 'Error in posting the data'
				});
            });
            
            this.setState({
                imageUpload: 'n/a'
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
                                <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                                    {this.state.today}
                                </Typography>

                                <div style={{ marginBottom: "20px", display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                                    <Grid style={{ width: '220px' }} container spacing={1} justify="center">
                                        <Grid item>
                                            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                                                Create new goal
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Dialog open={this.state.isOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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
                                                name="title"
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                            Start
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="start"
                                                type="date"
                                                name="start"
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                            End
                                            <TextField
                                                autoFocus
                                                margin="dense"
                                                id="end"
                                                type="date"
                                                name="end"
                                                onChange={this.handleChange}
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={this.handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={this.handleSubmit} color="primary">
                                                Save
                                             </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <DefautlGoal />
                                </div>

                            </Container>
                        </div>
                        <Container maxWidth="md">
                            {/* End goal unit */
                            }

                            <Grid container spacing={4}>
                                {this.state.goals.filter(g => g !== null).map((goal, index) => (
                                    <Grid item key={goal.id} xs={12} sm={6} md={4}>
                                        <Card >
                                            <CardMedia
                                                component = "img"
                                                alt = "add pic for goal"
                                                height = "140"
                                                image= {goal.imageUrl}
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
                                                <form name={goal.title} onSubmit = {this.handlePicSubmit} >
                                                    <Button type = "submit" size ="small" color ="primary">Submit</Button>
                                                    <input type="file" onChange = {this.getPic} />
                                                </form>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>


                    <BottomNav />
                </React.Fragment>
            </div>
        )
    }
}



export default home