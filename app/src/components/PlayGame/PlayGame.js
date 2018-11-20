import React from "react";
import { Segment, Grid, Divider, Dropdown, Header, Icon } from "semantic-ui-react";
import { TEAM_1_KEY, TEAM_2_KEY } from "../utils/Constants";
import { prepareOptions } from "../utils/semanticUiUtils";

const PlayGame = ({ teams, onDropdownChangeHandler, dropdownStates, }) => {
    const ddOptions = prepareOptions(teams, dropdownStates);
    const isError = dropdownStates.team1 === dropdownStates.team2 && dropdownStates.team1 !== "";
    return (
        <Segment placeholder>
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>And</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>
                        <Header icon>
                            <Icon name='world' />
                            Choose Team 1
                        </Header>
                        <Dropdown clearable
                            error={isError}
                            selectOnBlur={false}
                            text={isError ? "Same Teams Selected!" : undefined}
                            value={dropdownStates.team1}
                            onChange={(e, { value }) => onDropdownChangeHandler(e, TEAM_1_KEY, value)}
                            placeholder='Team' selection options={ddOptions} />
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='world' />
                            Choose Team 2
                        </Header>
                        <Dropdown clearable value={dropdownStates.team2}
                            error={isError}
                            selectOnBlur={false}
                            text={isError ? "Same Teams Selected!" : undefined}
                            onChange={(e, { value }) => onDropdownChangeHandler(e, TEAM_2_KEY, value)}
                            placeholder='Team' selection options={ddOptions} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}


export default PlayGame;