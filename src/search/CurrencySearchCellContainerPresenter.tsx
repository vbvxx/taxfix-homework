import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { darkGreyColour, greyColour, mediumGreyColour } from "../Constants";
import { RootState, RootActions } from "../redux/Store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface OwnProps {
  currency: string;
  onPress: (currency: string, isSelected: boolean) => void;
}
interface StateProps {
  isSelected: boolean;
}
interface DispatchProps {}
type Props = OwnProps & StateProps & DispatchProps;

class CurrencySearchCellContainerPresenter extends React.PureComponent<Props> {
  onButtonIcnPress = () => {
    this.props.onPress(this.props.currency, this.props.isSelected);
  };

  render() {
    const cellRightButtonIcn = this.props.isSelected
      ? require("../Images/remove.png")
      : require("../Images/add.png");

    return (
      <TouchableOpacity onPress={this.onButtonIcnPress}>
        <View style={styles.cellContainer}>
          <View style={styles.textWrapperView}>
            <Text style={styles.textStyle}>{this.props.currency}</Text>
          </View>

          <Image
            source={cellRightButtonIcn}
            style={{
              resizeMode: "contain",
              height: 20,
              width: 20
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => {
  return {
    isSelected: state.search.selectedCurrency === ownProps.currency
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootActions>
): DispatchProps => ({});

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(CurrencySearchCellContainerPresenter);

const styles = StyleSheet.create({
  cellContainer: {
    height: 50,
    marginHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: mediumGreyColour,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  textWrapperView: {
    flex: 1
  },
  textStyle: {
    color: darkGreyColour
  }
});
