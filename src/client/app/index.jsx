import React from 'react';
import {render} from 'react-dom';
import RobotApp from './RobotApp.jsx';

class App extends React.Component {
  render () {
    return (                   
      <RobotApp />      
    );
  }
}

render(<App/>, document.getElementById('app'));
