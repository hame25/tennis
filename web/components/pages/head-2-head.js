import React from 'react';
import { connect } from 'react-redux';
import { updateHead2HeadResults } from '../../actions/players-action-creators';
import { getHead2HeadPlayers, getHead2HeadResults } from '../../reducers/players';
import ResultsList from '../results-list';

const mapStateToProps = state => ({
  players: getHead2HeadPlayers(state),
  results: getHead2HeadResults(state)
})

class Head2Head extends React.Component {

  constructor() {
    super();
  }

  static fetchData ({store, params}) {

    const { player1, player2 } = params;

    return store.dispatch(updateHead2HeadResults(player1, player2));
  }

  componentDidMount() {
    this.props.updateHead2HeadResults(this.props.players.player1, this.props.players.player2)
  }
  
  render () { 
    return (
      <div>
        <h1>{`Head 2 Head: ${this.props.players.player1} v ${this.props.players.player2}`}</h1>
        <ResultsList results={this.props.results} />
      </div>
    );
  }
}

export default connect(mapStateToProps, { updateHead2HeadResults })(Head2Head);
