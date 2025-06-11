# Simple Ping Pong Game

A basic Ping Pong game built with HTML, CSS, and JavaScript. Play solo against the computer or challenge a friend in two-player mode.

## Features

* **Single-player & Two-player Modes:** Choose to play against a computer-controlled opponent or a friend on the same device.  The single-player mode features a basic AI that attempts to follow the ball.
* **Theming:**  Customize the game's appearance with different themes.  Themes change the colors of the background, paddles, ball, and net.  Currently available themes include: Arcade, Synthwave, Matrix, Light, and Dark.
* **Mobile-Friendly Controls:**  Basic touch controls are provided for playing on mobile devices. Two virtual pads on the screen control the up and down movement of each paddle.
* **Sound Effects:** Immerse yourself in the game with sound effects for paddle hits, wall bounces, and scoring points. Sounds are played using the HTML5 Audio API.
* **Responsive Design:**  The game's canvas adapts to different screen sizes, ensuring a playable experience on various devices.
* **Pause & Reset Functionality:** Control the game flow with pause and reset buttons. Pause temporarily stops the game, while reset restarts the game from the beginning.

## How to Play

1. **Open `index.html`:** Launch the game by opening the `index.html` file in any modern web browser.

2. **Choose Game Mode (Main Menu):**
    * **1 PLAYER:** Play against the computer's AI.
    * **2 PLAYERS:** Play against a friend on the same device.

3. **Gameplay Controls:**
    * **Player 1 (Left Paddle):**
        * `W` key: Move paddle up.
        * `S` key: Move paddle down.
        * Mobile: Tap and hold the up/down buttons on the left touch control pad.
    * **Player 2 / AI (Right Paddle):**
        * `Up Arrow` key: Move paddle up (two-player mode only).
        * `Down Arrow` key: Move paddle down (two-player mode only).
        * Mobile: Tap and hold the up/down buttons on the right touch control pad.

    * **General Controls:**
        * `Spacebar`: Start the game initially or serve the ball after scoring a point.
        * `P` key: Pause or resume the game.

4. **Objective:** Hit the ball with your paddle and try to get it past your opponent's paddle.  Score a point when the ball goes beyond your opponent's paddle.


5. **Theming:** Select a theme by clicking the corresponding theme button at the top of the game screen.  The game will instantly update with the chosen visual style.