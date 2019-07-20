import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import client from '../../client';
import {confirm} from "../../utils";

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

    delete = (key, item) => {
        confirm('Are you sure you want to delete this user?', async () => {
            const {data, errors} = await client.removeAutoUser({
                id: item._id
            });

            if (errors) {
                return;
            }

            const users = [...this.state.users];
            users.splice(key, 1);

            this.setState({
                users
            });
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
                <table className={'mt-4'}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, key) => (
                            <tr key={key} className={'middle-rows'}>
                                <td>
                                    {user.name}
                                    <br/>
                                    <small>{user._id}</small>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.role || '-'}</td>
                                <td className={'text-right'}>
                                    <div className={'actions-dropdown'}>
                                        <div>
                                            Options
                                        </div>
                                        <div>
                                            <div header>Actions</div>
                                            <button onClick={e => this.edit(key, user)}>
                                                Edit
                                            </button>
                                            <button onClick={e => this.delete(key, user)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </Layout>
        );
    }
}