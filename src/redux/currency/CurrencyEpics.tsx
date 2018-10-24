import { ajax } from "rxjs/ajax";
import { switchMap, map, catchError } from "rxjs/operators";
import { Epic, ofType } from "redux-observable";
import { RootState, RootActions } from "../store";
import {
  CurrencyActionTypes,
  fetchRatesSuccessActionCreator,
  fetchRatesFailureActionCreator
} from "./CurrencyActions";
import { Rate } from "./CurrencyReducer";
import { of } from "rxjs";

export const fetchRateEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state
) => {
  return action$.pipe(
    ofType(CurrencyActionTypes.FETCH_RATES),
    switchMap((action$, index) => {
      return ajax.getJSON("https://txf-ecb.glitch.me/rates").pipe(
        map(response => {
          let mappedResponse = response as {
            time: string;
            rates: Rate[];
          };
          mappedResponse.rates.push({ currency: "EUR", rate: 1 });
          return fetchRatesSuccessActionCreator(
            mappedResponse.time,
            mappedResponse.rates
          );
        }),
        catchError(error =>
          of(fetchRatesFailureActionCreator(error.xhr.response))
        )
      );
    })
  );
};
