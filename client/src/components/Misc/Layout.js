import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';
import Menu from "./Menu";

export default class Layout extends Component {
    render() {
        return (
            <div className={'layout'}>
                <Menu/>
                <Container>
                    <Row>
                        <Col lg={12} className={'mt-5'}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}