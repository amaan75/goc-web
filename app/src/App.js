import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import {
    PLAYER_FIELD,
    TEAM_FIELD,
    HOME_ROUTE,
    TEAM_MGMT_ROUTE,
    TEAM_2_KEY,
    TEAM_1_KEY,
    TEAM_MGMT_DROPDOWN_KEY,
    TEAM_MGMT_STATE_KEY,
    MANAGED_TEAM_KEY,
    ACTIVE_ITEM_KEY,
    ADD_TEAM_ONCLICK,
    UPDATE_TEAM_ONCLICK
} from "./components/utils/Constants";
import {
    postData,
    getData,
    updateData
} from "./components/utils/cricketApi";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from './components/Navigation/nav';
import PlayGame from './components/PlayGame/PlayGame';
import TeamManagement from './components/TeamManagement/TeamManagement';
import {
    setMyState,
    INITIAL_STATE
} from './components/utils/stateUtils';



class App extends Component {
    state = { ...INITIAL_STATE };

    onChange = (e, obj) => {
        const field = obj.datafield;
        switch (field) {
            case PLAYER_FIELD:
                this.handleInputChange(
                    [TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY, "players", obj.dataindex, "name"],
                    obj.value)
                break;
            case TEAM_FIELD:
                this.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY, "name"],
                    obj.value)
                break;
            default:
                console.log("should never get here, check the datase property field of " + e.target);
                console.log(e.target);
        }
    };

    onClick = (unused, type) => {
        let url = ``;
        if (type === ADD_TEAM_ONCLICK) {
            url = `addNewTeam/postgres`;
            postData(url, this.state[TEAM_MGMT_STATE_KEY][MANAGED_TEAM_KEY])
                .then(team => this.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY], team)) // JSON-string from `response.json()` call
                .catch(error => console.error(error));
        }
        else if (type === UPDATE_TEAM_ONCLICK) {
            url = `updateTeamById/${this.state.playGameState.dropdownStates[TEAM_MGMT_DROPDOWN_KEY]}`;
            updateData(url, this.state[TEAM_MGMT_STATE_KEY][MANAGED_TEAM_KEY])
                .then(team => this.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY], team)) // JSON-string from `response.json()` call
                .catch(error => console.error(error));
        }
    };

    onDropdownChangeHandler = (e, key, value) => {
        const dropdownStates = this.state.playGameState.dropdownStates;
        switch (key) {
            case TEAM_1_KEY: dropdownStates[TEAM_1_KEY] = value;
                break;
            case TEAM_2_KEY: dropdownStates[TEAM_2_KEY] = value;
                break;
            case TEAM_MGMT_DROPDOWN_KEY: dropdownStates[TEAM_MGMT_DROPDOWN_KEY] = value;
                break;
            default:
                console.log("should be unreachable, but you are here,check the component" + e.target);
        }
        this.setState(prevState => ({ playGameState: { ...prevState.playGameState, dropdownStates: dropdownStates } }));
    }

    componentDidMount() {
        this.fetchAllTeams();

    }

    fetchAllTeams = () => {
        getData(`getAllTeams`)
            .then(teams => {
                const dropdownStates = {
                    [TEAM_1_KEY]: teams[0].id || "",
                    [TEAM_2_KEY]: teams[1].id || "",
                    [TEAM_MGMT_DROPDOWN_KEY]: teams[0].id || "",
                };
                this.setState(prevState => {
                    return {
                        teams,
                        playGameState: {
                            ...prevState.playGameState,
                            dropdownStates: dropdownStates
                        }
                    }
                });
                this.fetchTeamData(this.state.playGameState.dropdownStates[TEAM_MGMT_DROPDOWN_KEY])
            })
            .catch(error => console.log(error));
    }

    fetchTeamData = (value, customActionOnSuccess, customActionOnError) => {
        if (value) {
            this.setState({ isLoading: true });
            getData(`getTeamById/${value}`)
                .then(team => {
                    this.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY], team);
                    if (customActionOnSuccess)
                        customActionOnSuccess();
                })
                .catch(error => {
                    console.log(error)
                    if (customActionOnError)
                        customActionOnError();
                });

        }
    }

    handleInputChange = (pathArray, value) => {
        this.setState(setMyState(this.state, pathArray, value));
    }

    handleLinkClick = (e, { to }) => {
        this.handleInputChange([ACTIVE_ITEM_KEY], to);
    }

    render() {
        return (
            <Router>
                <Container>
                    <Nav handleLinkClick={this.handleLinkClick} activeItem={this.state[ACTIVE_ITEM_KEY]} />
                    {/* {JSON.stringify(this.state, null, 2)} */}
                    <Route exact path={HOME_ROUTE}
                        render={props => <PlayGame
                            teams={this.state.teams}
                            onDropdownChangeHandler={this.onDropdownChangeHandler}
                            dropdownStates={this.state.playGameState.dropdownStates}
                        />}
                    />
                    <Route exact path={TEAM_MGMT_ROUTE}
                        render={props =>
                            <TeamManagement
                                teams={this.state.teams}
                                managedTeam={this.state[TEAM_MGMT_STATE_KEY][MANAGED_TEAM_KEY]}
                                onChange={this.onChange}
                                onClick={this.onClick}
                                onDropdownChangeHandler={this.onDropdownChangeHandler}
                                dropdownStates={this.state.playGameState.dropdownStates}
                                handleInputChange={this.handleInputChange}
                                fetchAllTeams={this.fetchAllTeams}
                                fetchTeamData={this.fetchTeamData}

                            />}
                    />
                </Container>
            </Router>
        );
    }

}

export default App;
