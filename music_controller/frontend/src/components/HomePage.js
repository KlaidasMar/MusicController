import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";
import Info from "./Info";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roomCode: null,
        };
        this.clearRoomCode = this.clearRoomCode.bind(this);
    }

    async componentDidMount() {
        fetch('/api/user-in-room')
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    roomCode: data.code
                });
            });
    }

    renderHomePage() {
        return(
        <Grid container spacing={3}>
            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h3">
                House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant="contained" color="primary">
                    <Button color="primary" component={Link} to="/join">
                        Join a Room
                    </Button>
                    <Button color="default" component={Link} to="/info">
                        Info
                    </Button>
                    <Button color="secondary" component={Link} to="/create">
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        );
    }

    clearRoomCode () {
        this.setState({
            roomCode: null,
        });
    }

    render() {
        return <Router>
            <Switch>
                <Route
                exact
                path="/"
                render={() => {
                    return this.state.roomCode ? (
                        <Redirect to={`/room/${this.state.roomCode}`} />
                    ) : (
                        this.renderHomePage()
                    );
                }}
                />
                <Route path='/join' component={RoomJoinPage} />
                <Route path='/info' component={Info} />
                <Route path='/create' component={CreateRoomPage} />
                <Route
                    path='/room/:roomCode'
                    render={(props) => {
                        return <Room {...props} leaveRoomCallBack={this.clearRoomCode} />;
                    }}
                />
            </Switch>
        </Router>;
      }
    }