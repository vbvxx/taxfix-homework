import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CurrencyCellPresenter from "./CurrencyCellPresenter";
import { Rate } from "../redux/currency/CurrencyReducer";
import { greyColour } from "../Constants";
import AmountPickerContainer from "./AmountPickerContainer";

interface OwnProps {
  lastTimeFetched: string;
  baseRate?: Rate;
  selectedRate?: Rate;
  isFetching: boolean;
  errorMessage?: string;
}

const PresenterContainer: React.SFC<{ lastTimeFetched: string }> = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{`Last updated: ${props.lastTimeFetched}`}</Text>
    {props.children}
  </View>
);

const ConverterScreenPresenter: React.SFC<OwnProps> = props => {
  const {
    lastTimeFetched,
    baseRate,
    selectedRate,
    isFetching,
    errorMessage
  } = props;
  if (isFetching) {
    return (
      <PresenterContainer lastTimeFetched={lastTimeFetched}>
        <Text style={styles.title}>{"FETCHING DATA ..."}</Text>
      </PresenterContainer>
    );
  } else if (errorMessage !== undefined) {
    return (
      <PresenterContainer lastTimeFetched={lastTimeFetched}>
        <Text style={styles.title}>{errorMessage}</Text>
      </PresenterContainer>
    );
  } else if (baseRate !== undefined && selectedRate !== undefined) {
    return (
      <PresenterContainer lastTimeFetched={lastTimeFetched}>
        <View style={styles.rates}>
          <CurrencyCellPresenter
            name={baseRate!.currency}
            rate={baseRate!.rate.toString()}
          />
          <CurrencyCellPresenter
            name={selectedRate!.currency}
            rate={selectedRate!.rate.toString()}
          />
        </View>
        <AmountPickerContainer />
      </PresenterContainer>
    );
  } else {
    return null;
  }
};

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
