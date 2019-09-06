import React, {Component} from 'react';
import client from '../../client';
import {acronym} from "../../utils";
import {withRouter} from "react-router-dom";
import {NavLink, Link} from "react-router-dom";
import {
    Nav,
    Dropdown,
    Text,
    Card,
    Container,
    Row,
    Col,
    Sigma as S
} from "@dreesq/sigma";

class Menu extends Component {
    logout = async () => {
        const {history} = this.props;
        await client.auth.logout();
        history.push('/auth');
    };

    render() {
        const {features} = client;
        const {user} = client.auth;

        return (
            <Nav color="light" light expand="md" css={`
               .active {
                color: #000;
                font-weight: 600;
               }
            `}>
                <Container>
                    <Row>
                        <Col d={'flex'} alignItems={'center'}>
                            <Link to={'/'}>
                                <Text as={'h1'} fontSize={29} color={'#000'}>serpent</Text>
                            </Link>
                            <S ml={50} d={'flex'} alignItems={'center'}>
                                <S mr={20}>
                                    <NavLink to="/" activeClassName="active" exact>Dashboard</NavLink>
                                </S>
                                <Dropdown>
                                    {
                                        open => (
                                            <>
                                                <Text cursor={'pointer'} mr={20} d={'flex'} alignItems={'center'}>
                                                    Users
                                                    <S ml={5} dangerouslySetInnerHTML={{__html: open ? '&#9652;' : '&#9662;'}} />
                                                </Text>
                                                <Card width={170} p={[25, 30]} mt={-5}>
                                                    <S mb={12} cursor={'pointer'} hover={'a { color: #7b7b7b; }'}>
                                                        <NavLink to={'/users'} activeClassName="active">Users</NavLink>
                                                    </S>
                                                    <S mb={12} cursor={'pointer'} hover={'a { color: #7b7b7b; }'}>
                                                        <NavLink to={'/roles'} activeClassName="active">Roles</NavLink>
                                                    </S>
                                                    <S cursor={'pointer'} hover={'a { color: #7b7b7b; }'}>
                                                        <NavLink to={'/permissions'} activeClassName="active">Permissions</NavLink>
                                                    </S>
                                                </Card>
                                            </>
                                        )
                                    }
                                </Dropdown>
                                {features.translations && <NavLink to="/translations" activeClassName="active" exact>Translations</NavLink>}
                            </S>
                            <S ml={'auto'}>
                                <Dropdown>
                                    {
                                        open => (
                                            <>
                                                <S d={'flex'} alignItems={'center'} cursor={'pointer'}>
                                                    <S
                                                        width={36}
                                                        height={36}
                                                        mr={6}
                                                        borderRadius={'50%'}
                                                        background={'#f9243d'}
                                                        color={'#fff'}
                                                        d={'flex'}
                                                        alignItems={'center'}
                                                        justifyContent={'center'}
                                                    >
                                                        {acronym(user.name)}
                                                    </S>
                                                    {user.name}
                                                    <S ml={5} dangerouslySetInnerHTML={{__html: open ? '&#9652;' : '&#9662;'}} />
                                                </S>
                                                <Card width={170} p={[25, 30]} mt={4}>
                                                    <S mb={12} cursor={'pointer'} hover={'a { color: #7b7b7b; }'}>
                                                        <Link to={'/user/settings'}>Settings</Link>
                                                    </S>
                                                    <S onClick={this.logout} cursor={'pointer'} hover={'color: #7b7b7b;'}>
                                                        Logout
                                                    </S>
                                                </Card>
                                            </>
                                        )
                                    }
                                </Dropdown>
                            </S>
                        </Col>
                    </Row>
                </Container>
            </Nav>
        );
    }
}

export default withRouter(Menu);
