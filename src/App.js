//@flow
import React, { Component, Suspense } from 'react';
const HelloWorld = React.lazy(() => import('./HelloWorld'));

class App extends Component {
  state = {
    hello: 'hello world!',
  }

  // componentDidMount = () => {
  //   import(/* webpackChunkName: "HelloWorld" */ './HelloWorld')
  //     .then(res => res.default)
  //     .then(HelloWorld => {
  //       this.setState({
  //         Element: HelloWorld
  //       });
  //     })
  // }

  render() {

    console.log(HelloWorld);
    return (
      <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HelloWorld hello={this.state.hello}/>
      </Suspense>
    </div>
    )
  }
};

export default App;
