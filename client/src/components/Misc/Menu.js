import React, {Component} from 'react';
import client from '../../client';
import {acronym} from "../../utils";
import {withRouter} from "react-router-dom";
import {NavLink as RNLink, Link} from "react-router-dom";

class Menu extends Component {
    state = {
        open: false
    };

    toggle = (open = false) => {
        this.setState({ open });
    };

    logout = async () => {
        const {history} = this.props;
        await client.auth.logout();
        history.push('/auth');
    };

    render() {
        const {user} = client.auth;
        const {open} = this.state;

        return (
            <nav color="light" light expand="md">
                <div>
                    <div to="/" tag={RNLink}>
                        <img style={{height: 42}} src={'https://github.com/dreesq/serpent/raw/master/docs/res/logo.png'} />
                    </div>
                    <div onClick={this.toggle} />
                    <div isOpen={open} navbar>
                        <nav className="align-items-sm-center" navbar style={{width: '100%'}}>
                            <div>
                                <Link to="/" tag={RNLink} activeClassName="active" exact>Dashboard</Link>
                            </div>
                            <div nav inNavbar>
                                <div nav caret>
                                    Users
                                </div>
                                <div>
                                    <div>
                                        <Link to={'/users'} className={'unstyled'}>Users</Link>
                                    </div>
                                    <div>
                                        <Link to={'/roles'} className={'unstyled'}>Roles</Link>
                                    </div>
                                    <div>
                                        <Link to={'/permissions'} className={'unstyled'}>Permissions</Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Link to="/translations" tag={RNLink} activeClassName="active" exact>Translations</Link>
                            </div>
                            <div nav inNavbar className={'ml-auto user-dropdown'}>
                                <div nav caret>
                                    <div className="avatar">{acronym(user.name)}</div>
                                    {user.name}
                                </div>
                                <div right>
                                    <div>
                                        <Link to={'/user/settings'} className={'unstyled'}>Settings</Link>
                                    </div>
                                    <div onClick={this.logout}>
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(Menu);