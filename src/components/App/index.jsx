import React from 'react';
import { Table, Panel, FormGroup, FormControl, Form, Col, Checkbox } from 'react-bootstrap';
import { get } from '../../api/PresenceApi';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            presences: [],
            presencesFiltered: [],
        }
        this.filtered = 'all';
        this.grouped = false;

        this.getPresences = this.getPresences.bind(this);
        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onAgroup = this.onAgroup.bind(this);
        this.filter = this.filter.bind(this);
    }

    async componentDidMount() {
        await this.getPresences();
        this.setState({
            presencesFiltered: this.state.presences,
        });

        setInterval(() => this.getPresences(), 15000);
    }

    render() {
        const presences = this.state.presencesFiltered;
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
                                    <FormControl componentClass="select" placeholder="select" onChange={this.onSelectFilter}>
                                        <option value="all">Exibir tudo</option>
                                        <option value="busy">Somente ocupados</option>
                                        <option value="free">Somente disponíveis</option>
                                    </FormControl>
                                </Col>
                                <Col sm={3}>
                                    <Checkbox onChange={this.onAgroup}>Agrupar por Situação</Checkbox>
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
                                {this.renderPresences(presences)}
                            </tbody>
                        </Table>
                    </Panel.Body>
                </Panel>
            </div>
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

    async getPresences() {
        let result = [];
        try {
            result = await get();
        } catch (e) {
            console.log(e);
        }

        this.setState({
            presences: result,
        });
    }

    onSelectFilter(event) {
        this.filtered = event.target.value
        this.filter();
    }

    onAgroup(event) {
        this.agrouped = event.target.checked;
        this.filter();
    }

    filter() {
        const presences = this.state.presences;
        const agrouped = this.agrouped;
        const filter = this.filtered;

        let result = [];
        if (agrouped) {
            result = presences.reduce((acc, cur) => {
                if (acc.length && acc[acc.length - 1].presence === cur.presence) {
                    acc[acc.length -1].exitTime = cur.exitTime;
                    return acc;
                }
                acc.push(cur);
                return acc;
            }, []);
        } else {
            result = presences;
        }

        if (filter === 'all') {
            this.setState({
                presencesFiltered: result
            });
            return;
        }
        result = result.filter(item => item.presence === (filter === 'busy'))
        this.setState({
            presencesFiltered: result
        });
    }
}

export default App;