import React from 'react';
import { Table } from 'react-bootstrap';

class ListPresence extends React.Component {
    render() {
        const { presences } = this.props;
        return (
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Inicio da análise</th>
                        <th>Fim da análise</th>
                        <th>Situação</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderPresences(presences)}
                </tbody>
            </Table>
        )
    }

    renderPresences(presences) {
        return presences.map(item => {
            return (
                <tr key={item._id.toString()}>
                    <td>{item.entryTime.toLocaleString('pt-Br')}</td>
                    <td>{item.exitTime.toLocaleString('pt-Br')}</td>
                    <td>{item.presence ? 'Ocupado' : 'Liberado'}</td>
                </tr>
            );
        });
    }
}

export default ListPresence;