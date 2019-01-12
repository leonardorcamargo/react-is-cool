import React, { Component } from 'react';
import './App.css';

class Hello extends Component {
  render() {
    return <div>Hello {this.props.toWhat}</div>;
  }
}

export default Hello;
