import React from 'react';
import { FormControl } from 'react-bootstrap';

class SelectFilter extends React.Component {
    render() {
        return (
            <FormControl componentClass="select" placeholder="select" onChange={this.props.onSelect}>
                <option value="all">Exibir tudo</option>
                <option value="busy">Somente ocupados</option>
                <option value="free">Somente disponíveis</option>
            </FormControl>
        )
    }
}


export default SelectFilter;