import React, {Component} from 'react';
import {Menu, Confirm} from "./";

export default class Layout extends Component {
    render() {
        return (
            <div className={'layout'}>
                <Menu/>
                <Confirm/>
                <div>
                    <div>
                        <div lg={12} className={'mt-5'}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}