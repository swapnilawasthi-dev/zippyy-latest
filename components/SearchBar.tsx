import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
} from "react-native";
import { Icon, SearchBar } from "@rneui/themed";

interface AppSearchBarProps {
  term: string;
  onChangeTerm: (text: string) => void;
  placeHolder?: string;
  style?: StyleProp<ViewStyle>;
}

const AppSearchBar: React.FC<AppSearchBarProps> = ({
  term,
  onChangeTerm,
  placeHolder = "Search for 'biryani'",
  style,
}) => {
  return (
    <View style={[styles.searchBar, style]}>
      <SearchBar
        platform="android"
        placeholder={placeHolder}
        onChangeText={onChangeTerm}
        value={term}
        containerStyle={{ paddingTop: 0, paddingBottom: 0, borderRadius: 16 }}
        inputContainerStyle={{
          backgroundColor: "#fff",
          borderRadius: 16,
          elevation: 4,
          height: 40,
        }}
        searchIcon={<Image source={require("../assets/images/search.png")} />}
        inputStyle={{
          fontSize: 15,
          marginLeft: 5,
        }}
        leftIconContainerStyle={{
          width: 30,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    // marginLeft: 23,
    // marginRight: 10,
    marginTop: 16,
    flex: 1,
  },
});

export default AppSearchBar;
