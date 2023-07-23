import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component{
    constructor(props){
        super(props);
        this.state= {
            roomCode: null,
        };
        this.clearRoomCode= this.clearRoomCode.bind(this);
    }

    async componentDidMount(){ //component just rendered for the 1st time on the screen
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code,
                });
            });
    }

    renderHomePage(){
        return(
            <Grid container spacing={3}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        House Party
                    </Typography> 
                </Grid>
                <Grid item xs={12} align="center">
                    <ButtonGroup disableElevation variant="contained" color="primary">
                        <Button color="primary" to="/join" component={ Link }>
                            Join A Room
                        </Button>
                        <Button color="secondary" to="/create" component={ Link }>
                            Create A Room
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        );
    }

    clearRoomCode(){
        this.setState({
            roomCode: null,
        });
    } //reset room code

    render(){
        return (
            <Router>
                <Switch>
                    <Route exact path="/" render={() =>{
                        return this.state.roomCode ? (<Redirect to={ `/room/${this.state.roomCode}` } />) : (this.renderHomePage());
                    }}>     
                    </Route>
                    <Route path="/join" component={RoomJoinPage} />
                    <Route path="/create" component={CreateRoomPage} />
                    <Route 
                        path="/room/:roomCode" 
                        render={(props) => {
                            return <Room {...props} leaveRoomCallback={this.clearRoomCode} />; //clear roomcode whenever we leave room
                        }} />  
                        //...spread operator which takes properties of object and spread them out
                    
                </Switch>
            </Router>
        );
    }
}

// function Home(){
//     return <p>Home Page</p>;
// }