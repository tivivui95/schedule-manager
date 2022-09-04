import { Button, Container, TextField, Grid } from '@mui/material';
import React, { Component }  from 'react';
import './App.css';
import data from './data.json';
import Manage from './router/admin';
import Users from './router/users';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import SchoolIcon from '@material-ui/icons/School';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = ({ 
      data: data, 
      isLogIn: false, 
      isAdmin: false,
      username: '',
      password: '',
      curUser: '' });
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
    for (let i = 0; i < this.state.data.users.length; i++) {
      const element = this.state.data.users[i];
      if (element.username === this.state.username)
      if (element.password === this.state.password) {
        this.setState({ curUser: element.username, isLogIn: true, isAdmin: false });
        // alert('Welcome!');
        // break;
        return;
      } 
    }
    for (let i = 0; i < this.state.data.admins.length; i++) {
      const element = this.state.data.admins[i];
      if (element.username === this.state.username)
      if (element.password === this.state.password) {
        this.setState({ curUser: element.username, isLogIn: true, isAdmin: true });
        // alert('Welcome!');
        // break;
        return;
      } 
    }
    alert('Username or Password is Incorrect!');
    // !this.isLogIn ? alert('Username or Password is Incorrect!') : alert('Welcome!');
  }

  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }

  render() {
    console.log(this.state.data);
    return (
      <div>
        { !this.state.isLogIn ? <div>
          <Container maxWidth="sm">
          <Grid container direction="column" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs>
              <h1>Log in</h1>
            </Grid>
            <Grid item xs>
              <SchoolIcon />
            </Grid>            
            <Grid item xs>
              <TextField
              id="standard-basic" 
              label='Username' 
              type='text' 
              value={this.state.username} 
              onChange={this.handleUsername} />
            </Grid>
            <Grid item xs>
              <TextField 
              id="standard-basic" 
              label='Password' 
              type='password' 
              value={this.state.password} 
              onChange={this.handlePassword} />
            </Grid>
            <Grid item xs>
              <Button variant="contained" color="primary" onClick={this.logIn}><VpnKeyRoundedIcon /> &nbsp; Log In</Button>
            </Grid>
          </Grid>            
          </Container>
        </div> : this.state.isAdmin ? 
        <Manage 
        username={this.state.curUser} 
        data={this.state.data} 
        logout={this.logOut} /> :
        <Users 
        username={this.state.curUser} 
        data={this.state.data} 
        logout={this.logOut}
        submitCallback={this.submitCallback} />}
      </div>
    );
  }
}


export default App;
