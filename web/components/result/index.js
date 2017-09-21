import React from 'react';
import { connect } from 'react-redux';
import { getResult, /*getResultScore*/ } from '../../reducers/players';

const mapStateToProps = (state, ownProps) => ({
  result: getResult(state, ownProps.id),
  //score: getResultScore(state, ownProps.id)
});

class Result extends React.Component {
  
  //this should be a selector
  getScore (scores) {
    let score = ''
    let i = 1;
    for(i; i < 6; i++) {
      if(parseInt(scores['W'+i])) {
        if(i > 1) {
          score += ', ';
        }

        score += `${parseInt(scores['W'+i])}-${parseInt(scores['L'+i])}`
      }
    }

    return score;
  }

  filterResultData ({W1, W2, W3, W4, W5, L1, L2, L3, L4, L5}) { 
    return ({W1, W2, W3, W4, W5, L1, L2, L3, L4, L5}) 
  }

  render () {
    const result = this.props.result;
    const score = this.getScore(this.filterResultData(result))

    return (
      <tr>
        <td>{result.Winner}</td><td>beat</td><td>{result.Loser}</td><td>{score}</td><td>{result.Location}</td>
      </tr>
    );
  }
}

export default connect(mapStateToProps)(Result);
