import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. OK I did.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Game() {
  return (
  <div className="Board">
  <p>something</p>
  </div>
  )
}

class Box extends React.Component {
  render() {
    return (
      <div className="letter-box">
        <p>box</p>
      </div>
    );
  }
}

export default Game;
