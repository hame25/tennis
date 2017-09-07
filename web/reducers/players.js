const players = (state = { players: [] }, action) => {
  switch(action.type) {
    case 'UPDATE_PLAYERS':
      return Object.assign({}, state, {
        players: action.data
      });
    default:
      return state
  }
}

export default players;

export const getPlayers = (state) => {
  return state.players;
}
