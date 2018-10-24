import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "../redux/currency/RatesActions";
import {
  Rate,
  getBaseRate,
  getSelectedRate
} from "../redux/currency/RatesReducer";
import ConverterScreenPresenter from "./ConverterScreenPresenter";

interface OwnProps {}

interface StateProps {
  lastTimeFetched: string;
  baseRate?: Rate;
  selectedRate?: Rate;
  isFetching: boolean;
}

interface DispatchProps {
  fetchRatesActionCreator: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

class ConverterScreenContainer extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchRatesActionCreator();
  }

  render() {
    const { lastTimeFetched, isFetching, baseRate, selectedRate } = this.props;
    return (
      <ConverterScreenPresenter
        baseRate={baseRate}
        selectedRate={selectedRate}
        lastTimeFetched={lastTimeFetched}
        isFetching={isFetching}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    lastTimeFetched: state.rates.time,
    baseRate: getBaseRate(state.rates),
    selectedRate: getSelectedRate(state.rates),
    isFetching: state.rates.isFetching
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    fetchRatesActionCreator: () => {
      dispatch(fetchRatesActionCreator());
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(ConverterScreenContainer);
