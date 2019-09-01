import React, {Component} from 'react';

/**
 * HoC handling lazy loading components
 * @param path
 * @returns {{new(): {state, componentDidMount(), render(): *}, prototype: {state, componentDidMount(), render(): *}}}
 */

export default path => {
    return class Async extends Component {
        static Component = null;

        state = {
            LoadedComponent: Async.Component
        };

        async UNSAFE_componentWillMount() {
            const {LoadedComponent} = this.state;

            if (!LoadedComponent) {
                const Loaded = await import(`../${path}`);
                Async.Component = Loaded.default;

                this.setState({
                    LoadedComponent: Loaded.default
                });
            }
        }
        render() {
            const {LoadedComponent} = this.state;

            if (LoadedComponent) {
                return <LoadedComponent {...this.props} />;
            }

            return null;
        }
    }
};
