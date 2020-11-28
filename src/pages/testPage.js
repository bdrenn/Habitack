import React from 'react'
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'


export default class Test extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            picUrl: ""
        }
        this.getMyPic = this.getMyPic.bind(this);
    }

    componentDidMount(){
        this.getMyPic();
    }
    


 getMyPic = () =>{
    const authToken = localStorage.getItem('AuthToken');
	axios.defaults.headers.common = { Authorization: `${authToken}` };
    axios.get('/getGoalPic')
    .then((response) =>{
        this.setState({
            picUrl: response.data.pic
        })
        
    })
    .catch((err) => {
        console.log(err)
    })
    
}
render (){
return(
    <div>   
    <Button onClick = {this.getMyPic} />
    <Avatar style = {{height: '300px', width: '300px'}} src= {this.state.picUrl} />
    <br /> <hr />
    <form method="POST" action="/addGoalPic" enctype="multipart/form-data">
    <div>
        <label>Select your profile picture:</label>
        <input type="file" name="profile_pic" />
    </div>
    <div>
        <input type="submit" name="btn_upload_profile_pic" value="Upload" />
    </div>
</form>
    </div>
)
}
}