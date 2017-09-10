import fetch from 'node-fetch';

export const getPlayers = () => {
  
  return (dispatch, getState) => {
    return fetch('http://localhost:1980/players')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'UPDATE_PLAYERS',
          data
        })
      });
  }
}

export const updateHead2HeadResults = (player1, player2) => {

  return (dispatch, getState) => {
    return fetch(`http://localhost:1980/head-to-head/${player1}/${player2}`)
      .then(res => res.json())
      .then(data => {

        const { resultsList, resultsData } = transformResults(data);

        dispatch({
          type: 'UPDATE_HEAD_2_HEAD',
          results: resultsData,
          resultsIds: resultsList,
          player1,
          player2
        });
      })
      .catch(err => {
        console.log(err);
      }); 
  }
}

function transformResults (data) {

  const resultsList = [];
  const resultsData = [];

  data.map((item) => {
    resultsList.push(item.tennis.id);
    resultsData.push(item.tennis);
  });

  return {
    resultsList,
    resultsData
  }
}
