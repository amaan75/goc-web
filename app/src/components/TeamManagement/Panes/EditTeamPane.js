
import React from "react";
import { Grid, Dropdown, Button, Label } from "semantic-ui-react";
import TeamsTable from "../TeamsTable/TeamsTable";
import TeamMgmtModal from "../TeamMgmtModal";

const EditTeamPane = props => (
    <Grid stackable >
        <Grid.Row centered>
            <Grid.Column width={5}>

                <Label basic size="big">
                    Edit Team
                </Label>
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
            this.state.showModal &&
            <TeamMgmtModal
                showModal={this.state.showModal}
                actionButtons={deleteTeamModalActionButtons}
                content={contentData => (
                    <p>
                        Are you sure you want to delete the team?
                    </p>
                )}
                header={{
                    icon: "delete",
                    content: (props) => "Delete Team"
                }}
                toggleModal={this.toggleModal}
            />
        }


    </Grid>
);
export default EditTeamPane;