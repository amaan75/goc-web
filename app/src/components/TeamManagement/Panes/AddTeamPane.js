import React from "react";
import { INITIAL_STATE } from "../../utils/stateUtils";
import { TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY, ADD_TEAM_ONCLICK } from "../../utils/Constants";
import { Grid, Label, Button, Icon } from "semantic-ui-react";
import TeamMgmtModal from "../TeamMgmtModal";
import TeamsTable from "../TeamsTable/TeamsTable";

const AddNewTeamPane = props => (

    <Grid centered >
        <Grid.Row>
            <Label basic size="massive" >
                ADD TEAM
            </Label>
        </Grid.Row>


        <TeamsTable
            disabled={!props.show}
            managedTeam={INITIAL_STATE[TEAM_MGMT_STATE_KEY][MANAGED_TEAM_KEY]}
            onChange={props.onChange}
        />
        <Grid.Row>

            <Button size="huge" primary
                onClick={e => this.toggleModal()}>
                ADD
            </Button>
        </Grid.Row>
        {this.state.show &&
            <TeamMgmtModal
                showModal={this.state.showModal}
                header={{
                    icon: "check circle outline",
                    content: (props) => "Saved"
                }}
                content={contentData => (<p>
                    Team was Succesfully added!
                </p>)}
                actionButtons={[<Button key="modal-button3" onClick={e => {
                    props.onClick("unused", ADD_TEAM_ONCLICK);
                    props.fetchAllTeams();
                    props.toggleModal();

                }} color='green' inverted>
                    <Icon name='checkmark' /> Got it
                    </Button>]}
                toggleModal={props.toggleModal}
            />}
    </Grid>
);
export default AddNewTeamPane