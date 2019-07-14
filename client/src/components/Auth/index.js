import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import client from '../../client';
import Alert from '../Misc/Alert';
import {parse} from "../../utils";
import {withRouter} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {FB_APP_ID} from "../../constants";

class Auth extends Component {
    state = {
        loading: false
    };

    login = async (e, provider = 'local') => {
        let parsed = {};

        if (provider === 'local') {
            parsed = parse(e);
        } else {
            parsed = {
                accessToken: e.accessToken
            };
        }

        this.loading(true);

        const {data: user, errors} = await client.auth.login({
            ...parsed,
            provider,
            refresh: 0
        });

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
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
                <div lg={{size: 4, offset: 4}}>
                    <div className={'p-4 mt-5'}>
                        <div className={'text-center'}>
                            <h4>Sign In</h4>
                            <p>Don't have an account? <Link to={'/auth/register'}><u>Create one</u></Link></p>
                        </div>
                        <Alert ref={ref => this.alert = ref}/>
                        <div lg={12}>
                            <div onSubmit={this.login}>
                                <div>
                                    <div>Email</div>
                                    <input type={'email'} name={'email'} autoFocus={true} placeholder={'me@email.com'}/>
                                </div>
                                <div>
                                    <div>Password</div>
                                    <input type={'password'} name={'password'} placeholder={'Password'}/>
                                </div>
                                <div className={'text-right'}>
                                    <Link to={'auth/reset'}>Forgot password?</Link>
                                </div>
                                <button color={'primary'} disabled={loading}>
                                    Submit
                                </button>
                                <hr/>
                                <FacebookLogin
                                    appId={FB_APP_ID}
                                    callback={data => this.login(data, 'fb')}
                                    render={props => (
                                        <button block color={'primary'} onClick={props.onClick}>
                                            Login with facebook
                                        </button>
                                    )}
                                />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Auth);