import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";
import StarRating from "react-native-star-rating";
import { LinearGradient } from "expo-linear-gradient";

import TMDBApi from "../api/TMDB";
import { FlatList } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);

const Details = ({ route }) => {
  const { colors } = useTheme();

  const { source, title, vote_average, id } = route.params;
  const [movie, setMovie] = useState({});
  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await TMDBApi.get(`movie/${id}`);
      console.log(res.data);
      setMovie(res.data);
    };

    getMovieDetails();
  }, []);

  if (movie.overview && movie && movie.title) {
    return (
      <View>
        <Image style={styles.image} source={{ uri: source }} />

        <LinearGradient
          style={{
            height: deviceHeight + 10,
            width: deviceWidth + 10,
          }}
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
        >
          <View
            style={{
              marginTop: 200,
              marginHorizontal: 10,
            }}
          >
            <Spacer>
              <Title style={styles.title}>{movie.title}</Title>
            </Spacer>

            <Spacer>
              <View style={styles.stars}>
                <StarRating
                  starSize={15}
                  disabled={false}
                  emptyStar={"ios-star-outline"}
                  fullStar={"ios-star"}
                  halfStar={"ios-star-half"}
                  iconSet={"Ionicons"}
                  maxStars={5}
                  rating={movie.vote_average / 2}
                  fullStarColor={"gold"}
                />
                <Text style={styles.rating}>{movie.vote_average / 2}</Text>
              </View>
            </Spacer>

            <Spacer>
              <FlatList
                horizontal
                data={movie.genres}
                renderItem={({ item }) => (
                  <Button
                    color={colors.white}
                    onPress={() => {}}
                    style={{
                      marginHorizontal: 5,
                      borderColor: "rgba(67, 116, 255,1)",
                      borderWidth: 2,
                      borderRadius: 10,
                    }}
                  >
                    {item.name}
                  </Button>
                )}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
              />
            </Spacer>

            <Spacer>
              <Title>Overview: </Title>
              <Text style={{ color: colors.onSurface }}>
                {movie.overview
                  ? movie.overview.length < 200
                    ? movie.overview
                    : `${movie.overview.substring(0, 200)}...`
                  : null}
              </Text>
            </Spacer>
            <Spacer>
              <Text style={{ color: colors.placeholder }}>
                <Text style={{ color: colors.onSurface }}>Release Date:</Text>
                {` ${movie.release_date}`}
              </Text>
            </Spacer>
          </View>
        </LinearGradient>
      </View>
    );
  } else {
    return (
      <View>
        <Image style={styles.image} source={{ uri: source }} />

        <LinearGradient
          style={{
            height: deviceHeight + 10,
            width: deviceWidth + 10,
          }}
          colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.8)", "rgba(0,0,0,1)"]}
        ></LinearGradient>
      </View>
    );
  }
};

export default Details;

const styles = StyleSheet.create({
  image: {
    position: "absolute",
    height: deviceHeight,
    width: deviceWidth,
  },
  title: {
    fontSize: 30,
    textTransform: "uppercase",
  },
  stars: {
    width: 120,
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: 10,
    fontSize: 14,
    color: "rgba(255, 215, 0,1)",
  },
});
