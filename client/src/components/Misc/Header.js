import React, {Component} from 'react';
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

let timeout = false;

export default class Header extends Component {
    onSearchChange = e => {
        if (timeout) {
            clearTimeout(timeout);
        }

        const {onSearch} = this.props;
        const {value} = e.target;

        timeout = setTimeout(value => {
            onSearch(value);
        }, 300, value);
    };

    render() {
        const {title, onSearch, onCreate, createText = 'Create'} = this.props;

        return (
            <div className={'header'}>
                <div>
                    {
                        title && <h4>{title}</h4>
                    }
                </div>
                <div className="right-content">
                    {
                        onSearch && (
                            <div className={'search-input'}>
                                <Input type={'text'} placeholder={'Search...'} onChange={this.onSearchChange}/>
                                <FontAwesomeIcon icon={'search'}/>
                            </div>
                        )
                    }
                    {
                        onCreate && (
                            <Button onClick={onCreate} color={'primary'} className={'create-button'}>
                                <FontAwesomeIcon icon={'plus'}/>{' '}
                                {createText}
                            </Button>
                        )
                    }
                </div>
            </div>
        );
    }
}