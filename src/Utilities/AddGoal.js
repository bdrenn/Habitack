import React, { Component } from 'react'

export class AddGoal extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addGoal(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render(){
        return (
            <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
                <input 
                    type="text" 
                    name="title" 
                    style={{ flex: '10', padding: '5px'}}
                    placeholder = "Add Goal ..."
                    value={this.state.title}
                    onChange={this.onChange}
                    />
                    <input 
                        type="submit"
                        value="Submit"
                        className="btn"
                        style={{flex: '1'}}
                    />
            </form>
        )
    }
}

export default AddGoal
