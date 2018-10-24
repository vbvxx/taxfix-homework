import { Reducer } from "redux";
import { RatesActions, RatesActionTypes } from "./RatesActions";
import { StateObservable } from "redux-observable";

export interface Rate {
  currency: string;
  rate: number;
}

export interface RatesState {
  time: string;
  baseCurrency: string;
  baseAmount: number;
  rates: Rate[];
  errorMessage?: string;
  isFetching: boolean;
  selectedCurrency: string;
}

const defaultValue = {
  time: "",
  baseCurrency: "USD",
  baseAmount: 1,
  rates: [],
  errorMessage: undefined,
  isFetching: false,
  selectedCurrency: "JPY"
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
        baseCurrency: action.base,
        rates: action.rates,
        isFetching: false
      };
    case RatesActionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        errorMessage: action.err,
        isFetching: false
      };
    case RatesActionTypes.UPDATE_BASE_AMOUNT:
      return {
        ...state,
        baseAmount: action.amount
      };
    default:
      return state;
  }
};

export const getConvertedAmount = (state: RatesState): number => {
  console.log(state);
  if (state.rates.length > 0) {
    const targetRate = state.rates.filter(
      elem => elem.currency === state.selectedCurrency
    )[0].rate;
    console.log(targetRate);
    console.log(state.rates);
    const baseRate = state.rates.filter(
      elem => elem.currency === state.baseCurrency
    )[0].rate;
    console.log(baseRate);

    const convertedAmount = state.baseAmount * (baseRate / targetRate);

    return convertedAmount;
  } else {
    return 0;
  }
};

export const getBaseRate = (state: RatesState): Rate | undefined => {
  if (state.rates.length > 0) {
    return state.rates.filter(elem => elem.currency === state.baseCurrency)[0];
  }
  return undefined;
};

export const getSelectedRate = (state: RatesState): Rate | undefined => {
  if (state.rates.length > 0) {
    return state.rates.filter(
      elem => elem.currency === state.selectedCurrency
    )[0];
  }
  return undefined;
};
