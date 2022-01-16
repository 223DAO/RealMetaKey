import types from './actionTypes';

export function metamaskAccount(walletAddress) {
  return dispatch => {
    dispatch({
      type: types.METAMASK_ACCOUNT,
      walletAddress
    })
  }
}
