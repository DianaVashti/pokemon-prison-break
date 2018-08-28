import React, { Component } from 'react';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCollection: [],
      keyWord: null,
      isLoading: true,
      wrongGuesses: [],
      correctGuesses: []
    };
  }

  render() {
    return (
      <div>
        <div className="hero">
          <header className="header">
            Header...
          </header>
          <main className="main-content">
            <article className="game-console">
              <div className="game-screen">
                graphic and correct guesses....
              </div>
              <div className="interactive-screen">
                textfield to submit letter...
              </div>
            </article>
            <nav className="poke-stats">
              Pokemon stats...
            </nav>
            <aside className="scoreboard">
              <div>
                wrong guesses...
              </div>
              <div>
                doors unlocked...
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
      </div>
    );
  }
}
