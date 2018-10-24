import { Rate, currency } from "./CurrencyReducer";

// Actions

export enum CurrencyActionTypes {
  FETCH_RATES = "[rates] FETCH_RATES",
  FETCH_RATES_SUCCESS = "[rates] FETCH_RATES_SUCCESS",
  FETCH_RATES_FAILURE = "[rates] FETCH_RATES_FAILURE",
  UPDATE_BASE_CURRENCY_AMOUNT = "[rates] UPDATE_BASE_CURRENCY_AMOUNT",
  SAVE_SELECTED_CURRENCY = "[rates] SAVE_SELECTED_CURRENCY",
  SAVE_BASE_CURRENCY = "[rates] SAVE_BASE_CURRENCY"
}

interface FetchRatesAction {
  type: CurrencyActionTypes.FETCH_RATES;
}

interface FetchRatesSuccessAction {
  type: CurrencyActionTypes.FETCH_RATES_SUCCESS;
  time: string;
  rates: Rate[];
}

interface FetchRatesFailureAction {
  type: CurrencyActionTypes.FETCH_RATES_FAILURE;
  err: string;
}

interface UpdateBaseCurrencyAmountAction {
  type: CurrencyActionTypes.UPDATE_BASE_CURRENCY_AMOUNT;
  amount: number;
}

interface SaveSelectedCurrencyAction {
  type: CurrencyActionTypes.SAVE_SELECTED_CURRENCY;
  currency: string;
}

interface SaveBaseCurrencyAction {
  type: CurrencyActionTypes.SAVE_BASE_CURRENCY;
  currency: string;
}

export type CurrencyActions =
  | FetchRatesAction
  | FetchRatesSuccessAction
  | FetchRatesFailureAction
  | UpdateBaseCurrencyAmountAction
  | SaveSelectedCurrencyAction
  | SaveBaseCurrencyAction;

// Action creators

export const fetchRatesActionCreator = (): FetchRatesAction => {
  return {
    type: CurrencyActionTypes.FETCH_RATES
  };
};

export const fetchRatesSuccessActionCreator = (
  time: string,
  rates: Rate[]
): FetchRatesSuccessAction => {
  return {
    type: CurrencyActionTypes.FETCH_RATES_SUCCESS,
    time: time,
    rates: rates
  };
};

export const fetchRatesFailureActionCreator = (
  err: Error
): FetchRatesFailureAction => {
  return {
    type: CurrencyActionTypes.FETCH_RATES_FAILURE,
    err: err.message
  };
};

export const updateBaseCurrencyAmountActionCreator = (
  amount: number
): UpdateBaseCurrencyAmountAction => {
  return {
    type: CurrencyActionTypes.UPDATE_BASE_CURRENCY_AMOUNT,
    amount: amount
  };
};

export const saveBaseCurrencyActionCreator = (
  currency: string
): SaveBaseCurrencyAction => {
  return {
    type: CurrencyActionTypes.SAVE_BASE_CURRENCY,
    currency: currency
  };
};

export const saveSelectedCurrencyActionCreator = (
  currency: string
): SaveSelectedCurrencyAction => {
  return {
    type: CurrencyActionTypes.SAVE_SELECTED_CURRENCY,
    currency: currency
  };
};
