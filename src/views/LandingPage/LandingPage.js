import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import PokeView from './PokeView';
import Rules from './Rules';
import YouLost from './YouLost';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCollection: [],
      keyWord: 'sample',
      isLoading: true,
      wrongGuesses: [],
      correctGuesses: [],
      value: '',
      wins: 0,
      loss: false,
      stage: 'door',
      pokemon: '',
      pokemonPicture: '',
      pokemonFriends: []
    };
    this.renderImageQuote = this.renderImageQuote.bind(this);
    this.fetchPokemon = this.fetchPokemon.bind(this);
    this.fetchWords = this.fetchWords.bind(this);
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
    this.fetchWords();
  }

  fetchWords() {
    if (!this.props.easy) {
      axios.get('/words')
        .then(data => {
          const dataArray = data.data.split('\n');
          this.setState({ wordCollection: dataArray });
        })
        .then(() => this.selectKeyword())
        .catch(Error);
    } else if (this.props.easy) {
      axios.get('/words/easy')
        .then(data => {
          const dataArray = data.data.split('\n');
          this.setState({ wordCollection: dataArray });
        })
        .then(() => this.selectKeyword())
        .catch(Error);
    }
  }

  fetchPokemon() {
    // 802 pokemon! 7/11/2018
    const x = Math.floor(Math.random() * 802) + 1;

    axios.get('https://pokeapi.co/api/v2/pokemon/' + x + '/')
      .then(data => {
        this.setState({
          pokemon: data.data.species.name,
          pokemonPicture: data.data.sprites.front_default
        }, () => console.log(this.state.pokemon));
      })
      .catch(error => console.log('ERROR!!!!!!!!!!', error));
  }

  checkWinOrLoss() {
    const { wrongGuesses, keyWord, correctGuesses, wins, loss, stage, pokemon, pokemonFriends } = this.state;
    const keyWordAllCaps = keyWord.toUpperCase();
    const correctGuessCheck = correctGuesses.join('').toUpperCase();

    if ((wrongGuesses.length >= 6 || loss === true) && stage === 'door') {
      setTimeout(() => this.setState({ loss: true }), 1500);
    } else if (keyWordAllCaps === correctGuessCheck && stage === 'door') {
      const wordLength = pokemon.length;
      const newCorrectGuesses = new Array(wordLength).fill('_', 0, wordLength);
      setTimeout(() => this.setState({
        isLoading: true,
        keyWord: pokemon,
        wrongGuesses: [],
        correctGuesses: newCorrectGuesses,
        wins: wins + 1,
        stage: 'friendship'
      }, () => this.setState({ isLoading: false })), 1500);
    } else if (wrongGuesses.length >= 6 && stage === 'friendship') {
      setTimeout(() => this.setState({
        keyWord: '',
        wrongGuesses: [],
        correctGuesses: [],
        pokemon: '',
        stage: 'continue'
      }), 1500);
    } else if (keyWordAllCaps === correctGuessCheck && stage === 'friendship') {
      const newFriendsArray = pokemonFriends;
      newFriendsArray.push(pokemon);
      setTimeout(() => this.setState({
        keyWord: '',
        wrongGuesses: [],
        correctGuesses: [],
        pokemon: '',
        pokemonFriends: newFriendsArray,
        stage: 'continue'
      }), 1500);
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
      }, () => {
        console.log(keyWord);
        this.fetchPokemon();
      });
    }
  }

  handleNextRound(event) {
    event.preventDefault();
    this.setState({ stage: 'door' }, () => {
      return this.selectKeyword();
    });
  }

  renderImageQuote() {
    const { stage } = this.state;

    if (stage === 'door') {
      return (
        <div className='center-text-column'>
          <p> FREE ME PLEASE! Guess the</p>
          <p className='bold'>PASSCODE</p>
        </div>
      );
    } else if (stage === 'friendship') {
      return (
        <div className='center-text-column'>
          <p> Thank You Human, I will be your friend if you know my</p>
          <p className='bold'>SPECIES</p>
        </div>
      );
    } else if (stage === 'continue') {
      return;
    }
  }

  renderView() {
    const { loss, wins, pokemonFriends, pokemonPicture } = this.state;

    if (loss === true) {
      return <YouLost />;
    }

    return (
      <div className="hero">
        <header className="header">
          <Link to='/'>Pokèmon Prison Break</Link>
        </header>
        <main className="main-content">
          <article className="game-console">
            <PokeView image={pokemonPicture} />
            {this.renderImageQuote()}
            <div className="game-screen">
              {this.renderKeyword()}
            </div>
            {this.renderInput()}
          </article>
          <nav className="poke-stats">
            <Rules />
          </nav>
          <aside className="scoreboard">
            <div className='column wins'>
              Pokèmon saved: {wins}
            </div>
            <div className='column'>
              New Friends!:
              <div className='column'>{pokemonFriends.join('\n')}</div>
            </div>
            <div className='column wrong-guess'>Wrong Guesses:</div>
            <div className="wrong-guesses">
              {this.renderWrongGuesses()}
            </div>
          </aside>
        </main>
        <footer className="footer">
          Diana Maria Vashti 2018
        </footer>
      </div>
    );
  }

  renderKeyword() {
    // can be seperate component when needs more design
    return this.state.isLoading
      ? <p>Loading...</p>
      : this.state.correctGuesses.map((item, index) => <p key={index}>{item}</p>);
  }

  renderWrongGuesses() {
    // can be seperate component when needs more design
    return (
      this.state.wrongGuesses.map((item, index) => <p key={index}>{item}</p>)
    );
  }

  renderInput() {
    if (this.state.stage === 'continue') {
      return (
        <div>
          <div className='next-round'>Will you save them all!? Keep going!</div>
          <div className='you-won'>
            <div className='next-round'>Start Next Round</div>
            <div
              className='next-round new-round-clickable'
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
            <div className='new-round-clickable' onClick={this.handleSubmit}>⬆️</div>
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
