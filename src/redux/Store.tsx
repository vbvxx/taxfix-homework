import { createStore, applyMiddleware, combineReducers, Reducer } from "redux";
import { RatesState, rates } from "./currency/RatesReducer";
import { RatesActions } from "./currency/RatesActions";
import { fetchRateEpic } from "../redux/currency/RatesEpics";
import { createEpicMiddleware, combineEpics } from "redux-observable";

export type RootActions = RatesActions;

// Root reducer

export interface RootState {
  rates: RatesState;
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
