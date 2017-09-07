import React from 'react';
import HeadToHeadSelector from '../head-to-head-selector';
import { getPlayers } from '../../actions/players-action-creators';

class Home extends React.Component {

  static fetchData ({store}) {
    return store.dispatch(getPlayers());
  }
  
  render () {  
    return (
      <div>
        <h1>Tennis</h1>
        <HeadToHeadSelector />
      </div>
    );
  }
}

export default Home;
