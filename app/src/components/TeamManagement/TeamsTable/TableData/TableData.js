import React from "react";
import { Table, Input } from "semantic-ui-react";
import { PLAYER_FIELD, TEAM_FIELD } from "../../../utils/Constants";


class TableData extends React.Component {

    render() {
        const { managedTeam } = this.props;
        return (
            <Table.Body>
                {this.createTeamData({
                    teamNumber: 1,
                    teamName: managedTeam.name,
                    playerList: managedTeam.players
                })}
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

    createTeamDataColumn = ({ teamNumber, teamName, playerList }) => (
        <React.Fragment>
            <Table.Cell rowSpan={playerList.length}>
                Team {teamNumber}
            </Table.Cell>
            <Table.Cell rowSpan={playerList.length}>
                <Input dataindex={0}
                    datafield={TEAM_FIELD}
                    datateam={teamNumber}
                    value={teamName}
                    onChange={this.props.onChange}
                    placeholder={"Enter Team Name"} />
            </Table.Cell>
            <Table.Cell>
                Player 1
            </Table.Cell>
            <Table.Cell>
                <Input dataindex={0}
                    datafield={PLAYER_FIELD}
                    datateam={teamNumber}
                    value={playerList[0].name}
                    onChange={this.props.onChange}
                    placeholder={"Enter Player Name"} />

            </Table.Cell>
        </React.Fragment>
    );

    createPlayerDataColumns = ({ teamNumber, playerList }) => {
        const myPlayerList = playerList.slice(1);
        let playerListFields = [];
        myPlayerList.forEach((player, index) => {
            let field = (
                <Table.Row key={player.id}>
                    <Table.Cell>
                        Player {index + 2}
                    </Table.Cell>
                    <Table.Cell>
                        <Input dataindex={index + 1}
                            datafield={PLAYER_FIELD}
                            datateam={teamNumber}
                            value={player.name}
                            onChange={this.props.onChange}
                            placeholder={"Enter Player Name"} />
                    </Table.Cell>
                </Table.Row>);
            playerListFields.push(field);
        });
        return playerListFields;
    }


}

export default TableData;