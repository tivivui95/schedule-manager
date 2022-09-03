import React, { Component }  from 'react';
import { Button } from '@mui/material';

class Manage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        userinfo: this.props.data.admins.find(o => o.username = this.props.username)
    }
  }
  render() {
    let data = this.props.data;
    return (
      <div>
        <h1>Welcome {this.state.userinfo.name}</h1>
        <Button onClick={() => this.props.logout()}>Log Out</Button>
        <div>
          <h3>View by Students</h3>
          {data.users.map((item, index) => (<div>
            <h3>Name: {item.name}</h3>
            {item.courses.length !== 0 ? 
            <table>
              <tr>
                <th>Course Name</th>
                <th>Date Started</th>
                <th>Max Capacity</th>
              </tr>
              {item.courses.map(course => {
              let crsinfo = data.subjects.find(o => o.name === course);
              return (<tr>
                <td>{crsinfo.name}</td>
                <td>{crsinfo.datestart}</td>
                <td>{crsinfo.maxcap}</td>
                </tr>)
            })}</table>: ''}
          </div>))}
        </div>
        <div>
          <h3>View by Courses</h3>
          {data.subjects.map((item, index) => (<div>
            <h3>Course Name: {item.name}</h3>
            {item.users.length !== 0 ? 
            <table>
              <tr>
                <th>Students Name</th>
                <th>Username</th>
              </tr>
              {item.users.map(user => {
              let crsinfo = data.users.find(o => o.username === user);
              return (<tr>
                <td>{crsinfo.name}</td>
                <td>{crsinfo.username}</td>
                </tr>)
            })}</table>: ''}
          </div>))}
        </div>
      </div>
    )
  }
}

export default Manage;
