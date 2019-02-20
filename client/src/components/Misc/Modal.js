import React, {Component} from 'react';
import {Modal as BsModal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap';

export default class Modal extends Component {
    state = {
        open: false
    };

    toggle = open => {
        this.setState({
            open: typeof open === 'boolean' ? open : !open
        });
    };

    render() {
        const {open} = this.state;
        const {children, title, onAction, onCancel, actionText = 'Handle', actionColor = 'primary'} = this.props;

        return (
            <BsModal isOpen={open} toggle={onCancel ? onCancel : this.toggle}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button color={actionColor} onClick={onAction}>{actionText}</Button>{' '}
                    <Button color="secondary" onClick={onCancel ? onCancel : this.toggle}>Cancel</Button>
                </ModalFooter>
            </BsModal>
        );
    }
}