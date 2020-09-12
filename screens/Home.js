import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useTheme, Button, Title, TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";

import { categories } from "../constants";
import CategoryButtons from "../components/CategoryButtons";

const Home = () => {
  const { colors } = useTheme();

  const [search, setSearch] = useState("");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.surface,
        padding: 20,
      }}
    >
      <View style={styles.flexContainer}>
        <BigSpacer>
          <Title style={{ color: colors.text }}>MovieMania</Title>
        </BigSpacer>

        <TextInput
          label="Search"
          placeholder="Enter Movie Title"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
        />
      </View>
      <Spacer />
      <CategoryButtons categories={categories} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  input: {
    position: "absolute",
    right: 0,
    width: 200,
  },
});
