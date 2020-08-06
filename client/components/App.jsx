import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }

    this.increment = this.increment.bind(this);
  }

  increment() {
    let count = this.state.counter;
    count++;
    console.log(count);
    this.setState({ counter: count });
  }

  render() {
    return (
      <div>
        <div>Current Count: {this.state.counter}</div>
        <button onClick={this.increment}>Increment Counter</button>
      </div>
    );
  }

}

export default App;