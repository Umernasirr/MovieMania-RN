import React, { useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useTheme, Title, TextInput } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";

import { categories } from "../constants";
import CategoryButtons from "../components/CategoryButtons";
import FeaturedMovies from "../components/FeaturedMovies";
import { ScrollView } from "react-native-gesture-handler";
const Home = () => {
  const { colors } = useTheme();

  const [search, setSearch] = useState("");

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{
        flex: 1,
        backgroundColor: colors.surface,
      }}
    >
      <Spacer>
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
        <BigSpacer />

        <FeaturedMovies apiURL="movie/popular" title="Recommended Movies" />

        <BigSpacer />
        <FeaturedMovies apiURL="movie/top_rated" title="Top Rated Movies" />

        <BigSpacer />
        <FeaturedMovies apiURL="movie/upcoming" title="Upcoming Movies" />

        <BigSpacer />
      </Spacer>
    </ScrollView>
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
