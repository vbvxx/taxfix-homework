import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import { CurrencyState, rates } from "./currency/CurrencyReducer";
import { CurrencyActions } from "./currency/CurrencyActions";
import { fetchRateEpic } from "./currency/CurrencyEpics";
import { createEpicMiddleware, combineEpics } from "redux-observable";

export type RootActions = CurrencyActions;

// Root reducer

export interface RootState {
  rates: CurrencyState;
}

const rootReducer = combineReducers({ rates });

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
