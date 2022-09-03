import { Button } from '@mui/material';
import React, { Component }  from 'react';
import './App.css';
import data from './data.json';
import Manage from './router/admin';
import Users from './router/users';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({ 
      data: data, 
      isLogIn: false, 
      isAdmin: false,
      username: '',
      password: '' });
    this.submitCallback = this.submitCallback.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  submitCallback (newData, username, oldData) {
    let tempArr = oldData;
    let tempUser = oldData.users.find(o => o.username === username);
    newData.forEach((element, index) => {
      if (element) {
        if(!tempUser.courses.includes(tempArr.subjects[index].name))
        tempUser.courses.push(tempArr.subjects[index].name);
        tempArr.subjects[index].users.push(username);
      }
    });
    for (let i = 0; i < tempArr.users.length; i++) {
      if (tempArr.users[i].username === username) {
        tempArr.users[i] = tempUser;
        break;
      }
    }
    console.log(tempArr);
    this.setState({ data: tempArr });
  }

  logOut = () => {
    this.setState({ isLogIn: false });
  }

  logIn() {
    this.state.data.users.forEach(element => {
      if (element.username === this.state.username)
      if (element.password === this.state.password) {
        this.setState({ curUser: element.username, isLogIn: true, isAdmin: false });
        return;
      } 
    });
    this.state.data.admins.forEach(element => {
      if (element.username === this.state.username)
      if (element.password === this.state.password) {
        this.setState({ curUser: element.username, isLogIn: true, isAdmin: true });
        return;
      } 
    });
    this.isLogIn ? alert('Username or Password is Incorrect!'): alert('Welcome!');
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    let username = 'john';
    console.log(this.state.data);
    return (
      <div>
        { !this.state.isLogIn ? <div>
          <label>Username</label>
          <input type='text' value={this.state.username} onChange={this.handleUsername} />
          <label>Password</label>
          <input type='password' value={this.state.password} onChange={this.handlePassword} />
          <br></br>
          <Button onClick={this.logIn}>Log In</Button>
        </div> : this.state.isAdmin ? 
        <Manage 
        username={username} 
        data={this.state.data} 
        logout={this.logOut} /> :
        <Users 
        username={username} 
        data={this.state.data} 
        logout={this.logOut}
        submitCallback={this.submitCallback} />}
      </div>
    );
  }
}


export default App;
