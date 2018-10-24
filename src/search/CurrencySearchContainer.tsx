import React from "react";
import {
  View,
  Platform,
  FlatList,
  ListRenderItemInfo,
  Keyboard
} from "react-native";
import TopBarPresenter from "./TopBarPresenter";
import SearchBarPresenter from "./SearchBarPresenter";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getCurrencyArray } from "../redux/currency/CurrencyReducer";
import CurrencySearchCellContainerPresenter from "./CurrencySearchCellContainerPresenter";
import {
  updateSearchQueryActionCreator,
  updateSelectedCurrencyActionCreator,
  initSearchResultActionCreator
} from "../redux/search/SearchActions";

interface OwnProps {
  dismiss: () => void;
}
interface DispatchProps {
  updateSearchQuery: (searchQuery: string) => void;
  updateSelectedCurrency: (searchQuery: string) => void;
  initSearchResults: (
    searchResults: string[],
    selectedCurrency: string
  ) => void;
}
interface StateProps {
  searchResults: string[];
  searchQuery: string;
  currencyInitialArray: string[];
  selectedCurrency: string;
}

type Props = OwnProps & DispatchProps & StateProps;

class CurrencySearchController extends React.Component<Props> {
  componentDidMount() {
    this.props.initSearchResults(this.props.currencyInitialArray, "EUR");
  }

  onApplyPress = () => {
    this.props.dismiss();
    this.props.updateSearchQuery("");
  };

  onCancelPress = () => {
    this.props.dismiss();
    this.props.updateSearchQuery("");
  };

  handleSearchQuery = (text: string) => {
    this.props.updateSearchQuery(text);
  };

  onPress = (currency: string) => {
    this.props.updateSelectedCurrency(currency);
  };

  renderCell = (elem: ListRenderItemInfo<string>) => {
    return (
      <CurrencySearchCellContainerPresenter
        currency={elem.item}
        onPress={this.onPress}
      />
    );
  };

  getKey = (item: string, index: number) => item;

  dismissKeyboard = () => Keyboard.dismiss();

  render() {
    let statusBarHeight = { marginTop: 0 };
    if (Platform.OS === "ios") {
      statusBarHeight.marginTop = 20;
    }

    return (
      <View style={[{ flex: 1, backgroundColor: "white" }, statusBarHeight]}>
        <TopBarPresenter
          onApplyPress={this.onApplyPress}
          onCancelPress={this.onCancelPress}
          isSaveDisabled={this.props.selectedCurrency === ""}
        />
        <SearchBarPresenter
          handleSearchQuery={this.handleSearchQuery}
          searchQuery={this.props.searchQuery}
        />
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={this.props.searchResults}
          renderItem={this.renderCell}
          horizontal={false}
          style={{ flex: 1 }}
          keyExtractor={this.getKey}
          onScrollBeginDrag={this.dismissKeyboard}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    currencyInitialArray: getCurrencyArray(state.currency),
    searchQuery: state.search.searchQuery,
    searchResults: state.search.searchResults,
    selectedCurrency: state.search.selectedCurrency
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    updateSearchQuery: (searchQuery: string) => {
      dispatch(updateSearchQueryActionCreator(searchQuery));
    },
    updateSelectedCurrency: (selectedCurrency: string) => {
      dispatch(updateSelectedCurrencyActionCreator(selectedCurrency));
    },
    initSearchResults: (searchResults: string[], selectedCurrency: string) => [
      dispatch(initSearchResultActionCreator(searchResults, selectedCurrency))
    ]
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySearchController);
