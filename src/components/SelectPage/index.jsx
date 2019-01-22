import React from 'react';
import './index.css';
import { Form, FormControl } from 'react-bootstrap';

class SelectPage extends React.Component {
    constructor(props) {
        super(props);
        this.createOptions = this.createOptions.bind(this);
    }

    render() {
        return (
            <Form className="teste">
                <FormControl 
                    componentClass="select" 
                    placeholder="select" 
                    value={this.props.page}
                    onChange={this.props.onSelect}
                >
                    {this.createOptions()}
                </FormControl>
            </Form>
        )
    }

    createOptions() {
        const pages = this.props.pages;
        const options = [];
        for (let i = 1; i <= pages; i++) {
            options.push(<option value={i} key={i}>{i}</option>);
        }
        return options;
    }
}


export default SelectPage;