# TIC-TAC-TOE Bolt

### Video Demo: <link>

### Description:

##### INTRO

The Bolt version of the Tic-Tac-Toe game eliminates the possibility of ties. In this project, I developed a two-player mode and a computer opponent. I implemented an artificial intelligence using the minimax algorithm. Also, the game offers various color palettes for customization based on thematic preferences.

##### GOALS OF THE PROJECT

The objective of this project is to develop an AI capable of playing Tic-Tac-Toe according to the Bolt rules. These additional rules prevent the game from resulting in a tie. Here’s how it works: each mark you place has a lifespan that decreases with each turn. You can observe this effect when the fourth mark is placed. When you do so, the oldest mark goes to a state of vanishing, and then completely disappears on the next turn. This rule ensures that the grid never becomes full, thereby eliminating the possibility of ties.

Other key features that will enhance the game include a two-player mode, a visually appealing user interface with animations and sound effects, and a variety of theme palettes that allow you to personalize your game’s appearance.

##### CHALLENGES

When I built the AI, I decided to use the most widely known algorithm used in this type of decision-making game, the minimax algorithm. However, I had to consider that applying the bolt rules to the algorithm would require setting a depth limit when starting to explore the tree. This is because the no-tie rule could lead to an infinite loop, resulting in a scenario where the game continues indefinitely. Why does this happen? The minimax algorithm evaluates every possible future scenario and determines the most optimal move by assigning a score to each route it takes. The route with the highest score is considered the best move that the computer can execute.

The first solution was to add a depth limit to impose a constraint on how far the search can go. The second solution (the one I chose) was to disregard the rule and allow the AI to play the standard Tic-Tac-Toe game. Why would I still work with this approach? Because the algorithm is executed every turn, taking the exact board state as new and searching from that point.

To enhance this approach, I introduced a third mark state. In my case, it is represented by “empty,” “mark,” and “dead.” The “dead” state indicates that the mark is about to disappear next turn but does not count as a “mark” to win by connecting three marks. As the name suggests, a “dead” mark blocks the cell for that turn. Once this effect is incorporated into the minimax algorithm, the AI will no longer attempt to play where the “dead” mark is or consider it a winnable scenario.

The last challenge I faced was to make my code the most readable and organized due to the numerous state changes in the game. Even though I’m using the Vue.js framework, I implemented a store similar to the Redux or Zustand pattern. In this pattern, you only modify the data using the methods created, rather than mutating it from different file sources. This approach ensures that my lib directory, which contains my stores, holds the data and its manipulation methods.

##### SCRIPTS FUNCTIONS

The game is built with Vue.js and Vue.js Router to change the path of the pages as a Single Page Application.

The three main routes are the home view, the player vs player view and the player vs computer view.

The lib folder contains TypeScript files that hold the stores I mentioned earlier. These files allocate all the data and functions that need to be executed by the views. The scripts are organized based on the game’s logic, board state, computer AI, sound, theme palettes, animations, and some utility functions.

The components directory contains Vue files that provide a compact way to reuse UI elements.

Lastly, the view directory contains the three Vue files that render each page of the game.

##### AI OPTIMIZATION

I encountered a scenario where the AI initiates the game first, resulting in a noticeable lag with a 3 second delay in the browser. This occurs because the AI must calculate all potential moves in a tic-tac-toe game since it starts with an empty board. To address this issue, I implemented the alpha beta prune algorithm into my minimax algorithm. Essentially, this algorithm eliminates future possibilities if the AI already possesses a superior path with a higher score. If this condition is met, the AI halts exploration of that path and proceeds to the next one, thereby significantly speeding up the overall search process.

##### ADDITIONAL

For the player vs. computer mode, I’ve also implemented three difficulty levels that can be adjusted in the settings menu. The difficulty level is determined by adding a percentage chance of making the best move (minimax) or a simple random move. The easy mode has a higher probability of making a bad random move compared to the best move. As the difficulty level increases, the probability of making a random move decreases, and the computer almost always plays the best move.

I created the theme palette by assigning a specific name to each color based on its intended purpose. For each color name, I created an object containing the corresponding color values. I then passed this object as a CSS variable that utilizes the TailwindCSS library. This variable allows me to dynamically change the TailwindCSS library’s configuration based on the selected option.

For the animations, I used the Vue version of the motion library.

I also added some settings options for the sound and game difficulty to the menu settings where you select the color palette. These settings are stored locally in the browser using the Web Storage API.
