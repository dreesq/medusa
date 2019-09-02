import React, {Component} from 'react';
import Layout from "../Misc/Layout";
import {Row, AutoCrud, Sigma as S, Tag} from "@dreesq/sigma";

export default class Users extends Component {
    renderInfo = (value, row) => {
        return (
            <S>
                <S fontWeight={'600'}>{row.name}</S>
                <small>{row._id}</small>
            </S>
        );
    };

    renderStatus = value => {
        let color = 'primary';

        if (value === 'Inactive') {
            color = 'warning';
        } else if (value === 'Active') {
            color = 'success';
        }

        return (
            <Tag color={color}>{value}</Tag>
        )
    }

    render() {
        const filters = [
            {
                name: 'name',
                label: 'Name'
            }
        ];

        return (
            <Layout>
                <Row>
                    <AutoCrud
                        w={'100%'}
                        mt={30}
                        title={'Users'}
                        collection={'User'}
                        filters={filters}
                        fields={[
                            ['name', 'Name', this.renderInfo, true],
                            ['role', 'Role', role => role ? role.name : 'N/A', true],
                            ['permissions', 'Permissions', permissions => permissions.join(', ') || 'N/A'],
                            ['locale', 'Locale', locale => locale ? locale.toUpperCase() : 'N/A', true],
                            ['status', 'Status', this.renderStatus, true]
                        ]}
                    />
                </Row>
            </Layout>
        );
    }
}
