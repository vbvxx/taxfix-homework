import React from "react";
import { View, StyleSheet, Text } from "react-native";
import CurrencyCellPresenter from "./CurrencyCellPresenter";
import { Rate } from "../redux/currency/RatesReducer";
import { greyColour } from "../Constants";

interface OwnProps {
  lastTimeFetched: string;
  baseRate: Rate;
  selectedRate: Rate;
  isFetching: boolean;
}

const PresenterContainer: React.SFC<{ lastTimeFetched: string }> = props => (
  <View style={styles.container}>
    <Text style={styles.title}>{`Last updated: ${props.lastTimeFetched}`}</Text>
    {props.children}
  </View>
);

const ConverterScreenPresenter: React.SFC<OwnProps> = props => {
  const { lastTimeFetched, baseRate, selectedRate, isFetching } = props;
  if (isFetching) {
    return (
      <PresenterContainer lastTimeFetched={lastTimeFetched}>
        <Text style={styles.title}>{"FETCHING DATA ..."}</Text>
      </PresenterContainer>
    );
  } else {
    return (
      <PresenterContainer lastTimeFetched={lastTimeFetched}>
        <View style={{ flexDirection: "row" }}>
          <CurrencyCellPresenter
            name={baseRate.currency}
            rate={baseRate.rate.toString()}
          />
          <CurrencyCellPresenter
            name={selectedRate.currency}
            rate={selectedRate.rate.toString()}
          />
        </View>
      </PresenterContainer>
    );
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
    marginHorizontal: 12
  }
});

export default ConverterScreenPresenter;
