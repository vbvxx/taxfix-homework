import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AppState,
  AppStateStatus
} from "react-native";
import ConverterScreenContainer from "./src/converter/ConverterScreenContainer";
import { Provider, connect } from "react-redux";
import store, { RootState, RootActions } from "./src/redux/Store";
import { Dispatch } from "redux";
import { fetchRatesActionCreator } from "./src/redux/currency/CurrencyActions";

interface OwnProps {}
interface DispatchProps {
  fetchRatesActionCreator: () => void;
}
interface StateProps {}

interface State {
  appState: AppStateStatus;
}

type Props = OwnProps & StateProps & DispatchProps;

class App extends React.Component<Props, State> {
  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState: any) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.props.fetchRatesActionCreator();
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    let statusBarHeight = { marginTop: 0 };
    if (Platform.OS === "ios") {
      statusBarHeight.marginTop = 20;
    }
    return (
      <View style={[styles.container, statusBarHeight]}>
        <ConverterScreenContainer />
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

const mapStateToProps = (state: RootState): StateProps => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootActions>): DispatchProps => {
  return {
    fetchRatesActionCreator: () => {
      dispatch(fetchRatesActionCreator());
    }
  };
};

const ConnectedApp = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(App);

const ExportApp = () => (
  <Provider store={store}>
    <ConnectedApp />
  </Provider>
);

export default ExportApp;
