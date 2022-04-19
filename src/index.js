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
    let score = Array(this.props.letters.length).fill('');
    if (this.props.score) score = this.props.score;
    
    const wordboxes = score.map((color,index) => {
      return (<Square key={index} letter={this.props.letters.charAt(index)} status={color} />);
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
      wordhistory: Array(0).fill(''),
      scorehistory: Array(0).fill(''),
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
    const h = this.state.wordhistory;
    const s = this.state.scorehistory;

    //map colors to the word's indeces
    const score = checkCorrect(this.state.currentGuess).map((letter) => {
      switch(letter) {
        case 2:
          return "abc-correct";
          break;
        case 3:
          return "abc-juxtaposed";
          break;
        default:
          return "abc-incorrect";
      };
    });
    
    //add guess and its score to histories
    h.push(this.state.currentGuess);
    s.push(score);
    
    //reset for next guess
    this.setState({ 
      guesses: g+1,
      currentGuess: '',
      wordhistory: h,
      scorehistory: s
    });
    console.log(h);
  } 

  render() {

    //Before rendering, create components for previous guesses
    const history = this.state.wordhistory;
    const guesses = history.map((element,index) => {
      const word = (index===this.state.guesses) ? this.state.currentGuess : element;
      return (<Guess key={index} letters={word} score={this.state.scorehistory[index]}/>);
    });
    

    return (
      <div className="game">
        <div className="status">WIP Wordle Clone by mkioski</div>
        <div className="game-board">
          <>
          {guesses}
          <Guess letters={this.state.currentGuess} score={Array(6).fill('')} />
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

function numberOfs(word, letter) { //returns the number of times a character is in a string
  const n = (word.match(new RegExp(letter, 'g')) || []).length;
  console.log(word +" contains "+ n +" '"+ letter +"'s");
  return n;
}

function checkCorrect(word) {     //checks correctness of the submitted word
  
  const answer = "KIOSKI";
  let result = Array(6).fill("1");

  //Algorithm for checking word here


  let index = 0;
  let subst = '';
  for (const r of word) {
    if (r===answer.charAt(index)) result[index]=2;    //correct
    else if (answer.includes(r)) {
    
      result[index]=3;                                //wrong spot
      subst = word.substring(0,index+1);
      if (numberOfs(subst,r) > numberOfs(answer,r))
        result[index]=1;                              //too many wrong spot

    }
    index++;
  }
  console.log("Debug checker: "+ word +" ? "+ answer +": "+ result);
  return result;
} 

