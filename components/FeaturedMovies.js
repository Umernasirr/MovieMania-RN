import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Title, Divider } from "react-native-paper";
import StarRating from "react-native-star-rating";
import { useNavigation } from "@react-navigation/native";
import TMDBAPI from "../api/TMDB";
import Spacer from "./Spacer";
import BigSpacer from "./BigSpacer";
import { useTheme } from "react-native-paper";

const RenderItem = ({ id, title, source, vote_average }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  if (title.length > 10) {
    title = title.substring(0, 10);
    title = title + "...";
  }
  source = `https://image.tmdb.org/t/p/w500${source}`;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Details", { source, id, title, vote_average })
      }
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: source }} />
        <Text
          style={{ fontSize: 14, textAlign: "center", color: colors.onSurface }}
        >
          {title}
        </Text>

        <StarRating
          starSize={15}
          disabled={false}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          maxStars={5}
          rating={vote_average / 2}
          fullStarColor={"gold"}
        />
      </View>
    </TouchableOpacity>
  );
};

const FeaturedMovies = ({ title, apiURL }) => {
  const [featured, setFeatured] = useState([]);
  useEffect(() => {
    const getFeatured = () => {
      console.log(apiURL);
      TMDBAPI.get(`${apiURL}`).then((res) => {
        setFeatured(res.data.results);
      });
    };

    getFeatured();
  }, []);

  if (featured && featured.length > 1) {
    return (
      <View>
        <Title>{title}</Title>
        <Divider style={{ margin: 5 }} />
        <Spacer />
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featured}
          renderItem={({ item }) => (
            <RenderItem
              title={item.title}
              source={item.poster_path}
              vote_average={item.vote_average}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  } else {
    return <Text>Fetching</Text>;
  }
};

export default FeaturedMovies;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 150,
    marginHorizontal: 8,
    marginVertical: 5,
  },
});
