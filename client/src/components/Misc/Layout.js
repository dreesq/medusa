import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Menu from "./Menu";

export default class Layout extends Component {
    render() {
        return (
            <div className={'layout'}>
                <Menu/>
                <Container>
                    {this.props.children}
                </Container>
            </div>
        );
    }
}