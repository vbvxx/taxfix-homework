import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import ConverterScreenContainer from "./src/converter/ConverterScreenContainer";
import { Provider } from "react-redux";
import store from "./src/redux/Store";

export default class App extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
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
