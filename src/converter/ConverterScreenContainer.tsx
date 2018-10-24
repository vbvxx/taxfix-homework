import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "../redux/currency/RatesActions";

interface OwnProps {}

interface StateProps {
  lastTimeFetched?: Date;
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
    return (
      <View>
        <Text>
          {this.props.lastTimeFetched && this.props.lastTimeFetched.toString()}
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    lastTimeFetched: state.rates.time
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
