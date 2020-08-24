import React from 'react';
// import image from '../public/images/shekharlol.jpg'
import classes from './App.module.css'
import { Route } from 'react-router'
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ProfileCard from './components/ProfileCard/ProfileCard';

class App extends React.Component{
  render(){
    return(
      <div className={classes.Container}>
      {/* <Login /> */}
      {/* <ProfileCard /> */}
        <Route exact path="/login"  component={Login} />
        <Route exact path="/signup"  component={Signup} />
        <Route exact path="/"  component={ProfileCard} />
      </div>
    )
  }
}

export default App;
