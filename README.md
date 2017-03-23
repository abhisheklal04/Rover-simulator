# ROVER SIMULATOR
Simulate a rover on 5x5 matrix
The web application feeds the instructions to the robot to simulate its position.

### Tools : React, Mocha, Chai, Webpack, Node, Express, Bootstrap, HTML, CSS.

#### Instructions:
  1. PLACE X,Y,FACE : Places a robot on 5x5 matrix facing (NORTH|SOUTH|EAST|WEST)   
  2. LEFT | RIGHT : Rotates the robot 90 degrees Left or Right.
  3. MOVE : Moves the robot forward by 1 coordinate in its direction.
  4. REPORT : Prints position of robot
  5. Invalid and out of bound commands will be ignored
  6. Multiple commands can be given in each new line

#### Sample Instructions
```
PLACE 1,2,NORTH
MOVE
LEFT
MOVE
REPORT
```

#### Output
```
0,3,WEST
```


### Install Instructions
To Deploy this application on your side, follow the guidelines given below.
  1. Fork or download the repository
  2. install node js, npm
  3. install bower, run command: *npm install -g bower* 
  4. Install npm dependencies, run command: *npm install*
  5. Install bower dependencies, run command: *bower install*
  6. Unit test with Mocha with command: *npm test*
  7. run application server with command: *npm start*
