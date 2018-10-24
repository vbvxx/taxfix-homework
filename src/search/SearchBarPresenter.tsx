import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
import { ultraLightGreyColour } from "../Constants";

interface OwnProps {
  searchQuery: string;
  handleSearchQuery: (searchQuery: string) => void;
}

const SearchBarPresenter: React.SFC<OwnProps> = props => {
  const { searchQuery, handleSearchQuery } = props;
  return (
    <View style={{ backgroundColor: "white" }}>
      <SearchBar
        placeholder={"Search a currency"}
        round
        lightTheme
        containerStyle={{ backgroundColor: "white" }}
        inputStyle={{ backgroundColor: ultraLightGreyColour }}
        value={searchQuery}
        onChangeText={handleSearchQuery}
        //@ts-ignore
        // platform="default"
      />
    </View>
  );
};

export default SearchBarPresenter;
