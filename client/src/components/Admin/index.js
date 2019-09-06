import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import PropTypes from 'prop-types';
import {Text, AutoFilter, Col, Row} from "@dreesq/sigma";

export default class Admin extends Component {
    static contextTypes = {
        client: PropTypes.object
    };

    render() {
        const {client} = this.context;
        const {user} = client.auth;

        return (
            <Layout>
                <Row>
                    <Col>
                        <Text as={'h1'} mb={5} fontWeight={'500'}>Dashboard</Text>
                        <Text as={'p'} mt={0}>Welcome back <strong>{user.name}</strong></Text>
                    </Col>
                </Row>
                {client.features.logs && (
                    <Row>
                        <Col>
                            <AutoFilter action={'getLogs'} filters={[]} />
                        </Col>
                    </Row>
                )}
            </Layout>
        );
    }
}
