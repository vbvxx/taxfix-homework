import { Reducer } from "redux";
import { SearchActions, SearchActionTypes } from "./SearchActions";

export interface SearchState {
  searchResults: string[];
  selectedCurrency: string;
  searchQuery: string;
}

const initialState: SearchState = {
  searchResults: [],
  selectedCurrency: "",
  searchQuery: ""
};

export const search: Reducer<SearchState, SearchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SearchActionTypes.INIT_SEARCH_RESULT:
      return {
        ...state,
        searchResults: [...action.searchResults],
        selectedCurrency: action.selectedCurrency
      };
    case SearchActionTypes.UPDATE_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
        searchResults: state.searchResults.filter(currency =>
          currency.toLowerCase().includes(action.searchQuery.toLowerCase())
        )
      };
    case SearchActionTypes.UPDATE_SELECTED_CURRENCY:
      return {
        ...state,
        selectedCurrency:
          action.currency === state.selectedCurrency ? "" : action.currency
      };
    default:
      return state;
  }
};
