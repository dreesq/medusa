import React, {Component} from 'react';
import Layout from '../Misc/Layout';
import {ActionForm, Text, Row, Col, Card} from "@dreesq/sigma";

export default class User extends Component {
    render() {
        return (
            <Layout>
                <h1>Settings</h1>
                <Row>
                    <Col width={'50%'}>
                        <Card>
                            <Text as={'h3'}>Credentials</Text>
                            <ActionForm
                                withAlert
                                focusFirst
                                action={'setPassword'}
                                handleText={'Save'}
                                props={{
                                    handle: {
                                        ml: 'auto'
                                    }
                                }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Layout>
        );
    }
}
