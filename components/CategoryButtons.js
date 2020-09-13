import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme, Title, Button } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

const RenderCat = ({ name }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity>
      <Button
        style={{ padding: 5, marginHorizontal: 5 }}
        mode="outlined"
        color={colors.white}
      >
        {name}
      </Button>
    </TouchableOpacity>
  );
};

const CategoryButtons = ({ categories }) => {
  const { colors } = useTheme();
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ maxHeight: 50 }}
      data={categories}
      renderItem={({ item }) => <RenderCat name={item.name} />}
      keyExtractor={(item) => item.name}
    />
  );
};

export default CategoryButtons;

const styles = StyleSheet.create({
  cat: {
    marginHorizontal: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
});
