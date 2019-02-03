import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {parse} from "../../utils";
import client from '../../client';

export default class Auth extends Component {
    state = {
        form: {},
        error: {}
    };

    login = async e => {
        const parsed = parse(e);

        const a = await client.login({
            ...parsed,
            provider: 'local'
        });

        console.log(a);
    };

    render() {
        return (
            <div>
                <h4>Sign In</h4>
                <p>Don't have an account? <Link to={'/auth/register'}>Register</Link></p>

                <form onSubmit={this.login}>
                    <label>Email</label>
                    <input type={'email'} placeholder={'Email'} name={'email'} />
                    <label>Password</label>
                    <input type={'password'} name={'password'} />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}