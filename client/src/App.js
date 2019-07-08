import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import axios from 'axios';
import './App.css';
import Navbar from './Components/Navbar';
import Board from './Components/Board';
import Meetups from './Components/Meetups';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
      render(){
        return(
          <Router>
            <Navbar/>
            <Route exact path ="/" component = {Board}/>
            <Route path ="/meetups" component = {Meetups}/>
          </Router>
        )
      }
}

export default App;
