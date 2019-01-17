import React from 'react';
import { Form, FormGroup, Panel, Col } from 'react-bootstrap';
import { get } from '../../api/PresenceApi';
import SelectFilter from '../SelectFilter';
import CheckboxAgroup from '../CheckboxAgroup';
import ListPresence from '../ListPresence';

class MeetingRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            presences: [],
            presencesFiltered: [],
        }
        this.filtered = 'all';
        this.grouped = false;

        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onAgroup = this.onAgroup.bind(this);
        this.getPresences = this.getPresences.bind(this);
        this.filter = this.filter.bind(this);
    }

    async componentDidMount() {
        await this.getPresences();

        setInterval(() => this.getPresences(), 15000);
    }

    render() {
        const presencesFiltered = this.state.presencesFiltered;
        return (
            <Panel bsStyle="default">
                <Panel.Heading>
                    <Panel.Title componentClass="h2">Controle de acesso a Sala de Reuniões</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Form horizontal>
                        <FormGroup controlId="formControlFilter">
                            <Col sm={4} md={3}>
                                <SelectFilter onSelect={this.onSelectFilter}/>
                            </Col>
                            <Col sm={3}>
                                <CheckboxAgroup onCheck={this.onAgroup}/>
                            </Col>
                        </FormGroup>
                    </Form>
                    <ListPresence presences={presencesFiltered}/>
                </Panel.Body>
            </Panel>
        );
    }

    onSelectFilter(event) {
        this.filtered = event.target.value
        this.filter();
    }

    onAgroup(event) {
        this.agrouped = event.target.checked;
        this.filter();
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

export default MeetingRoom;