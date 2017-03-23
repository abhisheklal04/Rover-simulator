
import React from 'react';
import RobotSimulation from './robot.js';

    var Banner = React.createClass({
      render: function(){
        return (
          <div className="jumbotron">
            <h2>Rover Simulation</h2>
            <h3>Instructions</h3>
            <p>PLACE X,Y,FACE : Places a robot on 5x5 matrix facing (NORTH|SOUTH|EAST|WEST)</p>
            <p>LEFT | RIGHT : Rotates the robot 90 degrees Left or Right</p>  
            <p>MOVE : Moves the robot forward by 1 coordinate in its direction</p>
            <p>REPORT : Prints Position of robot</p>
            <p>Invalid and out of bound commands will be ignored</p>         
          </div>        
        );
      }
    });
    
    var OutScreen = React.createClass({
      render: function() {
        
        var outputItem = function(item){
          return (<p>{item}</p>);
        }   

        return (
              <div className="col-md-4 well">
                OUTPUT
                {this.props.items.split('\n').map(outputItem)}
              </div>
              );
      }
    });

    var Instructions = React.createClass({
      getInitialState: function() {
        return {
            item: ''            
          };
        },
      handleSubmit: function(e){
        e.preventDefault();
        this.props.onFormSubmit(this.state.item);
        this.setState({item: ''});        
        return;
      },
      onChange: function(e){
        this.setState({
          item: e.target.value
        });
      },
      render: function(){
        return (
          <div className="col-md-8">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <div className="col-md-9">
                <textarea className="form-control" placeholder="Instructions" rows={7} ref='item' onChange={this.onChange} value={this.state.item}/>
              </div>
              <div className="col-md-3">
                <input className="btn btn-lg btn-success" type='submit' value='Submit'/>
              </div>
            </form>
          </div>
        );
      }
    });		

    var RobotApp = React.createClass({
      getInitialState: function() {
        return {
            robot : new RobotSimulation(5,5),
            output : ''
        };        
      },
      updateItems: function(newItem) {       
        var instructions = newItem.split('\n');        
        this.setState({          
          output : this.state.robot.runInstructions(instructions)
        });
      },

      render: function() {
        return (
            <div>
            <Banner/>        
            <Instructions onFormSubmit={this.updateItems}/>
            <OutScreen items={this.state.output}/>
            </div>
        );
      }
    });

export default RobotApp;