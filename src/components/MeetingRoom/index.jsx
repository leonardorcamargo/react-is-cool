import React from 'react';
import { Form, FormGroup, Panel, Col } from 'react-bootstrap';
import { get } from '../../api/PresenceApi';
import SelectFilter from '../SelectFilter';
import CheckboxAgroup from '../CheckboxAgroup';
import ListPresence from '../ListPresence';
import Pagination from '../Pagination';

class MeetingRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            presences: [],
            page: 1,
            pages: 0
        }
        this.filtered = 'all';
        this.agroup = false;

        this.onSelectFilter = this.onSelectFilter.bind(this);
        this.onSelectPage = this.onSelectPage.bind(this);
        this.onAgroup = this.onAgroup.bind(this);
        this.getPresences = this.getPresences.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    async componentDidMount() {
        await this.getPresences();

        setInterval(() => this.getPresences(), 15000);
    }

    render() {
        const presences = this.state.presences;
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
                    <ListPresence presences={presences}/>
                    <Pagination 
                        page={this.state.page}
                        pages={this.state.pages}
                        onSelectPage={this.onSelectPage}
                        onPrevious={this.previousPage}
                        onNext={this.nextPage}
                    />
                </Panel.Body>
            </Panel>
        );
    }

    onSelectFilter(event) {
        this.filtered = event.target.value
        this.getPresences();
    }

    onSelectPage(event) {
        this.getPresences({page: event.target.value});
    }

    onAgroup(event) {
        this.agroup = event.target.checked;
        this.getPresences();
    }

    async getPresences(params = {}) {
        try {            
            const query = {
                page: params.page || this.state.page,
                amount: 15,
            };
            if (this.filtered !== 'all') 
                query.presence = this.filtered === 'busy';
            if (this.agroup)
                query.agroup = true;
            const { result, page, pages } = await get(query);
            this.setState({
                presences: result,
                page,
                pages
            });
        } catch (e) {
            console.log(e);
        }
    }

    nextPage() {
        this.getPresences({page: this.state.page + 1})
    }

    previousPage() {
        this.getPresences({page: this.state.page - 1})
    }
}

export default MeetingRoom;