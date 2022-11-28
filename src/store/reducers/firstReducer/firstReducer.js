const firstReducer = (state, action) => {
  switch (action.type) {
    case 'X1':
      return { refreshing: true }
    case 'X2':
      return { refreshing: false }
    default:
      return state
  }
}

export default firstReducer;