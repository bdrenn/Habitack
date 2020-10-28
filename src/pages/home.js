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


import Goals from '../Utilities/Goals';
import AddGoal from '../Utilities/AddGoal';

//copyright function to be used in footer
function Copyright() {
    return (
        //make element with 'Copyright 2020 [link to github]'
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright � '}
            {new Date().getFullYear()}
            {' '}
            <Link color="inherit" href="https://github.com/bdrenn/Habitack">
                https://github.com/bdrenn/Habitack
            </Link>{' '}
            {'.'}
        </Typography>
    );
}//end copyright element

//use css template CssBaseline from '@material-ui/core/CssBaseline'
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

//list of items to be diplayed 
const cards = [1, 2, 3];
//////
class home extends Component {
  
    state ={
      goals: [ 
        {
          id: 1,
          title: 'Work out',
          completed: false
        },
        {
          id: 2,
          title: 'Read book',
          completed: false
        },
        {
          id: 3,
          title: 'Paint',
          completed: false
        },
      ]
      
    }
    //Mark goal complete
    markComplete = (id) => {
      this.setState({ goals: this.state.goals.map(goal => {
        if(goal.id === id) {
          goal.completed = !goal.completed
        }
        return goal;
      }) });
    }
  
    //Delete goal
    delGoal = (id) => {
      this.setState({ goals: [...this.state.goals.filter(goal => goal.id !== id)] });
    }
  
    //add goal
    addGoal = (title) => {
      const newGoal = {
        id:  4,
        title,
        completed: false
      }
      this.setState({ goals: [...this.state.goals, newGoal]});
    }
  
    render() {
      return (
        <div className="App">
         <MyBar page="Goals" />
          <div className="container">
            <AddGoal addGoal={this.addGoal} />
            <Goals goals={this.state.goals} markComplete={this.markComplete} delGoal={this.delGoal}/>
          </div>  
          <BottomNav />
        </div>
      );
    }
  }
  
  export default (home)



//list of items to be diplayed , pull from back end here
/* const goals = [
    { id: 1, description: "work out", image: "https://cdn3.iconfinder.com/data/icons/vacation-4/32/vacation_18-512.png"}, 
    { id: 2, description: "read", image: "https://cdn3.iconfinder.com/data/icons/book-shop-category-ouline/512/Book_Shop_Category-06-512.png"},
    { id: 3, description: "work on sprint", image: "https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_trending_up_48px-512.png"}]//default





////
/*
export default function Album() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <MyBar page="My Goals" />
            <main>
                {/* goal unit *
 ///}
/*
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Habitact
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Its a new day, you got this !
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Create new goal
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        View Stats
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End goal unit */
//}
 /*
                    <Grid container spacing={4}>
                        {goals.map((goal) => (
                            <Grid item key={goal.id} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image = {goal.image}
                                        title="Goal Icon description"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            Goal #{goal.id}
                                        </Typography>
                                        <Typography>
                                            Description: {goal.description}
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
            {/* Footer */
//}
/*
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Habitack
        </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Your limits are only how big you can dream!
                </Typography>
                <Copyright />
            </footer>
            {/* End footer */
//}
/*
//        </React.Fragment>
//    );}
//*/