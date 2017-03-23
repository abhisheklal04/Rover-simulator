// (function(exports) {

    var RobotSimulation = function(boardX,boardY) {
        
        var _this = this;
        _this.Board = { x:boardX,y:boardY };        
        _this.Robot = { x:null, y:null, f:null };
        _this.Faces = { NORTH : 'NORTH', SOUTH : 'SOUTH', EAST: 'EAST', WEST: 'WEST' };
        _this.Rotations = { LEFT: 'LEFT', RIGHT: 'RIGHT' };
        
        _this.Instructions = {
                PLACE : '^PLACE (\\d+),(\\d+),(NORTH|SOUTH|EAST|WEST)\\b', 
                MOVE : 'MOVE', LEFT : 'LEFT', 
                RIGHT:'RIGHT', REPORT:'REPORT'
        };

        _this.RobotRotationStates = {
            LEFT : {
                NORTH : _this.Faces.WEST,
                SOUTH : _this.Faces.EAST,
                EAST : _this.Faces.NORTH,
                WEST : _this.Faces.SOUTH
            },

            RIGHT : {
                NORTH : _this.Faces.EAST,
                SOUTH : _this.Faces.WEST,
                EAST : _this.Faces.SOUTH,
                WEST : _this.Faces.NORTH
            }
        };
    }

    RobotSimulation.prototype.moveRobot = function(){

        var nextX = this.Robot.x;
        var nextY = this.Robot.y;

        switch(this.Robot.f) {
            case this.Faces.NORTH : nextY++; break;
            case this.Faces.SOUTH : nextY--; break;
            case this.Faces.EAST : nextX++; break;
            case this.Faces.WEST : nextX--; break;
            default : break;
        }

        if(this.isRobotInBounds(nextX,nextY)) {
            this.Robot.x = nextX;
            this.Robot.y = nextY;
        }
    };

    RobotSimulation.prototype.isRobotInBounds = function(x,y){
        if(0<=x && x<=this.Board.x && 0<=y && y<=this.Board.y) {
            return true;
        }
        else {
            return false;
        }
    };

    RobotSimulation.prototype.rotateRobot = function(rotation){
        this.Robot.f = this.RobotRotationStates[rotation][this.Robot.f];
    };

    RobotSimulation.prototype.placeRobot = function(place){
        
        var param =  place.match(this.Instructions.PLACE);        
        var nextX = param[1];
        var nextY = param[2];
        var nextF = param[3];

        if(this.isRobotInBounds(nextX,nextY)) {
            this.Robot.x = nextX;
            this.Robot.y = nextY;
            this.Robot.f = nextF;
        }
    };

    RobotSimulation.prototype.report = function(){
        if(this.Robot.x !=null && this.Robot.y != null && this.Robot.f !=null)
            return this.Robot.x + ',' + this.Robot.y + ',' + this.Robot.f;        
        else 
            return null;
    }

    RobotSimulation.prototype.runInstructions = function(commands) {
       
        var output = '';
        var _this = this;

         try {
            commands.forEach(function(command){
                if(new RegExp(_this.Instructions.PLACE).test(command)) {               
                    //console.log('place');
                    _this.placeRobot(command);
                }
                else if(command == _this.Instructions.LEFT || command == _this.Instructions.RIGHT) {
                    //console.log('rotate');
                    _this.rotateRobot(command);
                }
                else if(command == _this.Instructions.MOVE) {
                    //console.log('move');
                    _this.moveRobot();
                }
                else if(command == _this.Instructions.REPORT) {
                    //console.log('report');
                    var report = _this.report();
                    if(report != null) {                    
                        output = output + '\n' + report;
                    }
                }
            });
         }
         catch(err) {
             console.log(err);
         }

        return output;
    }

module.exports = RobotSimulation; 
