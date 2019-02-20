import React, {Component} from 'react';
import {Modal} from './';
import client from "../../client";

export default class Confirm extends Component {
    state = {
        listener: false,
        open: false,
        ok: false,
        fail: false,
        message: ''
    };

    componentDidMount() {
        const listener = client._event.on('confirm', ({message, ok, fail}) => {
            this.setState({
                ok,
                fail,
                message
            });

            this.modal.toggle(true);
        });

        this.setState({listener})
    }

    componentWillUnmount() {
        const {listener} = this.state;
        client._event.removeListener('confirm', listener);
    }

    doAction = async (call = false) => {
        const {ok, fail} = this.state;
        let handler = async func => {
            return typeof func === 'function' ? await func() : true;
        };

        await handler(call ? ok : fail);
        this.modal.toggle(false);
    };

    render() {
        const {message = 'Are you sure you want to do this action?'} = this.state;

        return (
            <Modal ref={ref => this.modal = ref} title={'Confirm action'} actionColor={'danger'} onAction={this.doAction} onCancel={e => this.doAction(false)}>
                <p>{message}</p>
            </Modal>
        );
    }
}