import events from "events";
import { EventEmitter } from "stream";

// supress ts warnings for window.ethereum
declare let window: any;

interface AccountChangeListener {
  onAccountChanged(account: string | undefined): void
}

/**
 * Usage:
 *
 * // check if metamask installed
 * if (!MetaMask.hasInstalled()) {
 *   // metamask is not installed
 * }
 *
 * // set account change listener to received user connect/switched/disconnect account event in metamask
 * MetaMask.setAccountChangeListener()
 *
 * // connect when page loaded or user clicked connect button
 * try {
 *   // get account through return value or account change listener
 *   string account = await MetaMask.connect()
 * } catch(e) {
 *   window.alert(e.message)
 * }
 *
 * // don't forget to disconnect when component destroyed
 * MetaMask.disconnect()
 */
export class MetaMask {

  account: string | undefined = undefined
  listener: AccountChangeListener | undefined
  eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new events.EventEmitter()
    this._handleMetaMaskAccounts = this._handleMetaMaskAccounts.bind(this)
  }

  /**
   * event: 'connect', 'account'
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

  /**
   * @returns account from metamask
   * @throws error message
   */
  async connect() {
    if (window.ethereum) {
      try {
        // remove previous listener if exists
        window.ethereum.removeListener('accountsChanged', this._handleMetaMaskAccounts)
        // request accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        this._handleMetaMaskAccounts(accounts)
        // add listener
        window.ethereum.on('accountsChanged', this._handleMetaMaskAccounts)
        // user disallow connection or connect failed
        if (!this.account) {
          throw Error('Connect MetaMask failed')
        }
        this.eventEmitter.emit('connect', this.account)
        return this.account
      } catch (e) {
        console.error('MetaMask read account failed', e)
        throw Error('MetaMask read account failed')
      }
    } else {
      console.error('MetaMask is not installed')
      throw Error('MetaMask is not installed')
    }
  }

  disconnect() {
    this.account = undefined
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this._handleMetaMaskAccounts)
    }
  }

  getAccount() {
    return this.account
  }

  isConnected() {
    return Boolean(this.account)
  }

  getNetworkId(): string {
    const network = window.ethereum?.networkVersion || undefined
    // console.log('network', network, typeof network)
    return network
  }

  /**
   * this method will be called when connect or switch account in MetaMask
   */
  private _handleMetaMaskAccounts(accounts: string[]) {
    const newAccount = accounts && accounts[0] || undefined;

    if (!newAccount) {
      console.warn('user disconnected account or read account failed');
    }

    if (newAccount !== this.account) {
      this.account = newAccount
      this.eventEmitter.emit('account', newAccount)
    }
    return newAccount
  }
}

export const metamask = new MetaMask()
