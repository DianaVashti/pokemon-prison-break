import React, { Component } from 'react';
import YouLost from './YouLost';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCollection: ['Mr.Poopybutthole', 'Squanchy', 'Picklerick', 'Beth', 'Jerry', 'Summer', 'Morty'],
      keyWord: 'sample',
      isLoading: true,
      wrongGuesses: [],
      correctGuesses: [],
      value: '',
      wins: 0,
      loss: false,
      justWon: false
    };
    this.renderView = this.renderView.bind(this);
    this.renderKeyword = this.renderKeyword.bind(this);
    this.selectKeyword = this.selectKeyword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderWrongGuesses = this.renderWrongGuesses.bind(this);
    this.checkWinOrLoss = this.checkWinOrLoss.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.handleNextRound = this.handleNextRound.bind(this);
  }

  componentWillMount() {
    this.selectKeyword();
  }

  checkWinOrLoss() {
    const { wrongGuesses, keyWord, correctGuesses, wins, loss } = this.state;
    const keyWordAllCaps = keyWord.toUpperCase();
    const correctGuessCheck = correctGuesses.join('').toUpperCase();

    if (wrongGuesses.length >= 6 || loss === true) {
      this.setState({ loss: true });
    } else if (keyWordAllCaps === correctGuessCheck) {
      this.setState({
        keyWord: '',
        wrongGuesses: [],
        correctGuesses: [],
        wins: wins + 1,
        justWon: true
      });
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let guessSuccess = false;
    const { keyWord, correctGuesses, wrongGuesses, value } = this.state;
    const keyWordArray = keyWord.split('');
    const updatedCorrectGuesses = correctGuesses.map((item, index) => {
      if (keyWordArray[index].toUpperCase() === value.toUpperCase()) {
        guessSuccess = true;
        return value.toUpperCase();
      }
        return item.toUpperCase();
    });

    if (!guessSuccess) {
      const mutableWrongGuesses = wrongGuesses;
      mutableWrongGuesses.push(value.toUpperCase());
      this.setState({ wrongGuesses: mutableWrongGuesses }, () => this.checkWinOrLoss());
    }
    this.setState({ correctGuesses: updatedCorrectGuesses, value: '' }, () => {
      return this.checkWinOrLoss();
    });
  }

  selectKeyword() {
    const { wordCollection } = this.state;

    if (wordCollection.length !== 0) {
      const index = Math.floor(Math.random() * (wordCollection.length));
      const keyWord = wordCollection[index];
      const wordLength = keyWord.length;
      const correctGuesses = new Array(wordLength).fill('_', 0, wordLength);
      this.setState({
        keyWord,
        isLoading: false,
        correctGuesses
      });
    }
  }

  handleNextRound(event) {
    event.preventDefault();
    this.setState({ justWon: false }, () => {
      return this.selectKeyword();
    });
  }

  renderView() {
    const { loss, wins } = this.state;

    if (loss === true) {
      return <YouLost />;
    }

    return (
      <div className="hero">
        <header className="header">
          Header...
        </header>
        <main className="main-content">
          <article className="game-console">
            <div className="game-screen">
              {this.renderKeyword()}
            </div>
            {this.renderInput()}
          </article>
          <nav className="poke-stats">
            Pokemon stats...
          </nav>
          <aside className="scoreboard">
            <div className="wrong-guesses">
              {this.renderWrongGuesses()}
            </div>
            <div>
              Doors Unlocked: {wins}
            </div>
            <div>
              Pokémon saved....
            </div>
          </aside>
        </main>
        <footer className="footer">
          footer...
        </footer>
      </div>
    );
  }

  renderKeyword() {
    return this.state.isLoading
      ? <p>Loading...</p>
      : this.state.correctGuesses.map((item, index) => <p key={index}>{item}</p>);
  }

  renderWrongGuesses() {
    return (
      this.state.wrongGuesses.map((item, index) => <p key={index}>{item}</p>)
    );
  }

  renderInput() {
    if (this.state.justWon === true) {
      return (
        <div>
          <div className='next-round'>You Just Won</div>
          <div className='you-won'>
            <div className='next-round'>Start Next Round</div>
            <div
              id="new-round-clickable"
              className='next-round'
              onClick={this.handleNextRound}
            >
              ⬆️
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="interactive-screen">
        <form onSubmit={this.handleSubmit}>
          <label>
            Guess A Letter:
            <input
              autoFocus
              maxLength="1"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <div onClick={this.handleSubmit}>⬆️</div>
          </label>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderView()}
      </div>
    );
  }
}
