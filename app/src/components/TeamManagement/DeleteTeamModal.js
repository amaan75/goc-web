import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const DeleteTeamModal = (props) => (
    <Modal basic size='small' closeIcon
        open={props.showModal}
        onClose={props.closeConfirmDeleteModal}

    >
        <Header icon='delete' content='Delete Team' />
        <Modal.Content>
            <p>
                Are you sure you want to delete the team?
            </p>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={props.closeConfirmDeleteModal} basic color='red' inverted>
                <Icon name='remove' /> No
      </Button>
            <Button onClick={e => {
                props.onConfirmDeleteHandler();
                props.closeConfirmDeleteModal();
                props.fetchAllTeams();
            }} color='green' inverted>
                <Icon name='checkmark' /> Yes
      </Button>
        </Modal.Actions>
    </Modal>
)

export default DeleteTeamModal
