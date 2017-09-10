import React from 'react';
import Select from '../shared/select';
import { connect } from 'react-redux';
import { getPlayers } from '../../reducers/players';

const mapStateToProps = state => ({
  players: getPlayers(state)
})

class HeadToHeadSelector extends React.Component {

  render () { 
    return (
      <div>
        <form action='/head-2-head' method='POST'>
          <Select 
            label='Player 1'
            id='player1'
            options={this.props.players}
          />
          <Select 
            label='Player 2'
            id='player2'
            options={this.props.players}
          />
          <button type='submit'>Find results</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(HeadToHeadSelector);
