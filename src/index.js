import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <div className="square">
      <div className={props.status}>{props.letter}</div>
    </div>
  );
}

class Guess extends React.Component {

  render() {

    //dynamically create the boxes for each letter in the word
    const result = checkCorrect(this.props.letters);
    const wordboxes = result.map((step,move) => {
      const s = (step===2) ? "abc-correct" : "abc-incorrect";
      return (<Square key={move} letter={this.props.letters.charAt(move)} status={s} />);
    });

    return (
      <div className="board-row">
        <>
        {wordboxes}
        </>
      </div>
    );
  }
}

class Game extends React.Component {

  //initialize state with empty history
  constructor(props) {
    super(props);
    this.state= {
      history: Array(0).fill(''),
      currentGuess: '',
      guesses: 0
    };

    this.handleChange=this.handleChange.bind(this);
    this.handleMyGuess=this.handleMyGuess.bind(this);

  }

  //maintain the word as it's being written
  handleChange(event) {
    const text = event.target.value.replace(/[^A-z]/, '').toUpperCase();
    this.setState({
      currentGuess: text  
    });
  }

  //check the word, commit it to history, and move to the next guess
  handleMyGuess() {
    const g = this.state.guesses;
    const h = this.state.history;
    h.push(this.state.currentGuess);
    this.setState({ 
      guesses: g+1,
      currentGuess: '',
      history: h
    });
    console.log(h);
  } 

  render() {

    //Before rendering, create components for previous guesses
    const history = this.state.history;
    const guesses = history.map((step,move) => {
      const word = (move===this.state.guesses) ? this.state.currentGuess : step;
      return (<Guess key={move} letters={word} />);
    });
    

    return (
      <div className="game">
        <div className="status">WIP Wordle Clone by mkioski</div>
        <div className="game-board">
          <>
          {guesses}
          <Guess letters={this.state.currentGuess} />
          </>
        </div>
        
        <div className="game-info">
          <input type="text"
            value={this.state.currentGuess} onChange={this.handleChange} 
            maxLength="6"
          />
          <input type="button" value="Enter" onClick={this.handleMyGuess}/>
          <div>{this.state.currentGuess}</div>
        </div>

        <div className="game-info">
        <p>Requirements:</p>
        <ul>
          <li><s>Display letters in boxes</s></li>
          <li>Add keyboard buttons</li>
          <li>Show correctness of word only when submitted</li>
          <li><s>Move focus when submitted</s></li>
          <li>Pull word from external source</li>
          <li>Check validity of word before submitting</li>
          <li></li>
          <li>Force focus into input</li>
          <li><s>Limit to uppercase alphabetic characters</s></li>
          <li>Limit to exactly 6 characters</li>
          <li><s>Create new Guess on form submit</s></li>
        </ul>
        </div>
      </div>
    );
  } 
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function checkWord(word) {return true;} //checks dictionary for word correctness

function checkCorrect(word) {     //checks correctness of the submitted word
  
  const answer = "KIOSKI";
  let result = Array(6).fill("1");

  //Algorithm for checking word here


  let index = 0;
  for (const r of word) {
    if (r===answer.charAt(index)) result[index]=2;
    else if (answer.includes(r)) result[index]=3;
    index++;
  }
  console.log("Debug checker: "+ word +" ? "+ answer +": "+ result);
  return result;
} 

