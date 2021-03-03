import React, { useReducer, useEffect } from "react";
import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import Actions from "../contextActions";
import { Transaction, TransactionsService } from "services/TransactionsService";
import defaultValue from "utils/constants";

export interface IAppState {
  transactions: Array<Transaction>;
  publicAddress: string;
  accountBalance: number;
  ethPrice: number;
  newTx: boolean;
  successTx: boolean;
}

export const initAppState: IAppState = {
  transactions: [],
  newTx: false,
  successTx: false,
  publicAddress: "",
  accountBalance: 0,
  ethPrice: 0,
};

const transactions = Object.entries(defaultValue.pastTransactions).map(
  (e: any) => {
    return {
      id: e[0] as number,
      to: e[1].recepient as string,
      amount: e[1].amount as number,
      date: e[1].date as string,
      from: defaultValue.publicAddress as string,
    };
  }
);
const txService = new TransactionsService({ transactions });

const AppState = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initAppState);

  useEffect(() => {
    const fetchData = async () => {
      const txs = await txService.getListOfTransactions();
      setState({
        transactions: txs,
        publicAddress: defaultValue.publicAddress,
        accountBalance: defaultValue.accountBalance,
        ethPrice: defaultValue.ethPrice,
      });
    };
    fetchData();
  }, []);

  // Set app state
  const setState = (newState: Partial<IAppState>) => {
    dispatch({
      type: Actions.SET_STATE,
      payload: newState,
    });
  };

  // TODO: Complete the addTransaction method
  const addTransaction = async (transaction: Transaction) => {
    await txService.addTransaction(transaction);
    setState({
      transactions: [...state.transactions, transaction],
      accountBalance: parseFloat(
        (state.accountBalance - transaction.amount).toFixed(3)
      ),
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        addTransaction,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
