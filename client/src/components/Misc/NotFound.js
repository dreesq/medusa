import React, {Component} from 'react';
import {Container} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <Container className={'mt-5'}>
                <h4>Page not found</h4>
                <p>The page you were trying to access could not be found.</p>
                <p>Navigate to <Link to={'/'}>Home</Link> instead?</p>
            </Container>
        );
    }
}