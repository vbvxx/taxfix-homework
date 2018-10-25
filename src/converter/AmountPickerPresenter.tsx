import React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputEndEditingEventData
} from "react-native";
import {
  mediumGreyColour,
  darkGreyColour,
  greyColour,
  ultraLightGreyColour
} from "../Constants";
import { Rate } from "../redux/currency/CurrencyReducer";

interface OwnProps {
  baseCurrency: string;
  selectedCurrency: string;
  baseAmount: string;
  convertedAmount: string;
  onEndEditing: (e: NativeSyntheticEvent<TextInputEndEditingEventData>) => void;
}

const AmountPickerPresenter: React.SFC<OwnProps> = props => {
  const { baseCurrency, selectedCurrency, baseAmount, convertedAmount } = props;
  return (
    <View style={{ flexDirection: "row", justifyContent: "center" }}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          editable={true}
          defaultValue={baseAmount}
          onEndEditing={props.onEndEditing}
          underlineColorAndroid="transparent"
          keyboardType="numeric"
        />
        <Text style={styles.fontColor}>{baseCurrency}</Text>
      </View>
      <View style={[styles.container, { justifyContent: "flex-start" }]}>
        <Text style={[styles.convertedAmountLabel, styles.fontColor]}>
          {convertedAmount}
        </Text>
        <Text style={styles.fontColor}>{selectedCurrency}</Text>
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
    marginHorizontal: 24
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: mediumGreyColour,
    flex: 1,
    height: 35,
    marginRight: 6,
    textAlign: "center"
  },
  convertedAmountLabel: {
    flex: 1,
    marginRight: 6,
    textAlign: "center",
    backgroundColor: ultraLightGreyColour
  },
  fontColor: {
    color: darkGreyColour
  }
});

export default AmountPickerPresenter;
