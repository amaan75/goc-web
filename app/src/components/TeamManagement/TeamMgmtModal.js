import React from 'react'
import { Header, Modal } from 'semantic-ui-react'

const TeamMgmtModal = (props) => (
    <Modal basic size='small' closeIcon
        open={props.showModal}
        onClose={props.toggleModal}

    >
        {props.header &&
            <Header icon={props.header.icon} content={props.header.content(props)} />}
        <Modal.Content>
            {props.content(props)}
        </Modal.Content>
        <Modal.Actions>
            {props.actionButtons}
        </Modal.Actions>


    </Modal>
)

export default TeamMgmtModal;
