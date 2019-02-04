import React, {Component} from 'react';
import {Container, Row, Col, Card, FormGroup, Input, Label, Button, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import client from '../../client';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Alert from '../Misc/Alert';
import {parse} from "../../utils";
import {withRouter} from 'react-router-dom';

class Auth extends Component {
    state = {
        loading: false
    };

    login = async e => {
        const parsed = parse(e);
        this.loading(true);

        const {data: user, errors} = await client._auth.login({
            ...parsed,
            provider: 'local'
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
            <Container>
                <Row>
                    <Col lg={{size: 4, offset: 4}}>
                        <Card className={'p-4 mt-5'}>
                            <div className={'text-center'}>
                                <h4>Sign In</h4>
                                <p>Don't have an account? <Link to={'/auth/register'}><u>Create one</u></Link></p>
                            </div>
                            <Alert ref={ref => this.alert = ref}/>
                            <Col lg={12}>
                                <Form onSubmit={this.login}>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type={'email'} name={'email'} autoFocus={true} placeholder={'me@email.com'}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type={'password'} name={'password'} placeholder={'Password'}/>
                                    </FormGroup>
                                    <FormGroup className={'text-right'}>
                                        <Link to={'auth/reset'}>Forgot password?</Link>
                                    </FormGroup>
                                    <Button block color={'primary'} disabled={loading}>
                                        Submit
                                    </Button>
                                    <hr/>
                                    <Button block color={'primary'}>
                                        <FontAwesomeIcon icon={['fab', 'facebook']}/>{' '}
                                        Login with facebook
                                    </Button>
                                </Form>
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Auth);