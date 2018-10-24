import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "native-base";
import { darkGreyColour } from "../Constants";

interface OwnProps {
  onCancelPress: () => void;
  onApplyPress: () => void;
  isSaveDisabled: boolean;
}

const TopBarPresenter: React.SFC<OwnProps> = props => {
  const applyButtonColor = props.isSaveDisabled
    ? { color: "#89898950" }
    : { color: darkGreyColour };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20
      }}
    >
      <Button
        style={{ margin: 0 }}
        transparent
        onPress={props.onCancelPress}
        color="#ffffff"
      >
        <Text style={styles.buttonLabel}>{"Cancel"}</Text>
      </Button>
      <Button
        style={{ margin: 0 }}
        transparent
        onPress={props.onApplyPress}
        color="#ffffff"
        disabled={props.isSaveDisabled}
      >
        <Text style={applyButtonColor}>{"Apply"}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonLabel: {
    color: darkGreyColour
  }
});

export default TopBarPresenter;
