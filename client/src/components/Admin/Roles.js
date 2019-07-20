import React, {Component} from 'react';
import {Layout, Loading, Entries, Modal, Header} from "../Misc";
import client from '../../client';
import {confirm, clean} from "../../utils";

export default class Roles extends Component {
    state = {
        loading: true,
        filters: {},
        sorts: {},
        payload: {},
        roles: [],
        pagination: {
            page: 1,
            hasMoreItems: false
        }
    };

    load = async (page = 1, filters = {}, sorts = {}) => {
        this.setState({
            loading: true
        });

        const {data, errors} = await client.findAutoRole({
            filters,
            sorts,
            page
        });

        if (errors) {
            return;
        }

        const {pagination, data: roles} = data;

        this.setState({
            loading: false,
            pagination,
            roles,
            filters,
            sorts
        });
    };

    onAction = async e => {
        e.preventDefault();
        const {payload, roles} = this.state;

        let method = 'createAutoRole';

        if (payload._id) {
            payload.id = payload._id;
            method = 'updateAutoRole';

            if (payload.__original.name === payload.name) {
                return this.modal.toggle(false);
            }
        }

        const {data: role, errors} = await client[method](clean(payload));

        if (payload.hasOwnProperty('__key')) {
            roles[payload.__key] = role;
        } else {
            roles.push(role);
        }

        this.setState({
            roles,
            payload: {}
        });

        this.modal.toggle(false);
    };

    onChange = e => {
        const {payload} = this.state;
        payload[e.target.name] = e.target.value;
        this.setState({ payload });
    };

    showModal = () => {
        this.modal.toggle(true);
    };

    edit = (key, item) => {
        this.setState({
            payload: {
                ...item,
                __key: key,
                __original: item
            }
        });

        this.showModal();
    };

    delete = (key, item) => {
        confirm('Are you sure you want to delete this role?', async () => {
            const {data, errors} = await client.removeAutoRole({
                id: item._id
            });

            if (errors) {
                return;
            }

            const roles = [...this.state.roles];
            roles.splice(key, 1);

            this.setState({
                roles
            });
        });
    };

    async componentDidMount() {
        await this.load();
    }

    render() {
        const {loading, roles, pagination, payload} = this.state;

        const modalProps = {
            title: payload._id ? 'Edit Role' : 'Create Role',
            actionText: payload._id ? 'Save' : 'Create',
            onAction: this.onAction
        };

        return (
            <Layout>
                <div ref={ref => this.modal = ref} {...modalProps}>
                    <form onSubmit={this.onAction}>
                        <div>
                            <label>Name</label>
                            <input type={'text'} name={'name'} autoFocus={true} onChange={this.onChange} value={payload.name} placeholder={'Role'}/>
                        </div>
                    </form>
                </div>
                <Header title={'Roles'} onSearch={search => this.load(1, {search})} onCreate={this.showModal} />
                <Entries entries={roles} onAdd={this.showModal} loading={loading}>
                    <table className={'mt-4'}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            roles.map((role, key) => (
                                <tr key={key} className={'middle-rows'}>
                                    <td>
                                        {role.name}
                                        <br/>
                                        <small>{role._id}</small>
                                    </td>
                                    <td className={'text-right'}>
                                        <div className={'actions-dropdown'}>
                                            <div>
                                                Options
                                            </div>
                                            <div>
                                                <div header>Actions</div>
                                                <button onClick={e => this.edit(key, role)}>
                                                    Edit
                                                </button>
                                                <button onClick={e => this.delete(key, role)}>
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
                </Entries>
            </Layout>
        );
    }
}