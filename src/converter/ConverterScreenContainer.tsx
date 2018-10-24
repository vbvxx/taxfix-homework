import React from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "../redux/currency/RatesActions";
import { Rate } from "../redux/currency/RatesReducer";

interface OwnProps {}

interface StateProps {
  lastTimeFetched?: Date;
  base: string;
  rates: Rate[];
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
    const { lastTimeFetched, base, rates } = this.props;

    return (
      <View>
        <Text>
          {lastTimeFetched && lastTimeFetched.toString()}
          {base}
          {rates.length > 0 && rates[0].currency}
          {rates.length > 0 && rates[0].rate}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    lastTimeFetched: state.rates.time,
    base: state.rates.base,
    rates: state.rates.rates
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
