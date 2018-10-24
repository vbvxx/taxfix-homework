import { Reducer } from "redux";
import { RatesActions, RatesActionTypes } from "./RatesActions";

export interface Rate {
  currency: string;
  rate: number;
}

export interface RatesState {
  time: string;
  base: string;
  rates: Rate[];
  errorMessage?: string;
  isFetching: boolean;
}

const defaultValue = {
  time: "",
  base: "",
  rates: [],
  errorMessage: undefined,
  isFetching: false
};

export const rates: Reducer<RatesState, RatesActions> = (
  state = defaultValue,
  action
) => {
  switch (action.type) {
    case RatesActionTypes.FETCH_RATES:
      return { ...state, isFetching: true };
    case RatesActionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        time: action.time,
        base: action.base,
        rates: action.rates,
        isFetching: false
      };
    case RatesActionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        errorMessage: action.err,
        isFetching: false
      };
    default:
      return state;
  }
};
