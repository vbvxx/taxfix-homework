import React from "react";
import { connect } from "react-redux";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "../redux/currency/CurrencyActions";
import {
  Rate,
  getBaseRate,
  getSelectedRate,
  getCurrencyArray
} from "../redux/currency/CurrencyReducer";
import ConverterScreenPresenter from "./ConverterScreenPresenter";
import { initSearchResultActionCreator } from "../redux/search/SearchActions";
import { from } from "rxjs";

interface OwnProps {}

interface StateProps {
  lastTimeFetched: string;
  baseRate?: Rate;
  selectedRate?: Rate;
  isFetching: boolean;
  currencyArray: string[];
}

interface DispatchProps {
  fetchRatesActionCreator: () => void;
  initSearchResults: (
    searchResults: string[],
    selectedCurrency: string,
    fromBaseCurrency: boolean
  ) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
  editingBaseCurrency?: boolean;
}

class ConverterScreenContainer extends React.Component<Props, State> {
  componentDidMount() {
    this.props.fetchRatesActionCreator();
  }

  onCurrencyCellPress = (fromBaseCurrency: boolean) => {
    this.setState({ editingBaseCurrency: fromBaseCurrency });
    this.props.initSearchResults(
      this.props.currencyArray,
      fromBaseCurrency
        ? this.props.baseRate!.currency
        : this.props.selectedRate!.currency,
      fromBaseCurrency
    );
  };

  render() {
    const { lastTimeFetched, isFetching, baseRate, selectedRate } = this.props;
    return (
      <ConverterScreenPresenter
        baseRate={baseRate}
        selectedRate={selectedRate}
        lastTimeFetched={lastTimeFetched}
        isFetching={isFetching}
        onCurrencyCellPress={this.onCurrencyCellPress}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    lastTimeFetched: state.currency.time,
    baseRate: getBaseRate(state.currency),
    selectedRate: getSelectedRate(state.currency),
    isFetching: state.currency.isFetching,
    currencyArray: getCurrencyArray(state.currency)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    fetchRatesActionCreator: () => {
      dispatch(fetchRatesActionCreator());
    },
    initSearchResults: (
      searchResults: string[],
      selectedCurrency: string,
      fromBaseCurrency: boolean
    ) => {
      dispatch(
        initSearchResultActionCreator(
          searchResults,
          selectedCurrency,
          fromBaseCurrency
        )
      );
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ConverterScreenContainer);
