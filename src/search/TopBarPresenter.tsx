import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "native-base";
import { darkGreyColour } from "../Constants";

interface OwnProps {
  onCancelPress: () => void;
  onApplyPress: () => void;
}

const TopBarPresenter: React.SFC<OwnProps> = props => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between"
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
      >
        <Text style={styles.buttonLabel}>{"Apply"}</Text>
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
