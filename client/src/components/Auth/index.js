import React, {Component} from 'react';
import {Container, Row, Col, Card, FormGroup, Input, Label, Button, Form} from 'reactstrap';
import {Link} from 'react-router-dom';
import client from '../../client';

export default class Auth extends Component {
    login = async e => {
        e.preventDefault();

        const {errors, data} = await client.login({
            provider: 'local'
        });

        console.log(e, errors, data);
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={{size: 4, offset: 4}}>
                        <Card className={'p-4 mt-4'}>
                            <div className={'text-center'}>
                                <h4>Sign In</h4>
                                <p>Don't have an account? <Link to={'/auth/register'}>Create one</Link></p>
                            </div>

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
                                    <Button block color={'primary'}>
                                        Submit
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