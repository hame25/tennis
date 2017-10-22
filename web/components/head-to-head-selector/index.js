import React from 'react';
import Select from '../shared/select';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getPlayers } from '../../reducers/players';
import { getPlayers as getAllPlayers, updateSelectedPlayers } from '../../actions/players-action-creators';

const mapStateToProps = state => ({
  players: getPlayers(state)
})

class HeadToHeadSelector extends React.Component {

  constructor() {
    super()

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(!this.props.players) {
      this.props.getAllPlayers();
    }
  }

  onChange(id) {
    return (e) => {
      const update = {
        [id]: e.target.value
      }

      this.setState(update);
    } 
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateSelectedPlayers(this.state.player1, this.state.player2)
    
    browserHistory.push(`/head-2-head/${this.state.player1}/${this.state.player2}`);
  }

  render () { 
    return (
      <div>
        <form 
          action='/head-2-head' 
          method='POST'
          onSubmit={this.onSubmit}
          >
          <Select 
            label='Player 1'
            id='player1'
            options={this.props.players}
            onChange={this.onChange('player1')}
            key="1"
          />
          <Select 
            label='Player 2'
            id='player2'
            options={this.props.players}
            onChange={this.onChange('player2')}
            key="2"
          />
          <button type='submit'>Find results</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, { getAllPlayers, updateSelectedPlayers })(HeadToHeadSelector);
