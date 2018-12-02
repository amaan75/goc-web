import React from "react";
import { Segment, Grid, Divider, Header, Icon, Dropdown, DropdownProps } from "semantic-ui-react";
import { PlayGameProps, PlayGameState, PlayGameDropdownOptionType, Team, TeamKey } from "../../utils/types";
import { prepareOptions } from "../../utils/uiUtils";
import { getInitPlayGameState } from "../../utils/stateUtils";



class PlayGame extends React.Component<PlayGameProps, PlayGameState> {

    state = { ...getInitPlayGameState() }


    componentWillUnmount() {
        console.log("unmount playgame")
    }



    componentDidMount() {
        let formFields = {
            team1: this.props.teams[0].id,
            team2: this.props.teams[1].id
        }
        this.setState({ formFields });
    }

    onDropdownChangeHandler = (_unusedEvent: any, data: DropdownProps) => {
        this.setState(prevState => ({
            formFields: {
                ...prevState.formFields,
                [data.name]: data.value
            }
        }));
    }


    render() {
        const { teams } = this.props;
        const { formFields } = this.state;
        const team1ddOptions = prepareOptions(teams.filter(team => (team.id !== formFields.team2)));
        const team2ddOptions = prepareOptions(teams.filter(team => (team.id !== formFields.team1)));
        const isError = formFields.team1 === formFields.team2 && formFields.team1 !== "";
        return (
            <Segment placeholder>
                <Grid columns={2} stackable textAlign="center" >
                    <Divider vertical>And</Divider>
                    <Grid.Row verticalAlign='middle'>
                        <Grid.Column>
                            <Header icon>
                                <Icon name='world' />
                                Choose Team 1
                        </Header>
                            <Dropdown
                                name={"team1"}
                                clearable
                                error={isError}
                                selectOnBlur={false}
                                text={isError ? "Same Teams Selected!" : undefined}
                                value={formFields.team1}
                                onChange={this.onDropdownChangeHandler}
                                placeholder='Team'
                                selection
                                options={team1ddOptions} />
                        </Grid.Column>

                        <Grid.Column>
                            <Header icon>
                                <Icon name='world' />
                                Choose Team 2
                        </Header>
                            <Dropdown
                                name="team2"
                                clearable
                                value={formFields.team2}
                                error={isError}
                                selectOnBlur={false}
                                text={isError ? "Same Teams Selected!" : undefined}
                                onChange={this.onDropdownChangeHandler}
                                placeholder='Team'
                                selection
                                options={team2ddOptions} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Segment>
        );
    }
}

export default PlayGame;

