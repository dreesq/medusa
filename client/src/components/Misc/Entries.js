import React, {Component} from 'react';
import {Button} from 'reactstrap';
import {Loading} from './';

export default class Entries extends Component {
    render() {
        const {entries = [], loading = false, onAdd, children} = this.props;

        if (loading) {
            return (
                <div className={'loading-wrapper'}>
                    <Loading loading={loading}/>
                </div>
            );
        }

        if (!entries.length) {
            return (
                <div className={'no-entries'}>
                    <h1>No entries</h1>
                    <p>There are no entries added yet.</p>
                    <Button onClick={onAdd} color={'primary'}>Add one</Button>
                </div>
            );
        }

        return children;
    }
}