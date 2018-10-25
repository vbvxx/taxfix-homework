import { Reducer } from "redux";
import { CurrencyActions, CurrencyActionTypes } from "./CurrencyActions";

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

export const currency: Reducer<CurrencyState, CurrencyActions> = (
  state = defaultValue,
  action
) => {
  switch (action.type) {
    case CurrencyActionTypes.FETCH_RATES:
      return { ...state, isFetching: true, errorMessage: undefined };
    case CurrencyActionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        time: action.time,
        rates: action.rates,
        isFetching: false
      };
    case CurrencyActionTypes.FETCH_RATES_FAILURE:
      return {
        ...state,
        errorMessage: action.err,
        isFetching: false
      };
    case CurrencyActionTypes.UPDATE_BASE_CURRENCY_AMOUNT:
      return {
        ...state,
        baseCurrencyAmount: action.amount
      };
    case CurrencyActionTypes.SAVE_BASE_CURRENCY:
      return {
        ...state,
        selectedCurrency:
          state.selectedCurrency === action.currency
            ? state.baseCurrency
            : state.selectedCurrency,
        baseCurrency: action.currency
      };
    case CurrencyActionTypes.SAVE_SELECTED_CURRENCY:
      return {
        ...state,
        baseCurrency:
          state.baseCurrency === action.currency
            ? state.selectedCurrency
            : state.baseCurrency,
        selectedCurrency: action.currency
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
  return { currency: state.baseCurrency, rate: 1 };
};

export const getSelectedRate = (state: CurrencyState): Rate | undefined => {
  if (state.rates.length > 0) {
    const selected = state.rates.filter(
      elem => elem.currency === state.selectedCurrency
    )[0];
    let ponderatedRate = getRatio(state);
    return { ...selected, rate: +ponderatedRate.toPrecision(6) };
  }
  return undefined;
};

export const getCurrencyArray = (state: CurrencyState): string[] => {
  return state.rates.map(elem => elem.currency);
};

const getRatio = (state: CurrencyState) => {
  const targetRate = state.rates.filter(
    elem => elem.currency === state.selectedCurrency
  )[0].rate;
  const baseRate = state.rates.filter(
    elem => elem.currency === state.baseCurrency
  )[0].rate;
  return +(targetRate / baseRate);
};
