## Twitter Store
===========

Web app that allows users to save favorite tweets.

##### How To Install :
1. Clone this repository in a folder.

2. In the folder server/config/environments are 3 files: development.js, production.js, testing.js. Adjust your configurations there
based on your environment. Testing is mandatory for running test, as grunt test will use those configs.

3. Run command "npm install" in that folder using git bash or cmd.
    (Must have node and npm installed on the machine as globals, npm install will run grunt install automatically after it,
     if it fails please run it manually)

4. Run some simple test by invoking grunt test command. (It requires grunt-cli to be installed as a global dependency)

5. Run command "node server.js" to start the server.

6. The server will now be running on ip and port based on the configuration of your environment in the config/environments.

IMPORTANT :
If you use 127.0.0.1 as your server IP in the config please access the server by IP in the browser and not localhost as this creates confusion with the callback from twitter for the authentication.
==========
Special thanks to https://bootswatch.com/paper/ for providing awesome material design theme under MIT license.