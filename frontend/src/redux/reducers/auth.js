import types from '../actions/actionTypes';

let defaultState = {
  	hasLogin: false,
	walletAddress: ''
}

const authCheck = (state = defaultState, action) => {
	switch (action.type) {
		case types.HAS_LOGIN:
			const { hasLogin, walletAddress } = action;

			return Object.assign({}, state, { hasLogin, walletAddress });
		case types.LOG_OUT:

			return Object.assign({}, state, action);
		default:
			return state;
	}
}

export default authCheck;
