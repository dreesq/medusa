import React, {Component} from 'react';
import Layout from "../Misc/Layout";

export default class Users extends Component {
    state = {
        loading: true,
        page: 1,
        filters: {}
    };

    load = async (page = 1, filters = {}) => {

    };

    render() {
        return (
            <Layout>
                <h4><small>Admin / Users</small></h4>
                <hr/>
            </Layout>
        );
    }
}