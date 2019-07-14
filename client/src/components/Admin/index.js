import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import client from '../../client';

export default class Admin extends Component {
    render() {
        const {user} = client.auth;

        return (
            <Layout>
                <h1>Admin</h1>
                <p>Welcome back <strong>{user.name}</strong>!</p>
            </Layout>
        );
    }
}