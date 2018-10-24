import { createStore, applyMiddleware, combineReducers } from "redux";
import { CurrencyState, currency } from "./currency/CurrencyReducer";
import { CurrencyActions } from "./currency/CurrencyActions";
import { fetchRateEpic } from "./currency/CurrencyEpics";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { SearchState, search } from "./search/SearchReducer";
import { SearchActions } from "./search/SearchActions";

export type RootActions = CurrencyActions | SearchActions;

// Root reducer

export interface RootState {
  currency: CurrencyState;
  search: SearchState;
}

const rootReducer = combineReducers({ currency, search });

// Root epic

const rootEpic = combineEpics<RootActions, RootActions, RootState, {}>(
  fetchRateEpic
);

// NOTE: As soon as root reducer / root epic grows, they should be instantiated in different files

const epicMiddleware = createEpicMiddleware<
  RootActions,
  RootActions,
  RootState,
  {}
>();

const store = createStore<RootState, RootActions, {}, {}>(
  rootReducer,
  applyMiddleware(epicMiddleware)
);
epicMiddleware.run(rootEpic);

export default store;
