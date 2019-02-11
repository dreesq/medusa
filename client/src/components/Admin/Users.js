import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import {Table} from 'reactstrap';
import client from '../../client';

export default class Users extends Component {
    state = {
        loading: true,
        filters: {},
        sorts: {},
        users: [],
        pagination: {
            page: 1,
            hasMoreItems: false
        }
    };

    load = async (page = 1, filters = {}, sorts = {}) => {
        this.setState({
            loading: true
        });

        const {data, errors} = await client.findAutoUser({
            filters,
            sorts,
            page
        });

        if (errors) {
            return;
        }

        const {pagination, data: users} = data;

        this.setState({
            loading: false,
            pagination,
            users,
            filters,
            sorts
        });
    };

    async componentDidMount() {
        await this.load();
    }

    render() {
        const {loading, users, pagination} = this.state;

        return (
            <Layout>
                <h4>Users</h4>
                <hr/>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, key) => (
                            <tr key={key}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </Layout>
        );
    }
}