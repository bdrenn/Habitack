import React from 'react'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import DialogActions from '@material-ui/core/DialogActions'
import axios from 'axios'

export default function EditGoalButton(props) {
    const [state, setState] = React.useState({
        title: props.title.toString(),
        start: '',
        end: '',
    });
    const [isOpen, setOpen] = React.useState(false);

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };



    const handleSubmit = (e) => {
        //post to back end
        e.preventDefault();
        let startSplit = state.start.split('-')
        let start = `${startSplit[1]}-${startSplit[2]}-${startSplit[0]}`
        let endSplit = state.end.split('-')
        let end = `${endSplit[1]}-${endSplit[2]}-${endSplit[0]}`

        let goal = { title: state.title, start: start, end: end }
        console.log(goal);
        console.log(`${props.title}`)

        axios
            .put(`/goal/${props.title}`, goal)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)

            })


        setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div >

            <Grid item>
                <Button size="small" color="primary" onClick={handleClickOpen}>
                    Edit Goal
                                            </Button>
            </Grid>


            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Goal</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update fields with new values
                    </DialogContentText>
                    <TextField
                        autoFocus name="title"
                        onChange={handleChange}
                        margin="dense"
                        id="title"
                        label="title"
                        type="string"
                        value={state.title}
                        fullWidth>

                    </TextField>
                     Start
                   <TextField
                        autoFocus
                        margin="dense"
                        id="start"
                        type="date"
                        name="start"
                        fullWidth
                        onChange={handleChange}
                    />
                                            End
                                            <TextField
                        autoFocus
                        margin="dense"
                        id="end"
                        name="end"
                        type="date"
                        fullWidth
                        onChange={handleChange}
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
    )
}

