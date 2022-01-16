import types from '../actions/actionTypes';

let defaultState = {
  walletAddress: ''
}

const authCheck = (state = defaultState, action) => {
  switch (action.type) {
    case types.METAMASK_ACCOUNT:
      const { walletAddress } = action;
      return Object.assign({}, state, { walletAddress });

    default:
      return state;
  }
}

export default authCheck;
