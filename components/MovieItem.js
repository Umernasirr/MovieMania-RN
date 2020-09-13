import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme, Title, Button } from "react-native-paper";
import StarRating from "react-native-star-rating";
import axios from "axios";
import Spacer from "../components/Spacer";
const MovieItem = ({
  title,
  source,
  vote_average,
  release_date,
  original_language,
  overview,
  id,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("Details", { source, id, title, vote_average });
      }}
    >
      <View elevation={2} style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: source }}
          onError={(e) => {}}
        />
        <View style={{ margin: 10 }}>
          <Title style={{ color: colors.onSurface }}>{title}</Title>

          <View style={styles.ratingView}>
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
            <Text style={styles.rating}>{vote_average / 2}</Text>
          </View>

          <Text style={{ color: colors.onSurface }}>
            Release Date:
            <Text style={{ color: colors.placeholder }}>
              {` ${release_date}`}
            </Text>
          </Text>

          <Text style={{ color: colors.onSurface }}>
            Original Language:
            <Text style={{ color: colors.placeholder }}>
              {` ${original_language}`}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 20,
  },

  ratingView: { flexDirection: "row", maxWidth: 50, alignItems: "center" },
  image: {
    height: 160,
    width: 120,
  },
  rating: {
    color: "rgb(255,215,0)",
    marginLeft: 5,
  },
});
