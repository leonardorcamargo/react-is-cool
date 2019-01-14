import React from 'react';
import { Table, Panel, FormGroup, FormControl, Form, Col, Checkbox } from 'react-bootstrap';
import axios from 'axios';

class App extends React.Component {
    render() {
        return (
            <div>
                <Panel bsStyle="default">
                    <Panel.Heading>
                        <Panel.Title componentClass="h2">Controle de acesso a Sala de Reuniões</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Form horizontal>
                            <FormGroup controlId="formControlFilter">
                                <Col sm={4} md={3}>
                                    <FormControl componentClass="select" placeholder="select">
                                        <option value="all">Exibir tudo</option>
                                        <option value="busy">Somente ocupados</option>
                                        <option value="free">Somente disponíveis</option>
                                    </FormControl>
                                </Col>
                                <Col sm={3}>
                                    <Checkbox>Agrupar por Situação</Checkbox>
                                </Col>
                            </FormGroup>
                        </Form>                        
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>Inicio da análise</th>
                                    <th>Fim da análise</th>
                                    <th>Situação</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{Date.now()}</td>
                                    <td>{Date.now()}</td>
                                    <td>Liberado</td>
                                </tr>
                                <tr>
                                    <td>{Date.now()}</td>
                                    <td>{Date.now()}</td>
                                    <td>Liberado</td>
                                </tr>
                                <tr>
                                    <td>{Date.now()}</td>
                                    <td>{Date.now()}</td>
                                    <td>Liberado</td>
                                </tr>
                                <tr>
                                    <td>{Date.now()}</td>
                                    <td>{Date.now()}</td>
                                    <td>Liberado</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
        )
    }
}

export default App;