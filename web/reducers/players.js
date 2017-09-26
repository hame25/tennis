const players = (state = { players: [] }, action) => {
  switch(action.type) {
    case 'UPDATE_PLAYERS':
      return Object.assign({}, state, {
        players: action.data
      });
    case 'UPDATE_HEAD_2_HEAD':
      return Object.assign({}, state, {
        player1: action.player1,
        player2: action.player2,
        head2HeadResults: action.results,
        head2HeadResultsIds: action.resultsIds
      })
    case 'UPDATE_SELECTED_PLAYERS':
      return Object.assign({}, state, {
        player1: action.player1,
        player2: action.player2
      })
    default:
      return state
  }
}

export default players;

export const getPlayers = state => state.players;

export const getHead2HeadPlayers = (state) => ({
  player1: state.player1,
  player2: state.player2
});

export const getHead2HeadResults = state => state.head2HeadResultsIds;

export const getResult = (state, id) => {
  return state.head2HeadResults.find(item => item.id === id);
}
