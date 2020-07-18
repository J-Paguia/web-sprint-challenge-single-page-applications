import React from "react";
import Nav from './Nav'
import Help from './Help'
import Home from './Home'
import Form from './Form'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App(){
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route  path='/'exact component={Home} />
          <Route path='/form' component={Form} />
          <Route path ='/help' component={Help} />
        </Switch>
        
      </div>
    </Router>
  );
};
export default App;
