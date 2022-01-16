import events from "events";
import { EventEmitter } from "stream";

// supress ts warnings for window.ethereum
declare let window: any;

/**
 * Usage:
 *
 * The connect and disconnect event here means mematask connected to current site.
 * The connect and disconnect event in metamask means metamask connected to a chain.
 * They are different.
 *
 * I haven't find any API to get the if mematask connected to current site.
 * So the app need to store the state in localStorage.
 *
 * // check if metamask installed
 * if (!metamask.hasInstalled()) {
 *   // metamask is not installed
 * }
 *
 * // set account change listener to received user connect/switched/disconnect account event
 * metamask.addListener('account', console.log)
 *
 * // remove account change listener when unmount
 * metamask.removeListener('account', console.log)
 *
 * // connect when page loaded or user clicked connect button
 * try {
 *   // get account through return value or account change listener
 *   string account = await metamask.connect()
 * } catch(e) {
 *   window.alert(e.message)
 * }
 */
export class MetaMask {

  account: string | undefined = undefined
  eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new events.EventEmitter()
    this._handleConnect = this._handleConnect.bind(this)
    this._handleDisconnect = this._handleDisconnect.bind(this)
    this._handleAccountsChanged = this._handleAccountsChanged.bind(this)
    // add listener
    //  * The connect and disconnect event here means connected to this site.
    //  * The connect and disconnect event in metamask means metamask connected to a chain.
    //  * They are different.
    // window.ethereum.on('connect', this._handleConnect)
    // window.ethereum.on('disconnect', this._handleDisconnect)
    window.ethereum.on('accountsChanged', this._handleAccountsChanged)
  }

  /**
   * event: 'account', 'connect', 'disconnect'
   * listener: function(account) {}
   */
  addListener(event: string, listener: (account: string) => void) {
    this.eventEmitter.addListener(event, listener)
  }

  removeListener(event: string, listener: (account: string) => void) {
    this.eventEmitter.removeListener(event, listener)
  }

  hasInstalled() {
    return Boolean(window.ethereum)
  }

  private async _requestAccount() {
    // request accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return accounts && accounts[0] || undefined
  }

  private async _requestAccountAndNotify() {
    const account = await this._requestAccount();
    this._notifyAccount(account);
    return account
  }

  /**
   * @returns account from metamask
   * @throws error message
   */
  async connect() {
    if (window.ethereum) {
      try {
        const account = await this._requestAccountAndNotify()
        // user disallow connection or connect failed
        if (!account) {
          throw Error('Connect MetaMask failed')
        }
        return account
      } catch (e) {
        console.error('MetaMask read account failed', e)
        throw Error('MetaMask read account failed')
      }
    } else {
      console.error('MetaMask is not installed')
      throw Error('MetaMask is not installed')
    }
  }

  isConnected() {
    return Boolean(this.account)
  }

  disconnect() {
    this.account = undefined
    this._handleDisconnect()
  }

  getNetworkId(): string {
    const network = window.ethereum?.networkVersion || undefined
    // console.log('network', network, typeof network)
    return network
  }

  private _handleConnect() {
    // console.log('connect event')
    this.eventEmitter.emit('connect', this.account)
  }

  private _handleDisconnect() {
    // console.log('disconnect event')
    this.eventEmitter.emit('account', undefined)
    this.eventEmitter.emit('disconnect', undefined)
  }

  /**
   * this method will be called when connect or switch account in MetaMask
   */
  private _handleAccountsChanged(accounts: string[]) {
    console.log('accountsChanged event')
    const newAccount = accounts && accounts[0] || undefined;

    if (!newAccount) {
      console.warn('user disconnected account to this site or read account failed');
    }

    this._notifyAccount(newAccount)
  }

  private _notifyAccount(newAccount: string | undefined) {
    if (newAccount !== this.account) {
      this.account = newAccount
      this.eventEmitter.emit('account', newAccount)
    }
    return newAccount
  }
}

export const metamask = new MetaMask()
