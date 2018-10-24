import { ajax } from "rxjs/ajax";
import { switchMap, map } from "rxjs/operators";
import { Epic, ofType, combineEpics } from "redux-observable";
import { RootState, RootActions } from "../store";
import {
  RatesActionTypes,
  fetchRatesSuccessActionCreator
} from "./RatesActions";
// import { TestActionTypes, syncActionCreator } from "../actions";

export const fetchRateEpic: Epic<RootActions, RootActions, RootState> = (
  action$,
  state
) => {
  return action$.pipe(
    ofType(RatesActionTypes.FETCH_RATES),
    switchMap((action$, index) => {
      return ajax.getJSON("https://txf-ecb.glitch.me/rates").pipe(
        map(response => {
          console.log(response);
          return fetchRatesSuccessActionCreator(new Date(), "EUR", []);
        })
      );
    })
  );
};
