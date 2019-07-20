import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import Alert from '../Misc/Alert';
import {withRouter} from 'react-router-dom';
import {parse, parseQs} from '../../utils';
import client from '../../client';

class Reset extends Component {
    state = {
        loading: false,
        token: '',
        step: 0,
        finished: false
    };

    componentDidMount() {
        const qs = parseQs(this.props.location.search);

        if (qs.token) {
            this.setState({
                token: qs.token,
                step: 1
            });
        }
    }

    reset = async e => {
        const {step, token} = this.state;
        const parsed = parse(e);
        this.loading(true);

        const opts = {
            ...parsed,
            action: step === 0 ? 0 : 1
        };

        if (step === 1) {
            opts.token = token;
        }

        const {data, errors} = await client.resetPassword(opts);

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
        }

        if (data.success) {
            this.setState({
                finished: true
            });
        }
    };

    loading = (loading = true) => {
        this.setState({ loading });
    };

    render() {
        const {loading, step, finished} = this.state;

        return (
            <div>
                <div>
                    <div lg={{size: 4, offset: 4}}>
                        <div className={'p-4 mt-5'}>
                            <div className={'text-center'}>
                                <h4>Reset Password</h4>
                                <p>Don't have an account? <Link to={'/auth/register'}><u>Sign up</u></Link> instead</p>
                            </div>
                            <Alert ref={ref => this.alert = ref}/>
                            {
                                finished && (
                                    <Fragment>
                                        {
                                            step === 0 && (
                                                <p className={'text-success'}>An email containing the reset url was sent to the given email.</p>
                                            )
                                        }
                                        {
                                            step === 1 && (
                                                <p className={'text-success'}>Account password was successfully changed. You may <Link to={'/auth'}><u>login</u></Link> now.</p>
                                            )
                                        }
                                    </Fragment>
                                )
                            }
                            {
                                !finished && (
                                    <div lg={12}>
                                        <form onSubmit={this.reset}>
                                            {
                                                step === 0 && (
                                                    <div>
                                                        <label>Email</label>
                                                        <input type={'email'} name={'email'} autoFocus={true} placeholder={'Email'}/>
                                                    </div>
                                                )
                                            }
                                            {
                                                step === 1 && (
                                                    <Fragment>
                                                        <div>
                                                            <label>Password</label>
                                                            <input type={'password'} name={'password'} placeholder={'Password'}/>
                                                        </div>
                                                        <div>
                                                            <label>Repeat Password</label>
                                                            <input type={'password'} name={'repeatPassword'} placeholder={'Repeat Password'}/>
                                                        </div>
                                                    </Fragment>
                                                )
                                            }
                                            <button block color={'primary'} disabled={loading}>
                                                Submit
                                            </button>
                                        </form>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Reset);


