import React from "react";
import TeamsTable from "./TeamsTable/TeamsTable";
import { Button, Dropdown, Label, Tab, Grid } from "semantic-ui-react";
import { TEAM_MGMT_DROPDOWN_KEY, TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY, ADD_TEAM_ONCLICK, UPDATE_TEAM_ONCLICK } from "../utils/Constants";
import { prepareOptions } from "../utils/semanticUiUtils";
import { getData, deleteData } from "../utils/cricketApi";
import { INITIAL_STATE, getNewTeam } from "../utils/stateUtils";
import DeleteTeamModal from "./DeleteTeamModal";

class TeamManagement extends React.Component {

    state = {
        show: false,
        isLoading: false,
        isEditable: false,
        unTouchedFocusedLable: true,
        showConfirmDeleteModal: false
    }


    componentDidMount() {
        this.fetchTeamData(this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY]);
        if (this.focusedLabel)
            this.focusedLabel.focus();
    }

    fetchTeamData = (value) => {
        if (value) {
            this.setState({ isLoading: true });
            getData(`getTeamById/${value}`)
                .then(team => {
                    this.props.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY], team);
                    this.setState({ show: true, isLoading: false }, () => {
                        if (this.focusedLabel)
                            this.focusedLabel.focus();
                    });
                })
                .catch(error => {
                    console.log(error)
                    this.setState({ isLoading: false })
                });

        }
    }
    componentDidUpdate() {
        if (this.focusedLabel && this.state.unTouchedFocusedLable) {
            this.focusedLabel.focus();
            this.setState({ unTouchedFocusedLable: false })
        }
    }
    onTabChange = (e, { activeIndex }) => {
        if (activeIndex === 1) {
            this.props.handleInputChange([TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY],
                getNewTeam())
        }
        else {
            this.props.fetchAllTeams();
            this.fetchTeamData(this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY]);
        }
    }
    onDropDownChange = (e, { value }) => {
        if (value === "") {
            this.setState({ show: false })
        }
        this.fetchTeamData(value);
        this.props.onDropdownChangeHandler(e, TEAM_MGMT_DROPDOWN_KEY, value);
    }
    onConfirmDeleteHandler = (e) => {
        deleteData(`deleteTeamById/${this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY]}`)
            .then(id => alert(`the entity with the ${id} was deleted`))
            .catch(err => console.log(err));
    }

    onClickDeleteHandler = () => {
        this.setState({ showConfirmDeleteModal: true })
    }

    closeConfirmDeleteModal = () => {
        this.setState({ showConfirmDeleteModal: false })
    }
    render() {
        const { teams, managedTeam, onChange, onClick, dropdownStates } = this.props;
        const ddOptions = prepareOptions(teams);
        const editTeamPane = (
            <Grid stackable >
                {/* <p>{this.state.debugState}</p> */}
                <Grid.Row centered>
                    <Grid.Column width={5}>

                        <label id="MYTESTID" tabIndex="0" onFocus={(e) => console.log("got focus bruh")} ref={el => this.focusedLabel = el} >
                            {//**  basic size="big" >*/
                            }
                            Edit Team
                        </label>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Dropdown
                            clearable
                            selectOnBlur={false}
                            value={dropdownStates[TEAM_MGMT_DROPDOWN_KEY]}
                            onChange={this.onDropDownChange}
                            placeholder='Team' selection
                            options={ddOptions}
                        />
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <Button.Group>
                            <Button negative onClick={this.onClickDeleteHandler}>Delete</Button>
                            <Button.Or />
                            <Button positive onClick={e => this.setState({ isEditable: true })}>Edit</Button>
                        </Button.Group>
                    </Grid.Column>

                </Grid.Row>
                {
                    this.state.show &&
                    <React.Fragment>
                        <TeamsTable
                            disabled={this.state.isEditable}
                            managedTeam={managedTeam}
                            onChange={onChange}
                        />
                        <Grid.Row>

                            <Button size="huge" primary
                                onClick={e => onClick(e, UPDATE_TEAM_ONCLICK)}>
                                SAVE
                    </Button>
                        </Grid.Row>

                    </React.Fragment>
                }
                {
                    this.state.showConfirmDeleteModal &&
                    <DeleteTeamModal
                        showModal={this.state.showConfirmDeleteModal}
                        closeConfirmDeleteModal={this.closeConfirmDeleteModal}
                        onConfirmDeleteHandler={this.onConfirmDeleteHandler}
                        fetchAllTeams={this.props.fetchAllTeams}

                    />
                }


            </Grid>
        );
        const addNewTeamPane = (

            <Grid centered >
                <p>{this.state.debugState}</p>
                <Grid.Row>

                    <Label basic size="massive" >
                        ADD TEAM
            </Label>
                </Grid.Row>


                <TeamsTable
                    disabled={!this.state.show}
                    managedTeam={INITIAL_STATE[TEAM_MGMT_STATE_KEY][MANAGED_TEAM_KEY]}
                    onChange={onChange}
                />
                <Grid.Row>

                    <Button size="huge" primary
                        onClick={e => onClick(e, ADD_TEAM_ONCLICK)}>
                        ADD
                    </Button>
                </Grid.Row>

            </Grid>
        );
        const panes = [
            { menuItem: 'Edit Team', render: () => <Tab.Pane loading={this.state.isLoading} attached={true}>{editTeamPane}</Tab.Pane> },
            { menuItem: 'Add Team', render: () => <Tab.Pane attached={true}>{addNewTeamPane}</Tab.Pane> },
        ];

        return <Tab onTabChange={this.onTabChange} menu={{ attached: true, vertical: true, tabular: true, pointing: true }} panes={panes} />
    }
}
export default TeamManagement;