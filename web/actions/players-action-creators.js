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

    const p1 = player1 ? player1 : getState().player1;
    const p2 = player2 ? player2 : getState().player2;

    return fetch(`http://localhost:1980/head-to-head/${p1}/${p2}`, { mode: 'no-cors' })
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

export const updateSelectedPlayers = (player1, player2) => ({
    type: 'UPDATE_SELECTED_PLAYERS',
    player1,
    player2
});

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
