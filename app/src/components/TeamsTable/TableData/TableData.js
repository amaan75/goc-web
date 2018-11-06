import React from "react";
import {Table, Input} from "semantic-ui-react";
import {PLAYER_FIELD, TEAM_FIELD} from "../../utils/Constants";
import withDataSet from "../../utils/withDataSet";

class TableData extends React.Component {


    render() {
        let teamsTableFields = [];
        this.props.teams.forEach((team, index) => teamsTableFields.push(this.createTeamData({
            teamNumber: (index + 1),
            teamName: team.name,
            playerList: team.players
        })));
        return (
            <Table.Body>
                {teamsTableFields}
            </Table.Body>
        );
    }


    createTeamData = (team) => (
        <React.Fragment>
            <Table.Row>
                {this.createTeamDataColumn(team)}
            </Table.Row>
            {this.createPlayerDataColumns(team)}
        </React.Fragment>
    );

    createTeamDataColumn = ({teamNumber, teamName, playerList}) => (
        <React.Fragment>
            <Table.Cell rowSpan={playerList.length}>
                Team {teamNumber}
            </Table.Cell>
            <Table.Cell rowSpan={playerList.length}>
                {withDataSet(<Input data-index={0}
                                    data-field={TEAM_FIELD}
                                    data-team={teamNumber}
                                    value={teamName}
                                    onChange={this.props.onChange}
                                    placeholder={"Enter Team Name"}/>)}
            </Table.Cell>
            <Table.Cell>
                Player 1
            </Table.Cell>
            <Table.Cell>
                {withDataSet(<Input data-index={0}
                                    data-field={PLAYER_FIELD}
                                    data-team={teamNumber}
                                    value={playerList[0].name}
                                    onChange={this.props.onChange}
                                    placeholder={"Enter Player Name"}/>)}

            </Table.Cell>
        </React.Fragment>
    );

    createPlayerDataColumns = ({teamNumber, playerList}) => {
        const myPlayerList = playerList.slice(1);
        let playerListFields = [];
        myPlayerList.forEach((player, index) => {
            let field = (
                <Table.Row>
                    <Table.Cell>
                        Player {index + 2}
                    </Table.Cell>
                    <Table.Cell>
                        {withDataSet(<Input data-index={index + 1}
                                            data-field={PLAYER_FIELD}
                                            data-team={teamNumber}
                                            value={player.name}
                                            onChange={this.props.onChange}
                                            placeholder={"Enter Player Name"}/>)}
                    </Table.Cell>
                </Table.Row>);
            playerListFields.push(field);
        });
        return playerListFields;
    }


}

export default TableData;