var chai = require('chai');
var assert = chai.assert;
var should = chai.should();

var RobotSimulation = require('../app/robot.js');

describe('Robot : Check simulation', () => {

    var robot;

    before(function() {
        // runs before all tests in this block
        robot = new RobotSimulation(5,5);
    });

    it('should initialize board with size 5x5', (done) => {
       
       robot.should.be.a('object');
       robot.should.have.property('Board');
       robot.Board.should.have.property('x').equal(5);        
        done();
    });

    it('should not place a robot out of bounds', (done) => {
       
       robot.runInstructions(['PLACE 6,0,NORTH','REPORT']).trim().should.equal('');
       robot.runInstructions(['PLACE -1,0,EAST','REPORT']).trim().should.equal('');
       robot.runInstructions(['PLACE -1,-1,WEST','REPORT']).trim().should.equal('');
       robot.runInstructions(['PLACE 2,3,WESTTT','REPORT']).trim().should.equal('');
       robot.runInstructions([' PLACE 0,0,NORTH','REPORT']).trim().should.equal('');       
        done();
    });

    it('should not move a robot out of bounds', (done) => {
       
       robot.runInstructions(['PLACE 4,0,EAST','MOVE','MOVE','REPORT']).trim().should.equal('5,0,EAST');
       robot.runInstructions(['PLACE 0,0,EAST','LEFT','LEFT','MOVE','REPORT']).trim().should.equal('0,0,WEST');
       robot.runInstructions(['PLACE 5,5,NORTH','MOVE','MOVE','RIGHT','REPORT']).trim().should.equal('5,5,EAST');    
        done();
    });
    
    it('should place a robot at (0,1) NORTH', (done) => {
       
       robot.runInstructions(['PLACE 0,0,NORTH','MOVE','REPORT'])
        .trim().should.equal('0,1,NORTH');
       done();
    });

     it('should place a robot at (0,0) WEST', (done) => {
       
       robot.runInstructions(['PLACE 0,0,NORTH','LEFT','REPORT'])
        .trim().should.equal('0,0,WEST');
        done();
    });

     it('should place a robot at (3,3) NORTH', (done) => {
       
       robot.runInstructions(['PLACE 1,2,EAST','MOVE','MOVE','LEFT','MOVE','REPORT'])
        .trim().should.equal('3,3,NORTH');
        done();
    });
});