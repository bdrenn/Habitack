import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button'
import Avatar from '@material-ui/core/Avatar'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';



const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    backgroundColor: '#5280e9',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '91%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '85%',
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  botNav: {
    position: 'fixed',
    bottom: '0',
    width: '100%'
  },
  summary: {
    backgroundColor: '#99CCFF',
    border: '1px black solid',
    borderBottom: '0px',

  },
  field: {
    backgroundColor: '#B5D3E7',
    borderTop: '1px solid black'
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  app: {
    top: '0',
    width: '100%'
  }
}));







export default function editAccount() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    document.title = 'Edit User Account'
    document.body.style.backgroundColor = "#5280e9";
  });

  return (
    <div>
      <AppBar className={classes.app} position="relative">
        <Toolbar>
          <AccountCircleIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Edit Account
                    </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='md' >
        <div>
          <Avatar className={classes.large} styles={{ alignItems: 'center' }} />
        </div>

        <Accordion classes={{ root: classes.summary }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            aria-label="Expand"
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Name </Typography>
            <Typography align='right' style={{ fontSize: "smaller", color: 'blue' }}><small>Edit&gt;</small></Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.field }} >
            <div>
              <div>
                <label>Full Name</label> <br></br>
                <input style={{ width: "250px" }} type="text" placeholder="Fernando Felix" name="new-name"></input>
              </div>
              <Button color="primary">Submit</Button>
            </div>

          </AccordionDetails>
        </Accordion >
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} classes={{ root: classes.summary }}>
          <AccordionSummary
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}>Email</Typography>
            <Typography style={{ fontSize: "smaller", color: 'blue' }}><small>Edit&gt;</small></Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.field }}>
            <Typography component={'div'}>
              <div><label>Email</label> <br />
                <input style={{ width: "250px" }} type="text" placeholder="fernando.felix@student.csulb.edu" name="new-email"></input></div>
              <Button color="primary">Submit</Button>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} classes={{ root: classes.summary }}>
          <AccordionSummary
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}>User Name</Typography>
            <Typography style={{ fontSize: "smaller", color: 'blue' }}><small>Edit&gt; </small></Typography>

          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.field }}>
            <Typography component={'div'}>

              <div><label>User Name: </label></div>
              <div><input style={{ width: "250px" }} type="text" name="new-email" placeholder="User Name"></input></div>
              <Button color="primary">Submit</Button>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} classes={{ root: classes.summary }}>
          <AccordionSummary
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>Password</Typography>
            <Typography style={{ fontSize: "smaller", color: 'blue' }}><small>Edit&gt;</small></Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.field }}>
            <Typography component={'div'}>

              <div><label>Old Password: </label>  <br></br></div>
              <div><input style={{ width: "250px" }} type="password" name="cur-pass"></input></div>
              <div><label>New Password</label> <br /><input style={{ width: "300px" }} type="password" name="new-pass"></input></div>
              <div><label>Confirm Password</label> <br /><input style={{ width: "300px" }} type="password" name="new-pass-conf"></input></div>
              <Button color="primary">Submit</Button>

            </Typography>
          </AccordionDetails>
        </Accordion>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            showLabels
            className={classes.botNav}
          >
            <BottomNavigationAction label="Goals" icon={<RestoreIcon />} />
            <BottomNavigationAction label="Home" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Account" icon={<LocationOnIcon />} />
           
          </BottomNavigation>
        </div>
      </Container>
    </div>



  )
}