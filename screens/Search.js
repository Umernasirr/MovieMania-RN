import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TMDBApi from "../api/TMDB";
import { useTheme, Title, Button, TextInput } from "react-native-paper";
import MovieItem from "../components/MovieItem";
import BigSpacer from "../components/BigSpacer";

import { FlatList, ScrollView } from "react-native-gesture-handler";
const Search = ({ route }) => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  let catID = null;

  if (route.params.item) {
    catID = route.params.item.id;
  }

  useEffect(() => {
    if (route.params.query) {
      setSearch(route.params.query);
    }

    if (catID) {
      // Get movies by category
      console.log("category");

      const getMovies = async () => {
        const res = await TMDBApi.get("/discover/movie", {
          params: {
            with_genres: catID,
          },
        });

        setMovies(res.data.results);
      };

      getMovies();
    } else {
      console.log("nO CAtegory");
      getSearchMovies(route.params.query);
    }
  }, []);

  const getSearchMovies = async (query) => {
    console.log("getMoviesCalled");
    const res = await TMDBApi.get("search/movie", {
      params: {
        query,
        page: 1,
      },
    });
    setMovies(res.data.results);
  };

  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View style={styles.flexContainer}>
        <BigSpacer>
          <Title style={{ color: colors.text }}>Search Movies</Title>
        </BigSpacer>

        <TextInput
          label="Search"
          placeholder="Enter Movie Title"
          value={search}
          onChangeText={(text) => setSearch(text)}
          style={styles.input}
          onSubmitEditing={() => getSearchMovies(search)}
        />
      </View>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            title={item.title}
            source={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            vote_average={item.vote_average}
            overview={item.overview}
            release_date={item.release_date}
            original_language={item.original_language}
            id={item.id}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  input: {
    position: "absolute",
    right: 0,
    width: 200,
  },

  flexContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
