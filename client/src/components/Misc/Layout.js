import React, {Component} from 'react';
import {Menu, Confirm} from "./";

export default class Layout extends Component {
    render() {
        const {children} = this.props;

        return (
            <>
                <Menu/>
                <Confirm/>
                {children}
            </>
        );
    }
}
