import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useTheme } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

const RenderCat = ({ name }) => (
  <LinearGradient style={styles.cat} colors={["#00C4CC", "#6A3BE4"]}>
    <Text style={{ color: "white" }}>{name}</Text>
  </LinearGradient>
);

const CategoryButtons = ({ categories }) => {
  const { colors } = useTheme();
  return (
    <FlatList
      horizontal
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

    height: 40,
    padding: 10,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    borderRadius: 2,
  },
});
