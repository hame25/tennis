import React from 'react';
import Result from '../result';

class ResultsList extends React.Component {

  render () {  
    return (
      <div>
        <h2>Results</h2>
        <table>
          <tr>
            <th>Winner</th><th></th><th>Loser</th><th>Score</th><th>Location</th>
          </tr>
          { 
            this.props.results.map((result) => {
              return (<Result id={result} />);
            }) 
          }
        </table>
      </div>
    );
  }
}

export default ResultsList;
