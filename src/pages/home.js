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
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import DefaultGoal from '../Utilities/addDefault';
import defaultIMG from "../img/defaultIMG.png";
import completeIMG from "../img/complete.png";
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import ListItem from '@material-ui/core/ListItem'


import Goals from '../Utilities/Goals';
import AddGoal from '../Utilities/AddGoal';
const useStyles = theme => ({
    root: {
      height: 320,
      width: 330,
      
    },
    text:{
        height: 70,
    },
    img: {
        maxHeight: 200

    }
      });


class home extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            isOpen: false,
            deleteOpen: false,
            today: '',
            goals: [], //local copy of goals , only goals active today
            goalsAPI: [], // goals pulled from the back end
            title: "",
            start: "",
            end: "",
            imageUpload: 'n/a',
            deleteArr: []
        }
        this.setDate = this.setDate.bind(this)
        this.filterGoals = this.filterGoals.bind(this)
        this.isToday = this.isToday.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getPic = this.getPic.bind(this)
        this.handlePicSubmit = this.handlePicSubmit.bind(this)
        this.handleCompleteGoal = this.handleCompleteGoal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleDeleteSave = this.handleDeleteSave.bind(this)


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

                if (err.response.status == 403)
                this.props.history.push('/')
                 else
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
        var today = new Date(this.state.today)
        var start = new Date(goal.start)
        var end = new Date(goal.end)
        var index = this.getIndex(start, today)
        if (today <= end && today >= start) {
            if (goal.imageUrl == "" && goal.completion[index] != true) {
                goal.imageUrl = defaultIMG;
                console.log("use default")
            }
            else if (goal.completion[index] == true) {
                goal.imageUrl = completeIMG;
                console.log(goal.title, "is complete");
            }
            return goal
        }
        else {
            console.log("false -", today, start, end)
            return null
        }

    }

    getIndex(start, end) {
        console.log("index is-", Math.round((end - start) / (1000 * 60 * 60 * 24)))
        return Math.round((end - start) / (1000 * 60 * 60 * 24));
    }

    handleChange(event) {
        const name = event.target.name;
        console.log(event.target.value)
        this.setState({
            [name]: event.target.value,
        });
    }
    handleClickOpen(event) {
        this.setState({
            isOpen: true
        });
    };

    handleClose(event) {
        this.setState({
            isOpen: false
        });
    };

    handleCloseDelete() {
        this.setState({ deleteOpen: false })
    }

    handleCompleteGoal(index) {
        const start = new Date(this.state.goals[index].start)
        const now = new Date()
        const timeDiff = now.getTime() - start.getTime()
        let today_index = Math.floor(Math.abs(timeDiff / (1000 * 3600 * 24)))

        const completion = this.state.goals[index].completion
        completion[today_index] = true
        console.log(completion)
        axios
            .put(`/complete/${this.state.goals[index].title}`, { completion: completion })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    handleSubmit(e) {
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
            .then(() => {
                console.log("here")
                window.location.reload();
            })
            .catch((err) => {
                console.log(err)
            })
        this.setState({ isOpen: false });
    };

    getPic(event) {
        this.setState({
            imageUpload: event.target.files[0]
        })
        console.log(this.imageUpload)
    }
    handlePicSubmit(e) {
        e.preventDefault()
        let id = e.target.name
        console.log(id)
        if (this.imageUpload === 'n/a') {
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
            })
        this.setState({
            imageUpload: 'n/a'
        })
    }

    handleDelete(index) {
        let id = this.state.goals[index].title
        console.log(id)
        this.setState(prevState => ({
            deleteArr: [...prevState.deleteArr, id]
        }))
        document.getElementById(`${id}`).style.color = "red"


    }

    handleDeleteSave() {
        let length = this.state.deleteArr.length
        
        this.state.deleteArr.map(goal => {
            axios
                .delete(`/goal/${goal}`)
                .then((res) => {
                    console.log(res)
                    --length
                    if(!length){
                        window.location.reload()
                    }
                })
                .catch((err) => {
                    console.log(err)

                })
        })
        this.setState({
            deleteOpen: false
        })
        console.log(length)
        if(length === 0){
            window.location.reload()
        }

    }

    
    componentDidUpdate() {
        console.log(this.state.deleteArr)
    }
    render() {
        const { classes } = this.props;
        return (
            //Main div box which will contain all the entire page, needed because must have one parent div for everything
            <div className='home'>
                <React.Fragment>
                    <CssBaseline />
                    <MyBar renderButtons="true" page="My Goals" />
                    <main>
                        {/* goal unit */}
                        <Grid >
                            <Container maxWidth="sm">
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                    Habitack
                        </Typography>
                                <Typography component="h5" variant="h5" align="center" color="textPrimary" style={{ marginBottom: "10px" }} gutterBottom>
                                    {this.state.today}
                                </Typography>
                                <Grid container alignItems="center" justify="center" style={{ flexGrow: "1", marginBottom: "10px" }} spacing={2}>
                                    <Grid >
                                        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                                            Create new goal
                                            </Button>
                                    </Grid>
                                    <Grid item>
                                        <DefaultGoal />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            name="deleteOpen"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => this.setState({ deleteOpen: true })}>
                                            Delete Goal
                                            </Button>
                                    </Grid>
                                </Grid>


                                <Grid container spacing={2} style={{ flexGrow: "1", marginBottom: "20px", display: 'flex', flexDirection: 'row', justifyContent: 'center' }} >
                                    <Grid style={{ width: '220px' }} container spacing={1} justify="center">


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
                                        <Dialog open={this.state.deleteOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                                            <DialogContent >
                                            <DialogContentText>
                                                                                Press save to delete goals highlighted red, press cancel to keep goals
                                                                             </DialogContentText>
                                                <div style={{ flexGrow: '1', maxWidth: '752' }}>
                                                    <Grid container spacing={2}  >
                                                        <Grid item xs>
                                                            <List>
                                                                {this.state.goals.filter(g => g !== null).map((goal, index) => (
                                                                    <div id={`${goal.title}`}>
                                                                        <ListItem >
                                                                            <ListItemText
                                                                                primary={goal.title}
                                                                            />
                                                                            <ListItemSecondaryAction>
                                                                                <IconButton edge="end" aria-label="delete">
                                                                                    <DeleteIcon onClick={() => { this.handleDelete(index) }} />
                                                                                </IconButton>
                                                                            </ListItemSecondaryAction>
                                                                        </ListItem>
                                                                    </div>
                                                                ))}
                                                            </List>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={() => { this.setState({ deleteOpen: false }) }} color="primary">
                                                    Cancel
                                            </Button>
                                                <Button onClick={this.handleDeleteSave} color="primary">
                                                    Save
                                             </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Grid>
                                </Grid>

                            </Container>
                        </Grid>
                        <Container maxWidth="lg">
                            {/* End goal unit */
                            }

                            <Grid container  spacing={4}>
                                {this.state.goals.filter(g => g !== null).map((goal, index) => (
                                    <Grid item key={goal.id}  xs={12} sm={6} md={4}>
                                        <Card className = {classes.root}>
                                            <CardMedia
                                                className = {classes.img}
                                                component="img"
                                                alt="add pic for goal"
                                                image={goal.imageUrl}
                                                title="Image title"
                                            />
                                            <CardContent  className = {classes.text}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    #{index + 1} {goal.title}
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={() => this.handleCompleteGoal(index)} size="small" color="primary">
                                                    Complete
                                                </Button>
                                                <Button size="small" color="primary">
                                                    Edit
                                                </Button>
                                                <form name={goal.title} onSubmit={this.handlePicSubmit} >
                                                    <Button type="submit" size="small" color="primary">Submit</Button>
                                                    <input type="file" onChange={this.getPic} />
                                                </form>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>


                    <BottomNav state={1} />
                </React.Fragment>
            </div >
        )
    }
}



export default withStyles(useStyles)(home)
