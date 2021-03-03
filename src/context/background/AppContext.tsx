import { createContext } from "react";
import { Transaction } from "../../services/TransactionsService";
import { IAppState } from "./AppState";

type ContextType = {
  state: IAppState;
  addTransaction: (transaction: Transaction) => void;
  setState: (state: Partial<IAppState>) => void;
};

const initAppState: IAppState = {
  transactions: [],
  newTx: false,
  successTx: false,
  publicAddress: "",
  accountBalance: 0,
  ethPrice: 0,
};

const AppContext: React.Context<ContextType> = createContext<ContextType>({
  state: initAppState,
  addTransaction: () => {},
  setState: () => {},
});

export default AppContext;
