import React from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { authMiddleWare } from '../Utilities/auth'

const styles = (theme) => ({
large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});


export default class ProfilePic extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            picUrl: "",
            postPic: "",
            imageUpload: "N/A"
        }
        
    this.getMyPic = this.getMyPic.bind(this);
    this.getPic = this.getPic.bind(this);
    this.handlePicSubmit = this.handlePicSubmit.bind(this);
    }

    componentDidMount(){
        
    authMiddleWare(this.props.history);
    const authToken = localStorage.getItem('AuthToken');
    axios.defaults.headers.common = { Authorization: `${authToken}` };
        
        this.getMyPic();
    }
    


 getMyPic = () =>{
    axios.get('/profilePic')
    .then((response) =>{
        this.setState({
            picUrl: response.data.pic,
        })
        
    })
    .catch((err) => {
        console.log(err)
    })
}

getPic(event){
    this.setState({
        imageUpload: event.target.files[0]
    })
    console.log(this.imageUpload)
}
handlePicSubmit(e){
    e.preventDefault()
    if(this.imageUpload === 'n/a'){
        return;
    }
    let form_data = new FormData();
    form_data.append('image', this.state.imageUpload);
    //form_data.append('content', this.state.content);
    
    axios
        .post(`/profile`, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(() => {
            //window.location.reload();
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

    
render (){
return(
    <div>   
    <Avatar style = {{
    marginTop: '15px',
    marginBottom: '15px',
    marginLeft: 'auto',
    marginRight: 'auto',height: '300px', width: '300px'}} src= {this.state.picUrl} />
    <br /><hr />
    <form onSubmit = {this.handlePicSubmit}>
    <div>
        <label>Select your profile picture: &nbsp;&nbsp;&nbsp;</label>
        <input onChange = {this.getPic} type="file" name="profile_pic" />
        <input type="submit" name="btn_upload_profile_pic" value="Upload" />
    </div>
    <hr /> <br />
</form>
    </div>
)
}
}
