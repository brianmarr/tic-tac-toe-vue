
tic-tac-toe-vue

'''''''

Created by Brian Marr 
A basic tic-tac-toe game created for Abyss Solution's coding interview stage.
Uses Vue CLI 3 with the Vuetify.js plugin.
23/05/2019


'''''''

To run the final built version (recommended), do the following:
	1. Navigate to ./dist in a terminal
	2. Start a local http server with the following command:
		http-server
	3. Navigate to 'localhost:8080/index.html' (8080 should be the default port number - change if not) in your web browser, preferrably Chrome 
	4. Enjoy the game.


Follow the steps in README.md for instructions on project setup and compile + hot-reload for development. In short:
	1. Navigate to the project folder tic-tac-toe-vue/. in a command terminal
	2. Install the dependencies (held in the node_modules folder) with the following command:
		npm install
	3. To compile the project for development mode (not recommended; updates real time with changes to the source code, but overall unoptimised), run the following command:
		npm run serve
	4. Navigate to 'localhost:8080' (or other set port) in your web browser, again preferrably in Chrome.



'''''''

Source code for the game is included in ./src:
	- App.vue is the central vue node file
	- The components folder contains the separate components included in App.vue
	- The assets folder contains the various data used in the project as well as the implementation for the opponent AI api used (nothing fancy, it just makes moves at random)