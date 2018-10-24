import { Reducer } from "redux";
import { RatesActions, RatesActionTypes } from "./RatesActions";

export interface Rate {
  currency: string;
  rate: number;
}

export interface RatesState {
  time?: Date;
  base: string;
  rates: Rate[];
  errorMessage?: string;
}

const defaultValue = {
  time: undefined,
  base: "",
  rates: [],
  errorMessage: undefined
};

export const rates: Reducer<RatesState, RatesActions> = (
  state = defaultValue,
  action
) => {
  switch (action.type) {
    case RatesActionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        time: action.time,
        base: action.base,
        rates: action.rates
      };
    case RatesActionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        errorMessage: action.err
      };
    default:
      return state;
  }
};
