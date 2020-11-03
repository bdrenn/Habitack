import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { authMiddleWare } from '../Utilities/auth'
import MyBar from '../Utilities/myBar'
import MyBotNav from '../Utilities/myBotNav'
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button/Button'


const styles = (theme) => ({
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
})


class EditAccount extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      expanded: false,
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      displayName: "",
      passOne: "",
      passTwo: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePass = this.updatePass.bind(this);
    this.updateDisplayName = this.updateDisplayName.bind(this);
  }
  
  handleChange = (panel) => (event, isExpanded) => {
    if(isExpanded) {
      this.setState( {
        expanded: panel
      })
    }
    else {
      this.setState( {
        expanded: false
      })
    }
      }
  
  

  updateUserName = (e) => {
    e.preventDefault();
    console.log("clicked update")
    var res = this.state.firstName.split(" ")
    const account = { 
      firstName: res[0],
      lastName: res[1],
      userName: this.state.userName
     }

     console.log(account)
    axios.put("api/updateUser", account)
    .then((respone) => {
      console.log(respone)
      this.props.history.push('/EditAccount')
    })
    .catch((error) => {
      console.log(error)
    })
    
  }

  updateEmail = (e) => {
    e.preventDefault();
    console.log("clicked update")
    const account = { 
      email: this.state.email,
      userName: this.state.userName
     }
     console.log(account)
    axios.put("api/updateEmail", account)
    .then((respone) => {
      console.log(respone)
      this.props.history.push('/EditAccount')
    })
    .catch((error) => {
      console.log(error)
    })
  }

  updatePass = (e) => {
    e.preventDefault();
    let account = {passOne: this.state.passOne}
    if(this.state.passOne != this.state.passTwo){
      console.log("Passwords do not match")
    }
    else{
      axios.put("/api/updatePass", account)
      .then((response) => {
        console.log("success changing password")
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  updateDisplayName= (e) => {
    e.preventDefault();
    let account = {displayName: this.state.displayName, username: this.state.userName}
    axios.put("/api/changeDisplay", account)
    .then((response) => {
      console.log("success changing display name")
    })
    .catch((error) => {
      console.log(error)
    })

  }

  componentDidMount = () => {
    document.title = 'Edit User Account'
    
    authMiddleWare(this.props.history);
		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('api/getUser')
			.then((response) => {
        this.setState({
          firstName: response.data.userCredentials.firstName,
          lastName: response.data.userCredentials.lastName,
          email: response.data.userCredentials.email,
          userName: response.data.userCredentials.username,
          displayName: response.data.userCredentials.displayname
        });
			})
			.catch((error) => {
				if(error) {
					this.props.history.push('/')
				}
				console.log(error);
      });
      
    }
  
  render(){
    const {classes} = this.props;
  return (
    <div>

      <MyBar page = "Edit Account"/>

      <Container maxWidth='md' >
        <div>
          <Avatar  className = {classes.large} styles={{ alignItems: 'center', width: '120px',height: '120px', marginTop: '15px',marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto', }} />
        </div>
        <Accordion classes={{ root: classes.summary }} expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
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
                            <input onChange={e => this.setState({ firstName: e.target.value })} style={{ width: "250px" }} type="text" placeholder={this.state.firstName + " " + this.state.lastName} name="new-name"></input>
                        </div>
                        <Button onClick = {this.updateUserName} color="primary">Submit</Button>
                    </div>
                </AccordionDetails>
            </Accordion >
            <Accordion expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')} classes={{ root: classes.summary }}>
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
                            <input onChange={e => this.setState({ email: e.target.value })} style={{ width: "250px" }} type="text" placeholder={this.state.email} name="new-email"></input></div>
                        <Button onClick = {this.updateEmail} color="primary">Submit</Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')} classes={{ root: classes.summary }}>
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
                        <div><input onChange={e => this.setState({ displayName: e.target.value })} style={{ width: "250px" }} type="text" name="new-user" placeholder={this.state.displayName}></input></div>
                        <Button  onClick = {this.updateDisplayName} color="primary">Submit</Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')} classes={{ root: classes.summary }}>
                <AccordionSummary
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Password</Typography>
                    <Typography style={{ fontSize: "smaller", color: 'blue' }}><small>Edit&gt;</small></Typography>
                </AccordionSummary>
                <AccordionDetails classes={{ root: classes.field }}>
                    <Typography component={'div'}>
                        <div><label>New Password</label> <br /><input onChange={e => this.setState({ passOne: e.target.value })} style={{ width: "300px" }} type="password" name="new-pass"></input></div>
                        <div><label>Confirm Password</label> <br /><input onChange={e => this.setState({ passTwo: e.target.value })} style={{ width: "300px" }} type="password" name="new-pass-conf"></input></div>
                        <Button onClick = {this.updatePass} color="primary">Submit</Button>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <MyBotNav />
        </div>
      </Container>
    </div>
  )
}
}

export default withStyles(styles)(EditAccount);