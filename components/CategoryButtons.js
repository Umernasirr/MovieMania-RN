import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";

const RenderCat = ({ name }) => (
  <TouchableOpacity>
    <LinearGradient style={styles.cat} colors={["#00C4CC", "#6A3BE4"]}>
      <Text style={{ color: "white" }}>{name}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

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
