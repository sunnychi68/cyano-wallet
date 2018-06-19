import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { GlobalState } from './app/globalReducer';
import { lifecycle, reduxConnect, withState } from './compose';
import { setBalance } from './wallet/walletActions';
import { getBalance } from './wallet/walletApi';

interface State {
  timer: number;
}

const mapStateToProps = (state: GlobalState) => ({
  wallet: state.auth.wallet
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ setBalance }, dispatch);

const enhancer = (Component: React.ComponentType<{}>) => () => (
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions, getReduxProps) => (
    withState<State>({ timer: -1 }, (state, setState, getState) => (
      lifecycle({
        componentDidMount: () => {
          const timer = window.setInterval(async () => {
            
            const walletEncoded = getReduxProps().wallet;
            if (walletEncoded !== null) {
              const balance = await getBalance(walletEncoded);
              actions.setBalance(balance.ong, balance.ont);
            }
          }, 1000);

          setState({ ...state, timer });
        },

        componentWillUnmount: () => {
          window.clearInterval(getState().timer);
        }
      }, () => (
        <Component />
      ))
    ))
  ))
);

export const WalletChecker = enhancer(() => null);
