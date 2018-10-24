import { Rate } from "./CurrencyReducer";

// Actions

export enum RatesActionTypes {
  FETCH_RATES = "[rates] FETCH_RATES",
  FETCH_RATES_SUCCESS = "[rates] FETCH_RATES_SUCCESS",
  FETCH_RATES_FAILURE = "[rates] FETCH_RATES_FAILURE",
  UPDATE_BASE_CURRENCY_AMOUNT = "[rates] UPDATE_BASE_CURRENCY_AMOUNT",
  UPDATE_SELECTED_RATE = "[rates] UPDATE_SELECTED_RATE",
  UPDATE_BASE_RATE = "[rates] UPDATE_BASE_RATE"
}

interface FetchRatesAction {
  type: RatesActionTypes.FETCH_RATES;
}

interface FetchRatesSuccessAction {
  type: RatesActionTypes.FETCH_RATES_SUCCESS;
  time: string;
  rates: Rate[];
}

interface FetchRatesFailureAction {
  type: RatesActionTypes.FETCH_RATES_FAILURE;
  err: string;
}

interface UpdateBaseCurrencyAmountAction {
  type: RatesActionTypes.UPDATE_BASE_CURRENCY_AMOUNT;
  amount: number;
}

export type CurrencyActions =
  | FetchRatesAction
  | FetchRatesSuccessAction
  | FetchRatesFailureAction
  | UpdateBaseCurrencyAmountAction;

// Action creators

export const fetchRatesActionCreator = (): FetchRatesAction => {
  return {
    type: RatesActionTypes.FETCH_RATES
  };
};

export const fetchRatesSuccessActionCreator = (
  time: string,
  rates: Rate[]
): FetchRatesSuccessAction => {
  return {
    type: RatesActionTypes.FETCH_RATES_SUCCESS,
    time: time,
    rates: rates
  };
};

export const fetchRatesFailureActionCreator = (
  err: Error
): FetchRatesFailureAction => {
  return {
    type: RatesActionTypes.FETCH_RATES_FAILURE,
    err: err.message
  };
};

export const updateBaseAmountActionCreator = (
  amount: number
): UpdateBaseCurrencyAmountAction => {
  return {
    type: RatesActionTypes.UPDATE_BASE_CURRENCY_AMOUNT,
    amount: amount
  };
};
