export enum SearchActionTypes {
  UPDATE_SEARCH_QUERY = "[search] UPDATE_SEARCH_QUERY",
  INIT_SEARCH_RESULT = "[search] INIT_SEARCH_RESULT",
  UPDATE_SELECTED_CURRENCY = "[search] UPDATE_SELECTED_CURRENCY"
}

interface UpdateSearchQueryAction {
  type: SearchActionTypes.UPDATE_SEARCH_QUERY;
  searchQuery: string;
}

interface InitSearchResultAction {
  type: SearchActionTypes.INIT_SEARCH_RESULT;
  searchResults: string[];
  selectedCurrency: string;
}

interface UpdateSelectedCurrencyAction {
  type: SearchActionTypes.UPDATE_SELECTED_CURRENCY;
  currency: string;
}

export type SearchActions =
  | UpdateSearchQueryAction
  | InitSearchResultAction
  | UpdateSelectedCurrencyAction;

export const updateSearchQueryActionCreator = (
  searchQuery: string
): UpdateSearchQueryAction => {
  return {
    type: SearchActionTypes.UPDATE_SEARCH_QUERY,
    searchQuery: searchQuery
  };
};

export const initSearchResultAction = (
  searchResults: string[],
  selectedCurrency: string
): InitSearchResultAction => {
  return {
    type: SearchActionTypes.INIT_SEARCH_RESULT,
    searchResults: searchResults,
    selectedCurrency: selectedCurrency
  };
};

export const updateSelectedCurrencyActionCreator = (
  currency: string
): UpdateSelectedCurrencyAction => {
  return {
    type: SearchActionTypes.UPDATE_SELECTED_CURRENCY,
    currency: currency
  };
};
