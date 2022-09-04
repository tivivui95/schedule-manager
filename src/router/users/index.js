import { Button, Container, Grid, BottomNavigation, BottomNavigationAction } from '@mui/material';
import React, { Component }  from 'react';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
class Users extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            coursesChecked: new Array(this.props.data.subjects.length).fill(false),
            userinfo: this.props.data.users.find(o => o.username === this.props.username),
            value: 0
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
                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
                    <Grid item xs>
                        <h1>Hi {this.state.userinfo.name}</h1>
                    </Grid>
                </Grid>
                <h3>Courses you have in:</h3>
                {this.state.userinfo.courses.length === 0 ? "You don't have any course": <div>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Course Name </TableCell>
                        <TableCell align="right">Date Started</TableCell>
                        <TableCell align="right">Max Students</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.userinfo.courses.map(item => {
                        let curItem = this.props.data.subjects.find(o => o.name === item);
                        return (
                        <TableRow key={item}>
                            <TableCell>{curItem.name}</TableCell>
                            <TableCell align="right">{curItem.datestart}</TableCell>
                            <TableCell align="right">{curItem.maxcap}</TableCell>
                        </TableRow>
                        )
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                    
                </div>}
                <h3>Choose Courses:</h3>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Course Name </TableCell>
                        <TableCell align="right">Date Started</TableCell>
                        <TableCell align="right">Max Students</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                {
                    this.props.data.subjects.length === this.state.userinfo.courses.length ? <TableRow>
                        No course left
                    </TableRow> : (<>
                        {this.props.data.subjects.map((item, index) => !this.state.userinfo.courses.includes(item.name) ? (
                            <TableRow key={item}>
                            <TableCell>
                                <Checkbox 
                                checked={this.state.coursesChecked[index]} 
                                onChange={() => this.handleChecked(index)} />
                            </TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell align="right">{item.datestart}</TableCell>
                            <TableCell align="right">{item.maxcap}</TableCell>
                        </TableRow>
                        ) : <></>)}
                        </>)
                }
                </TableBody>
                </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={() => this.props.submitCallback(this.state.coursesChecked, this.props.username, this.props.data)}>Enroll</Button>
            </Container>
        );
    }
}

export default Users;