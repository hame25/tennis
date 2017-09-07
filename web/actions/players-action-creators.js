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
