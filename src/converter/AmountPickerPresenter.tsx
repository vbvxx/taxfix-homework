import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { mediumGreyColour, darkGreyColour, greyColour } from "../Constants";

const AmountPickerPresenter: React.SFC<{}> = props => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={styles.container}>
        <TextInput style={styles.textInput} />
        <Text style={styles.fontColor}>EUR</Text>
      </View>
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <Text style={[styles.convertedAmountLabel, styles.fontColor]}>1</Text>
        <Text style={styles.fontColor}>EUR</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginHorizontal: 6
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: mediumGreyColour,
    width: 70,
    height: 35,
    marginRight: 6,
    textAlign: "center"
  },
  convertedAmountLabel: {
    width: 68,
    marginRight: 6,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: greyColour
  },
  fontColor: {
    color: darkGreyColour
  }
});

export default AmountPickerPresenter;
