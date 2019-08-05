import React, { Component } from 'react';
import './App.css';

class Error extends Component {
  state = {
    errMsg: 'Load Google Maps Error'
  }

  render() {
    return (
      <h1 className='errorscreen-msg'>{this.state.errMsg}</h1>
    )
  }
}

export default Error;
