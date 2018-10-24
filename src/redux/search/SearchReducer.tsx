import { Reducer } from "redux";
import { SearchActions, SearchActionTypes } from "./SearchActions";

export interface SearchState {
  initialArray: string[];
  searchResults: string[];
  selectedCurrency: string;
  searchQuery: string;
  isEditingBaseCurrency: boolean;
}

const initialState: SearchState = {
  initialArray: [],
  searchResults: [],
  selectedCurrency: "",
  searchQuery: "",
  isEditingBaseCurrency: false
};

export const search: Reducer<SearchState, SearchActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SearchActionTypes.INIT_SEARCH_RESULT:
      return {
        ...state,
        initialArray: [...action.searchResults],
        searchResults: [...action.searchResults],
        selectedCurrency: action.selectedCurrency,
        isEditingBaseCurrency: action.isEditingBaseCurrency
      };
    case SearchActionTypes.UPDATE_SEARCH_QUERY:
      let searchResults = [];
      if (action.searchQuery === "") {
        searchResults = state.initialArray;
      } else {
        searchResults = state.initialArray.filter(currency =>
          currency.toLowerCase().includes(action.searchQuery.toLowerCase())
        );
      }
      return {
        ...state,
        searchQuery: action.searchQuery,
        searchResults: searchResults
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
