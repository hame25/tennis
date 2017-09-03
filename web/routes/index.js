import { Router, Route} from 'react-router'
import React from "react";
import Players from '../components/pages/players';

export default function(history, renderProps) {
  return (
    <Router history={history} {...renderProps} >
      <Route path="players" component={Players} />
    </Router>
  )
}
