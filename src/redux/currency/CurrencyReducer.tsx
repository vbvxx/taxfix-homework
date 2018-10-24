import { Reducer } from "redux";
import { CurrencyActions, RatesActionTypes } from "./CurrencyActions";

export interface Rate {
  currency: string;
  rate: number;
}

export interface CurrencyState {
  time: string;
  baseCurrency: string;
  baseCurrencyAmount: number;
  selectedCurrency: string;
  rates: Rate[];
  errorMessage?: string;
  isFetching: boolean;
}

const defaultValue = {
  time: "",
  baseCurrency: "EUR",
  baseCurrencyAmount: 1,
  selectedCurrency: "USD",
  rates: [],
  errorMessage: undefined,
  isFetching: false
};

export const rates: Reducer<CurrencyState, CurrencyActions> = (
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
        rates: action.rates,
        isFetching: false
      };
    case RatesActionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        errorMessage: action.err,
        isFetching: false
      };
    case RatesActionTypes.UPDATE_BASE_CURRENCY_AMOUNT:
      return {
        ...state,
        baseCurrencyAmount: action.amount
      };
    default:
      return state;
  }
};

export const getConvertedAmount = (state: CurrencyState): number => {
  if (state.rates.length > 0) {
    const targetRate = state.rates.filter(
      elem => elem.currency === state.selectedCurrency
    )[0].rate;
    const baseRate = state.rates.filter(
      elem => elem.currency === state.baseCurrency
    )[0].rate;

    const convertedAmount = state.baseCurrencyAmount * (targetRate / baseRate);
    return +convertedAmount.toPrecision(6);
  } else {
    return 0;
  }
};

export const getBaseRate = (state: CurrencyState): Rate | undefined => {
  if (state.rates.length > 0) {
    return state.rates.filter(elem => elem.currency === state.baseCurrency)[0];
  }
  return undefined;
};

export const getSelectedRate = (state: CurrencyState): Rate | undefined => {
  if (state.rates.length > 0) {
    return state.rates.filter(
      elem => elem.currency === state.selectedCurrency
    )[0];
  }
  return undefined;
};
