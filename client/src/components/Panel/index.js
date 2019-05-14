import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import client from '../../client';

export default class Panel extends Component {
    render() {
        const {user} = client.auth;

        return (
            <Layout>
                <h3>Panel</h3>
                <p>Greetings, {user.name}</p>
            </Layout>
        );
    }
}