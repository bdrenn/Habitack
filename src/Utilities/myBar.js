import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import Typography from "@material-ui/core/Typography"
import { IconButton } from "@material-ui/core"
import withStyles from "@material-ui/core/styles/withStyles"

const styles = (theme) => ({
  app: {
    backgroundColor: "#6495ED",
  },
})

class MyBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { classes } = this.props
    return (
      <AppBar className={classes.app} position="relative">
        <Toolbar>
          <IconButton href="/editAccount" color="inherit">
            <AccountCircleIcon className="icon" />
          </IconButton>
          {/*Typogragpy is imported form material-ui can have different types of text if you change the variant and color*/}
          <Typography variant="h6" color="inherit" noWrap>
            {this.props.page}
          </Typography>
        </Toolbar>
      </AppBar>
    )
  }
}
export default withStyles(styles)(MyBar)
