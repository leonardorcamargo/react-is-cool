import React from 'react';
import { Checkbox } from 'react-bootstrap';

class CheckboxAgroup extends React.Component {
    render() {
        return (
            <Checkbox onChange={this.props.onCheck}>Agrupar por Situação</Checkbox>
        )
    }
}

export default CheckboxAgroup;