import React, {Component} from 'react';
import Context from './Context';
import PropTypes from 'prop-types';
import client from '../../client';

/**
 * HoC handling route guard
 * @param WrappedComponent
 * @param options
 * @returns {{new(): {state, componentDidMount(), render(): *}, prototype: {state, componentDidMount(), render(): *}}}
 */

export default (WrappedComponent, options = {}) => {
    return class extends Component {
        state = {
            loading: true,
            user: false
        };

        static contextTypes = {
            router: PropTypes.object.isRequired
        };

        async componentDidMount() {
            const {history} = this.context.router;

            const opts = {
                loading: false
            };

            try {
                const res = await client.getUser();
                opts.user = res.data;

                if (options.accessRole && opts.user.access !== options.accessRole) {
                    return history.push(options.redirectFailed);
                }

                if (options.redirectSuccess) {
                    history.push(options.redirectSuccess);
                }
            } catch(error) {
                if (options.redirectFailed && window.location.pathname !== options.redirectFailed) {
                    history.push(options.redirectFailed);
                }
            }

            this.setState(opts);
        }

        render() {
            const {user, loading} = this.state;

            if (loading) {
                return null;
            }

            return (
                <Context.Provider value={{ user }}>
                    <WrappedComponent/>
                </Context.Provider>
            );
        }
    }
};