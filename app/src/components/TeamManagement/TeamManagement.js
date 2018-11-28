import React from "react";
import TeamsTable from "./TeamsTable/TeamsTable";
import { Button, Dropdown, Label, Tab, Grid, Icon } from "semantic-ui-react";
import { TEAM_MGMT_DROPDOWN_KEY, TEAM_MGMT_STATE_KEY, MANAGED_TEAM_KEY, ADD_TEAM_ONCLICK, UPDATE_TEAM_ONCLICK } from "../utils/Constants";
import { prepareOptions } from "../utils/semanticUiUtils";
import { deleteData } from "../utils/cricketApi";
import { INITIAL_STATE, getNewTeam } from "../utils/stateUtils";
import TeamMgmtModal from "./TeamMgmtModal";
import EditTeamPane from "./Panes/EditTeamPane";
import AddNewTeamPane from "./Panes/AddTeamPane";

class TeamManagement extends React.Component {

    state = {
        show: false,
        isLoading: false,
        isEditable: false,
        unTouchedFocusedLable: true,
        showModal: false
    }


    successAction = () => this.setState({ show: true, isLoading: false });

    errorAction = () => this.setState({ isLoading: false });
    componentDidMount() {
        this.props.fetchTeamData(this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY],
            this.successAction,
            this.errorAction);
        if (this.focusedLabel)
            this.focusedLabel.focus();
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
            this.props.fetchTeamData(this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY],
                this.successAction,
                this.errorAction);
        }
    }
    onDropDownChange = (e, { value }) => {
        if (value === "") {
            this.setState({ show: false })
        }
        this.props.fetchTeamData(value,
            this.successAction,
            this.errorAction);
        this.props.onDropdownChangeHandler(e, TEAM_MGMT_DROPDOWN_KEY, value);
    }
    onConfirmDeleteHandler = (e) => {
        deleteData(`deleteTeamById/${this.props.dropdownStates[TEAM_MGMT_DROPDOWN_KEY]}`)
            .then(id => {
                alert(`the entity with the ${id} was deleted`)
                this.props.fetchAllTeams();
            })
            .catch(err => console.log(err));
    }

    onClickDeleteHandler = () => this.toggleModal()


    toggleModal = () => this.setState({ showModal: !this.state.showModal })
    render() {
        const { teams, managedTeam, onChange, onClick, dropdownStates } = this.props;
        const deleteTeamModalActionButtons = [
            <Button key="modal-button1" onClick={this.toggleModal} basic color='red' inverted>
                <Icon name='remove' /> No
            </Button>,
            <Button key="modal-button2" onClick={e => {
                this.onConfirmDeleteHandler();
                this.toggleModal();
            }} color='green' inverted>
                <Icon name='checkmark' /> Yes
                </Button>
        ];
        const ddOptions = prepareOptions(teams);



        const panes = [
            {
                menuItem: 'Edit Team', render: () =>
                    <Tab.Pane
                        loading={this.state.isLoading}
                        attached={true}>
                        <EditTeamPane
                            ddOptions={ddOptions}
                            modalActions={deleteTeamModalActionButtons} />
                    </Tab.Pane >
            },
            {
                menuItem: 'Add Team', render: () =>
                    <Tab.Pane attached={true}>
                        <AddNewTeamPane
                            show={this.state.show}
                            onChange={onChange}
                            onClick={onClick}
                        />
                    </Tab.Pane>
            },
        ];

        return <Tab onTabChange={this.onTabChange} menu={{ attached: true, vertical: true, tabular: true, pointing: true }} panes={panes} />
    }
}
export default TeamManagement;