import React, {Component, Fragment} from 'react';
import {Alert as BsAlert} from 'reactstrap';
import {capitalize} from "../../utils";

export default class Alert extends Component {
    state = {
        errors: false
    };

    toggle = (errors = false) => {
        this.setState({
            errors
        });
    };

    render() {
        const {errors} = this.state;

        return (
            <BsAlert color="danger" isOpen={!!errors} toggle={e => this.toggle(false)}>
                {
                    Object.keys(errors).map((key, index) => (
                        <Fragment key={index}>
                            <ul>
                                {capitalize(key)}:
                                {
                                    errors[key].map((error, subIndex) => (
                                        <li key={subIndex}>{error}</li>
                                    ))
                                }
                            </ul>
                        </Fragment>
                    ))
                }
            </BsAlert>
        );
    }
}