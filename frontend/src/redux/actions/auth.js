import types from './actionTypes';

export function signIn(hasLogin, walletAddress) {
	return dispatch => {
		dispatch({
			type: types.HAS_LOGIN,
			hasLogin,
			walletAddress
		})
	}
}

export function logOut(hasLogin, walletAddress) {
	return dispatch => {
		dispatch({
			type: types.LOG_OUT,
			hasLogin,
			walletAddress
		})
	}
}