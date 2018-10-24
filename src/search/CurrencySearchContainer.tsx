import React from "react";
import { View } from "react-native";
import TopBarPresenter from "./TopBarPresenter";
import SearchBarPresenter from "./SearchBarPresenter";

interface OwnProps {
  dismiss: () => void;
}
interface DispatchProps {}
interface StateProps {}

type Props = OwnProps & DispatchProps & StateProps;

interface State {
  searchQuery: string;
}

class CurrencySearchController extends React.Component<Props, State> {
  state = { searchQuery: "" };

  onApplyPress = () => {
    console.log("apply");
    this.props.dismiss();
  };

  onCancelPress = () => {
    console.log("Press");
    this.props.dismiss();
  };

  handleSearchQuery = (text: string) => {
    console.log(text);
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TopBarPresenter
          onApplyPress={this.onApplyPress}
          onCancelPress={this.onCancelPress}
        />
        <SearchBarPresenter
          handleSearchQuery={this.handleSearchQuery}
          searchQuery={this.state.searchQuery}
        />
      </View>
    );
  }
}

export default CurrencySearchController;
