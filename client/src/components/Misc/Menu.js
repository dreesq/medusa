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
        await client._auth.logout();
        history.push('/auth');
    };

    render() {
        const {user} = client._auth;
        const {open} = this.state;

        return (
            <Navbar color="light" light expand="md">
                <Container>
                    <NavbarBrand to="/" tag={RNLink}>medusa</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={open} navbar>
                        <Nav className="ml-auto align-items-sm-center" navbar>
                            <NavItem>
                                <NavLink to="/" tag={RNLink} activeClassName="active" exact>Panel</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Admin
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                        <Link to={'/admin'} className={'unstyled'}>Dashboard</Link>
                                    </DropdownItem>
                                    <DropdownItem divider={true}/>
                                    <DropdownItem>
                                        <Link to={'/admin/users'} className={'unstyled'}>Users</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={'/admin/roles'} className={'unstyled'}>Roles</Link>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <Link to={'/admin/permissions'} className={'unstyled'}>Permissions</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar className={'ml-sm-5'}>
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