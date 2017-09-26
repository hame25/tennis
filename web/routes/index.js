import { Router, Route} from 'react-router'
import React from "react";
import Home from '../components/pages/home';
import Head2Head from '../components/pages/head-2-head';

export default function(history, renderProps) {
  return (
    <Router history={history} {...renderProps} >
      <Route path="/" component={Home} />
      <Route path="/head-2-head/:player1/:player2" component={Head2Head}/>
    </Router>
  )
}
