# pokemon-prison-break
An old game with a new twist

Some nasty 'ol meanie has been capturing Pokémon and keeping them locked up in cells.
To save a Pokémon you need to figure out the secret passcode that unlocks the cell.
You will know how many letters the passcode is, but regardless, guess six wrong letters and the alarm goes off and neither the Pokémon nor you escape.
Once you open the cell you will have the chance to befriend the imprisoned Pokémon.
To become their friend you simply need to guess their species name, and similar to the door locking mechanism, guess six wrong letters in their species name and they will thank you for freeing them but rebuff your friendship.
How many can you save? How many new friends will you make in the process? Just don't get caught!

### Requirements
- Node Version 7+

### Install & Run
- from github:
  - [Visit this repo](https://github.com/DianaVashti/pokemon-prison-break)
  - clone this repo
  - $`npm i` to install dependencies
  - $'npm run start'
  - open a browser and go to 'localhost:3000'
- from local folder:
  - unzip the files
  - change all files* with extension `.txt` to `.js`
  - navigate to this folder in your console / terminal
  - $`npm i` to install dependencies
  - $ `npm run start`
  - open a browser and go to 'localhost:3000'
- see only the app in the browser:
  - [Visit this link: (please be patient, I take a while to load)](pokemon-prison-break.herokuapp.com)


### Instructions
- The rules to the game are shown on the app landing page 😎
- If you want to cheat and know the words, they are always logged to the browser console 😉

### Things I want to do to this App next:
- WRITE TESTS!!! (Learn Selenium, and test front end. Use Mocha/Chai to test routes and data from the server.)
- Reactor and remove un-used modules.
- Make the difficulty settings dynamic and configurable by the player.
- Address react and material-ui errors that do not seem to affect the app currently but are still worrisome.
- Make a `hint` feature that either automatically kicks in when the player is on their last guess, or is a selectable event by the user.
- Improve design and feedback to user on success / fail / win / loss.
- Make the amount of pokemon that could be chosen dynamic so not all 803 forms are options for casual fans who may only know the big names or original 151 (including 'Mew').

*There are the files that need to be changed to have extension `.js`:
  - /webpack.config.txt
  - /src/app.txt
  - /src/main.txt
  - /src/reactRouter.txt
  - /src/view/LandingPage/LandingPage.txt
  - /src/view/LandingPage/PokeView.txt
  - /src/view/LandingPage/Rules.txt
  - /src/view/LandingPage/YouLost.txt
