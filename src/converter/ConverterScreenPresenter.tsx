import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
  Keyboard
} from "react-native";
import CurrencyCellPresenter from "./CurrencyCellPresenter";
import { Rate } from "../redux/currency/CurrencyReducer";
import { greyColour } from "../Constants";
import AmountPickerContainer from "./AmountPickerContainer";
import CurrencySearchController from "../search/CurrencySearchContainer";

interface OwnProps {
  lastTimeFetched: string;
  baseRate?: Rate;
  selectedRate?: Rate;
  isFetching: boolean;
  errorMessage?: string;
  onCurrencyCellPress: (fromBaseCurrency: boolean) => void;
}

interface State {
  modalVisible: boolean;
}

const dismissKeyboard = () => {
  Keyboard.dismiss();
};

const PresenterContainer: React.SFC<{
  lastTimeFetched: string;
  dismiss: () => void;
  modalVisible: boolean;
}> = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{`Last updated: ${props.lastTimeFetched}`}</Text>
    {props.children}
    <Modal
      animationType="slide"
      transparent={false}
      visible={props.modalVisible}
      onRequestClose={() => {}}
    >
      <CurrencySearchController dismiss={props.dismiss} />
    </Modal>
  </View>
);

class ConverterScreenPresenter extends React.Component<OwnProps, State> {
  state = { modalVisible: false };

  dismissModal = () => {
    this.setState({ modalVisible: false });
  };

  onCellPress = (currency: string) => {
    this.props.onCurrencyCellPress(currency === this.props.baseRate!.currency);
    this.setState({ modalVisible: true });
  };

  render() {
    const {
      lastTimeFetched,
      baseRate,
      selectedRate,
      isFetching,
      errorMessage
    } = this.props;
    if (isFetching) {
      return (
        <PresenterContainer
          lastTimeFetched={lastTimeFetched}
          dismiss={this.dismissModal}
          modalVisible={this.state.modalVisible}
        >
          <Text style={styles.title}>{"FETCHING DATA ..."}</Text>
        </PresenterContainer>
      );
    } else if (errorMessage !== undefined) {
      return (
        <PresenterContainer
          lastTimeFetched={lastTimeFetched}
          dismiss={this.dismissModal}
          modalVisible={this.state.modalVisible}
        >
          <Text style={styles.title}>{errorMessage}</Text>
        </PresenterContainer>
      );
    } else if (baseRate !== undefined && selectedRate !== undefined) {
      return (
        <TouchableHighlight
          onPress={dismissKeyboard}
          style={{ flex: 1, width: "100%" }}
          underlayColor="#FFFFFF00"
        >
          <PresenterContainer
            lastTimeFetched={lastTimeFetched}
            dismiss={this.dismissModal}
            modalVisible={this.state.modalVisible}
          >
            <View style={styles.rates}>
              <CurrencyCellPresenter
                name={baseRate!.currency}
                rate={baseRate!.rate.toString()}
                onPress={this.onCellPress}
              />
              <CurrencyCellPresenter
                name={selectedRate!.currency}
                rate={selectedRate!.rate.toString()}
                onPress={this.onCellPress}
              />
            </View>

            <AmountPickerContainer />
          </PresenterContainer>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 24,
    marginHorizontal: 12
  },
  title: {
    fontSize: 18,
    marginBottom: 24,
    color: greyColour
  },
  rates: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginBottom: 12
  }
});

export default ConverterScreenPresenter;
