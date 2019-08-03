import React, { Component } from 'react';
import HelloWorld from './HelloWorld';

class App extends Component {
 state = {
   hello: 'hello world!'
 }

  render() {
    return (
      <HelloWorld hello={this.state.hello}/>
    )
  }
};

export default App;
