import React from "react";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { updateBaseAmountActionCreator } from "../redux/currency/RatesActions";
import {
  NativeSyntheticEvent,
  TextInputEndEditingEventData
} from "react-native";
import AmountPickerPresenter from "./AmountPickerPresenter";
import { getConvertedAmount } from "../redux/currency/RatesReducer";

interface OwnProps {}

interface DispatchProps {
  updateBaseAmount: (amount: number) => void;
}

interface StateProps {
  baseCurrency: string;
  baseAmount: number;
  selectedCurrency: string;
  convertedAmount: number;
}

type Props = OwnProps & DispatchProps & StateProps;

class AmountPickerContainer extends React.Component<Props> {
  onEndEditing = (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => {
    this.props.updateBaseAmount(+e.nativeEvent.text);
  };

  render() {
    const {
      baseAmount,
      baseCurrency,
      selectedCurrency,
      convertedAmount
    } = this.props;
    return (
      <AmountPickerPresenter
        baseAmount={baseAmount.toString()}
        baseCurrency={baseCurrency}
        selectedCurrency={selectedCurrency}
        convertedAmount={convertedAmount.toString()}
        onEndEditing={this.onEndEditing}
      />
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    baseCurrency: state.rates.baseCurrency,
    baseAmount: state.rates.baseAmount,
    selectedCurrency: state.rates.selectedCurrency,
    convertedAmount: getConvertedAmount(state.rates)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    updateBaseAmount: (amount: number) => {
      dispatch(updateBaseAmountActionCreator(amount));
    }
  };
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(AmountPickerContainer);