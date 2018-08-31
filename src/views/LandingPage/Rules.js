import React from 'react';
import { Link } from 'react-router';

const Rules = () => {
  return (
    <div className='rules'>
      <div className='single-rule'>Rules:</div>
      <div className='single-rule'>6 incorrect letter guesses at any stage and you fail that stage.</div>
      <div className='single-rule'>Each round has two stages:</div>
      <div className='single-rule'>1: To save a pokemon you need to guess the passcode that opens their cell. On normal mode this passcode can have varrying lengths. Easy mode the passcode will always be 5-8 characters long. If you fail on this step the game is over and you have to start over.</div>
      <div className='single-rule'>2: If you guess the passcode you won the round. You can't lose the game in the second stage but you can gain a new friend! The pokemon know your species name is "Human". If you can guess a Pokèmon's species they will become your friend! Yay friendship!</div>
      <div className='single-rule'>The number of cells you unlocked (Pokémon Saved!), The list of your new friends, and the letters you have already incorrectly guessed this stage are located on the opposite panel.</div>
      <div className='single-rule'>Notes: There is no penalty for accidently guessing a correct word twice but all incorrect guesses, EVEN DUPLICATES, count against your total so be careful not to waste guesses! Hint: some Pokémon species names are hyphenated</div>
      <Link to='/easy'>Too Hard? Try Easy mode!</Link>
    </div>
  );
};

export default Rules;
