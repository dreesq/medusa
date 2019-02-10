import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap';
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
            <Container>
                <Row>
                    <Col lg={{size: 4, offset: 4}}>
                        <Card className={'p-4 mt-5'}>
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
                                    <Col lg={12}>
                                        <Form onSubmit={this.reset}>
                                            {
                                                step === 0 && (
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input type={'email'} name={'email'} autoFocus={true} placeholder={'Email'}/>
                                                    </FormGroup>
                                                )
                                            }
                                            {
                                                step === 1 && (
                                                    <Fragment>
                                                        <FormGroup>
                                                            <Label>Password</Label>
                                                            <Input type={'password'} name={'password'} placeholder={'Password'}/>
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <Label>Repeat Password</Label>
                                                            <Input type={'password'} name={'repeatPassword'} placeholder={'Repeat Password'}/>
                                                        </FormGroup>
                                                    </Fragment>
                                                )
                                            }
                                            <Button block color={'primary'} disabled={loading}>
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                                )
                            }
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Reset);