import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import Alert from '../Misc/Alert';
import {withRouter} from 'react-router-dom';
import {parse} from '../../utils';
import client from '../../client';

class Register extends Component {
    state = {
        loading: false
    };

    register = async e => {
        const parsed = parse(e);
        this.loading(true);

        const {data, errors} = await client.createUser({
            ...parsed,
            provider: 'local'
        });

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
        }

        const {data: user, errors: authErrors} = await client.auth.login({
            ...parsed,
            provider: 'local'
        });

        if (authErrors) {
            return this.alert.toggle(authErrors);
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
                                <h4>Sign Up</h4>
                                <p>Already have an account? <Link to={'/auth'}><u>Sign in</u></Link> instead</p>
                            </div>
                            <Alert ref={ref => this.alert = ref}/>
                            <Col lg={12}>
                                <Form onSubmit={this.register}>
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type={'text'} name={'name'} autoFocus={true} placeholder={'Name'}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email</Label>
                                        <Input type={'email'} name={'email'} placeholder={'me@email.com'}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Password</Label>
                                        <Input type={'password'} name={'password'} placeholder={'Password'}/>
                                    </FormGroup>
                                    <Button block color={'primary'} disabled={loading}>
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

export default withRouter(Register);