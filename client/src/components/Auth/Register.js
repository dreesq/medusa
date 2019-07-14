import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Alert from '../Misc/Alert';
import {withRouter} from 'react-router-dom';
import {parse} from '../../utils';
import client from '../../client';

class Register extends Component {
    state = {
        loading: false
    };

    register = async e => {
        const parsed = parse(e);
        this.loading(true);

        const {data, errors} = await client.createUser({
            ...parsed,
            provider: 'local'
        });

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
        }

        const {data: user, errors: authErrors} = await client.auth.login({
            ...parsed,
            provider: 'local'
        });

        if (authErrors) {
            return this.alert.toggle(authErrors);
        }

        const {history} = this.props;
        history.push('/');
    };

    loading = (loading = true) => {
        this.setState({ loading });
    };

    render() {
        const {loading} = this.state;

        return (
            <div>
                <div className={'p-4 mt-5'}>
                    <div className={'text-center'}>
                        <h4>Sign Up</h4>
                        <p>Already have an account? <Link to={'/auth'}><u>Sign in</u></Link> instead</p>
                    </div>
                    <Alert ref={ref => this.alert = ref}/>
                    <div lg={12}>
                        <div onSubmit={this.register}>
                            <div>
                                <label>Name</label>
                                <input type={'text'} name={'name'} autoFocus={true} placeholder={'Name'}/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type={'email'} name={'email'} placeholder={'me@email.com'}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input type={'password'} name={'password'} placeholder={'Password'}/>
                            </div>
                            <button block color={'primary'} disabled={loading}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);