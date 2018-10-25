import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import {
  ultraLightGreyColour,
  darkGreyColour,
  mediumGreyColour
} from "../Constants";

interface OwnProps {
  name: string;
  rate: string;
  onPress: (currency: string) => void;
}

const CurrencyCellPresenter: React.SFC<OwnProps> = props => {
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        props.onPress(props.name);
      }}
      underlayColor="#FFFFFF00"
    >
      <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.rate}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12
  },
  button: {
    flex: 1,
    backgroundColor: ultraLightGreyColour,
    flexDirection: "row",
    marginHorizontal: 6,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: mediumGreyColour
  },
  text: {
    fontSize: 16,
    color: darkGreyColour
  }
});

export default CurrencyCellPresenter;
