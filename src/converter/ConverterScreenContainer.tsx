import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "../redux/currency/RatesActions";
import { Rate } from "../redux/currency/RatesReducer";
import ConverterScreenPresenter from "./ConverterScreenPresenter";

interface OwnProps {}

interface StateProps {
  lastTimeFetched: string;
  base: string;
  rates: Rate[];
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
    const { lastTimeFetched, base, rates, isFetching } = this.props;

    return (
      <ConverterScreenPresenter
        baseRate={{ currency: "EUR", rate: 1.0 }}
        selectedRate={{ currency: "EUR", rate: 1.0 }}
        lastTimeFetched={lastTimeFetched}
        isFetching={isFetching}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    lastTimeFetched: state.rates.time,
    base: state.rates.base,
    rates: state.rates.rates,
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
