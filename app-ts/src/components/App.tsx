import React, { Component } from 'react';
import { Container, MenuItemProps } from "semantic-ui-react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './navigation/nav';
import { AppState } from "../utils/types";
import { getInitAppState } from "../utils/stateUtils"
import { HOME_ROUTE } from '../utils/routes';
import PlayGame from "./playgame/PlayGame"




class App extends Component<{}, AppState> {
  state = {
    ...getInitAppState()
  }

  handleLinkClick =
    (_unusedEvent: any, data: MenuItemProps) =>
      this.setState({ activeItemRoute: data.to })




  render() {
    const { teams } = this.state;
    return (
      <Router>
        <Container textAlign="center">
          <Nav
            handleLinkClick={this.handleLinkClick}
            activeItem={this.state.activeItemRoute} />


          <Route path={HOME_ROUTE} exact render={(_unusedProps: any) =>
            <PlayGame teams={teams} />} />


        </Container>
      </Router>
    );
  }
}

export default App;