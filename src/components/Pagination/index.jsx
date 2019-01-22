import React from 'react';
import { Pager } from 'react-bootstrap';
import SelectPage from '../SelectPage';

class Pagination extends React.Component {
    render() {
        return (
            <Pager>
                <Pager.Item disabled={this.props.page <= 1} previous onClick={this.props.onPrevious}>
                    &larr; Previous
                </Pager.Item>
                <SelectPage 
                    pages={this.props.pages} 
                    page={this.props.page}
                    onSelect={this.props.onSelectPage}
                />
                <Pager.Item disabled={this.props.page >= this.props.pages} next onClick={this.props.onNext}>
                    Next &rarr;
                </Pager.Item>
            </Pager>
        )
    }
}

export default Pagination;