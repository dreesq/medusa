import React, {Component} from 'react';
import client from '../../client';
import {acronym} from "../../utils";
import {withRouter} from "react-router-dom";
import {
    Collapse,
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
                <NavbarBrand href="/">medusa</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={open} navbar>
                    <Nav className="ml-auto align-items-sm-center" navbar>
                        <NavItem>
                            <NavLink href="/">Panel</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/admin">Admin</NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar className={'ml-sm-5'}>
                            <DropdownToggle nav caret>
                                <div className="avatar">{acronym(user.name)}</div>
                                {user.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    Settings
                                </DropdownItem>
                                <DropdownItem onClick={this.logout}>
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default withRouter(Menu);