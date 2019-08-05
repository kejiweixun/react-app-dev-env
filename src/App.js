import React, { Component } from 'react';

class App extends Component {
  state = {
    hello: 'hello world!',
    Element: '',
  }

  componentDidMount = () => {
    import(/* webpackChunkName: "HelloWorld" */ './HelloWorld')
      .then(res => res.default)
      .then(HelloWorld => {
        this.setState({
          Element: HelloWorld
        });
      })
  }

  render() {
    let Element = this.state.Element;
    console.log(Element);
    return (
      <div>
       {Element && <Element hello={this.state.hello}/>}
      </div>
    )
  }
};

export default App;
