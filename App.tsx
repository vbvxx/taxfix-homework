import * as React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import ConverterScreenContainer from "./src/converter/ConverterScreenContainer";
import { Provider } from "react-redux";
import store from "./src/redux/Store";

export default class App extends React.Component<{}> {
  render() {
    let statusBarHeight = { marginTop: 0 };
    if (Platform.OS === "ios") {
      statusBarHeight.marginTop = 20;
    }
    return (
      <View style={[styles.container, statusBarHeight]}>
        <Provider store={store}>
          <ConverterScreenContainer />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
