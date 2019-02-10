import React, {Component} from 'react';
import client from "../../client";
import {Card, Col, Container, Row} from "reactstrap";
import {Link, withRouter} from "react-router-dom";
import {parseQs} from "../../utils";
import Alert from '../Misc/Alert';

class Confirm extends Component {
    state = {
        loading: false,
        finished: false
    };

    async componentDidMount() {
        const qs = parseQs(this.props.location.search);

        const {data, errors} = await client.confirmUser({
            token: qs.token
        });

        this.loading(false);

        if (errors) {
            return this.alert.toggle(errors);
        }

        if (data.success) {
            this.setState({
                finished: true
            });
        }
    }

    loading = (loading = true) => {
        this.setState({ loading });
    };

    render() {
        const {loading, finished} = this.state;

        return (
            <Container>
                <Row>
                    <Col lg={{size: 4, offset: 4}}>
                        <Card className={'p-4 mt-5'}>
                            <div className={'text-center'}>
                                <h4>Confirm Account</h4>
                            </div>
                            <Alert ref={ref => this.alert = ref}/>
                            <Col lg={12}>
                                {
                                    loading && (
                                        <p className={'text-warning'}>Hold on while we confirm your account.</p>
                                    )
                                }
                                {
                                    finished && (
                                        <p className={'text-success'}>Account was successfully confirmed. Go to <Link to={'/'}><u>panel</u></Link> page.</p>
                                    )
                                }
                            </Col>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default withRouter(Confirm);