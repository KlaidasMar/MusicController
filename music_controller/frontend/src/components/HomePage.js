import React, { Component } from 'react';
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import { Grid, Button, ButtonGroup, Typography } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Room from "./Room";


export default class HomePage extends Component {
  constructor(props) {
    super(props);
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
                    <Button color="secondary" component={Link} to="/create">
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        );
    }

  render() {
    return <Router>
        <Switch>
            <Route exact path="/">
            {this.renderHomePage}
            </Route>
            <Route path='/join' component={RoomJoinPage} />
            <Route path='/create' component={CreateRoomPage} />
            <Route path='/room/:roomcode' component={Room} />
        </Switch>
    </Router>;
  }
}