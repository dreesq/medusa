import React, {Component} from 'react';
import client from "../../client";
import {Link, withRouter} from "react-router-dom";
import {parseQs} from "../../utils";
import Alert from '../Misc/Alert';

class Confirm extends Component {
    state = {
        loading: false,
        finished: false
    };

    async componentDidMount() {
        const qs = parseQs(this.props.location.search);

        const {data, errors} = await client.confirmUser({
            token: qs.token
        });

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
        }

        if (data.success) {
            this.setState({
                finished: true
            });
        }
    }

    loading = (loading = true) => {
        this.setState({ loading });
    };

    render() {
        const {loading, finished} = this.state;

        return (
            <div>
                <div className={'text-center'}>
                    <h4>Confirm Account</h4>
                </div>
                <Alert ref={ref => this.alert = ref}/>
                {
                    loading && (
                        <p className={'text-warning'}>Hold on while we confirm your account.</p>
                    )
                }
                {
                    finished && (
                        <p className={'text-success'}>Account was successfully confirmed. <br/><Link
                            to={'/'}>Navigate to dashboard page</Link></p>
                    )
                }
            </div>
        );
    }
}

export default withRouter(Confirm);