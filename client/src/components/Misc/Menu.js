import React, {Component} from 'react';
import client from '../../client';
import {acronym} from "../../utils";
import {withRouter} from "react-router-dom";
import {NavLink as RNLink, Link} from "react-router-dom";
import {
    Collapse,
    Container,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

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
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand to="/" tag={RNLink}>
                        <img style={{height: 42}} src={'https://github.com/dreesq/serpent/raw/master/docs/res/logo.png'} />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={open} navbar>
                        <Nav className="align-items-sm-center" navbar style={{width: '100%'}}>
                            <NavItem>
                                <NavLink to="/" tag={RNLink} activeClassName="active" exact>Dashboard</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Users
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={'/users'} className={'unstyled'}>Users</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={'/roles'} className={'unstyled'}>Roles</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={'/permissions'} className={'unstyled'}>Permissions</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink to="/translations" tag={RNLink} activeClassName="active" exact>Translations</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar className={'ml-auto user-dropdown'}>
                                <DropdownToggle nav caret>
                                    <div className="avatar">{acronym(user.name)}</div>
                                    {user.name}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to={'/user/settings'} className={'unstyled'}>Settings</Link>
                                    </DropdownItem>
                                    <DropdownItem onClick={this.logout}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        );
    }
}

export default withRouter(Menu);