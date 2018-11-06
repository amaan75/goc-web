import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
import TeamsTable from './components/TeamsTable/TeamsTable';
import {Container, Button} from 'semantic-ui-react';
import {PLAYER_FIELD, TEAM_FIELD} from "./components/utils/Constants";
import {postData, postDataAxios} from "./components/utils/cricketApi";

const INITIAL_STATE = {
    teams: [{
        name: "Team 1",
        players: [
            {name: "player 1"},
            {name: "player 2"},
            {name: "player 3"},
            {name: "player 4"},
            {name: "player 5"},
            {name: "player 6"},
            {name: "player 7"},
            {name: "player 8"},
            {name: "player 9"},
            {name: "player 10"},
            {name: "player 11"}

        ]

    },
        {
            name: "Team 2",
            players: [
                {name: "player 1"},
                {name: "player 2"},
                {name: "player 3"},
                {name: "player 4"},
                {name: "player 5"},
                {name: "player 6"},
                {name: "player 7"},
                {name: "player 8"},
                {name: "player 9"},
                {name: "player 10"},
                {name: "player 11"}

            ]
        }]
};

class App extends Component {
    state = {...INITIAL_STATE};

    onChange = (e) => {
        let teams = this.state.teams;
        const field = e.target.dataset["field"];
        const index = e.target.dataset.index;
        const team = e.target.dataset.team - 1;
        switch (field) {
            case PLAYER_FIELD:
                teams[team].players[index] = e.target.value;
                break;
            case TEAM_FIELD:
                teams[team].name = e.target.value;
                break;
            default:
                console.log("should never get here, check the datase property field of " + e.target);
                console.log(e.target);
        }
        this.setState({teams});
    };

    onClick = (e) => {
        postData(`http://localhost:8080/api/saveTeamData`, this.state.teams)
            .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
            .catch(error => console.error(error));

    };

    render() {
        return (
            <Container>
                <TeamsTable
                    teams={this.state.teams}
                    onChange={this.onChange}
                />
                <Button onClick={this.onClick}>
                    Submit
                </Button>
            </Container>
        );
    }
}

export default App;
