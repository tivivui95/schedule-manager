import React, { Component }  from 'react';
import { Container, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';

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
      <Container sm>
        <BottomNavigation
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({ value: newValue });
                }}
                showLabels
                >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Log Out" icon={<ExitToAppIcon />} onClick={() => this.props.logout()} />
                </BottomNavigation>
        <h1>Welcome {this.state.userinfo.name}</h1>
        <div>
          <h3>1. View by Students</h3>
          <TableContainer component={Paper}>
                <Table aria-label="simple table">
                {data.users.map((item, index) => (<>
                  <TableHead>
                    <TableCell>Name and Username:</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                  </TableHead>
                  {item.courses.length !== 0 ? 
                  <>
                    <TableHead>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Date Started</TableCell>
                      <TableCell>Max Capacity</TableCell>
                    </TableHead>
                    {item.courses.map(course => {
                    let crsinfo = data.subjects.find(o => o.name === course);
                    return (<TableBody>
                      <TableCell>{crsinfo.name}</TableCell>
                      <TableCell>{crsinfo.datestart}</TableCell>
                      <TableCell>{crsinfo.maxcap}</TableCell>
                      </TableBody>)
                  })}</>: <TableBody><TableCell>No course</TableCell></TableBody>}
                </>))}
                </Table>
                </TableContainer>
        </div>
        <div>
          <h3>2. View by Courses</h3>
          {data.subjects.map((item, index) => (<div>
            <h3>Course Name: {item.name}</h3>
            {item.users.length !== 0 ? 
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableCell>Students Name</TableCell>
                <TableCell>Username</TableCell>
              </TableHead>
              {item.users.map(user => {
              let crsinfo = data.users.find(o => o.username === user);
              return (<TableBody>
                <TableCell>{crsinfo.name}</TableCell>
                <TableCell>{crsinfo.username}</TableCell>
                </TableBody>)
            })}</Table></TableContainer>: 'No student'}
          </div>))}
        </div>
      </Container>
    )
  }
}

export default Manage;
