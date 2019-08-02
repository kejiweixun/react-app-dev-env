import React, { Component } from 'react';
import Form from './Form';

class App extends Component {
 state = {
   hello: 'hello world'
 }

  render() {
    return (
      <Form hello={this.state.hello}/>
    )
  }
};

export default App;
