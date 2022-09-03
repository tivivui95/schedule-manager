import { Button } from '@mui/material';
import React, { Component }  from 'react';

class Users extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            coursesChecked: new Array(this.props.data.subjects.length).fill(false),
            userinfo: this.props.data.users.find(o => o.username = this.props.username)
        }
    }

    handleChecked = (position) => {
        const updatedCheckedState = this.state.coursesChecked.map((item, index) =>
            index === position ? !item : item
        );

        this.setState({
            coursesChecked: updatedCheckedState,
        });
    }
    render () {
        return (
            <div>
                <h1>Welcome {this.state.userinfo.name}</h1>
                <Button onClick={() => this.props.logout()}>Log Out</Button>
                <h3>Courses you have in:</h3>
                {this.state.userinfo.courses.length === 0 ? "You don't have any course": <div>
                    {this.state.userinfo.courses.map(item => (<div key={item}>{item}</div>))}
                </div>}
                <h3>Choose Courses:</h3>
                {
                    this.props.data.subjects.length === this.state.userinfo.courses.length ? <div>
                        No course left
                    </div> : <div>
                        {this.props.data.subjects.map((item, index) => !this.state.userinfo.courses.includes(item.name) ? (<div>
                            <input 
                            type="checkbox"
                            checked={this.state.coursesChecked[index]} 
                            onChange={() => this.handleChecked(index)} />
                            {item.name}
                        </div>) : '')}
                        <Button onClick={() => this.props.submitCallback(this.state.coursesChecked, this.props.username, this.props.data)}>Submit</Button>
                    </div>
                }
            </div>
        );
    }
}

export default Users;