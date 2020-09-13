import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { useTheme, Title, Button } from "react-native-paper";
import Spacer from "../components/Spacer";
import BigSpacer from "../components/BigSpacer";
import StarRating from "react-native-star-rating";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import TMDBApi from "../api/TMDB";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import FeaturedMovies from "../components/FeaturedMovies";

const deviceHeight = Math.round(Dimensions.get("window").height);
const deviceWidth = Math.round(Dimensions.get("window").width);

const Details = ({ route, navigation }) => {
  const { colors } = useTheme();
  const scrollRef = useRef();
  const [isSpinner, setIsSpinner] = useState(false);
  const onPressTouch = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 0,
        animated: true,
      });
    }, 2000);
  };
  console.log(route.params);
  const { source, title, vote_average, id } = route.params;
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await TMDBApi.get(`movie/${id}`);
      setMovie(res.data);

      //     setIsSpinner(false);
    };

    getMovieDetails();
  }, [route]);

  if (movie.overview && movie && movie.title) {
    return (
      <ScrollView ref={scrollRef}>
        <View
          style={{ paddingBottom: 220, backgroundColor: colors.background }}
        >
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
                marginTop: 100,
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
                      onPress={() => {
                        navigation.navigate("Search", { item });
                      }}
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
                  keyExtractor={(item) => item.id.toString()}
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

              <Spacer>
                <Text style={{ color: colors.placeholder }}>
                  <Text style={{ color: colors.onSurface }}>Runtime:</Text>
                  {` ${movie.runtime} mins`}
                </Text>
              </Spacer>

              <Spacer>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: colors.onSurface }}>
                    Spoken Languages:
                  </Text>
                  <FlatList
                    horizontal
                    data={movie.spoken_languages}
                    renderItem={({ item }) => (
                      <Text
                        onPress={() => {}}
                        style={{
                          color: colors.placeholder,
                          marginHorizontal: 5,
                        }}
                      >
                        {item.name}
                      </Text>
                    )}
                    keyExtractor={(item) => item.name}
                    showsHorizontalScrollIndicator={false}
                  />
                </View>
              </Spacer>

              <Spacer>
                <View
                  style={{
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  <Button style={styles.button} mode="outlined">
                    Add To Library
                  </Button>
                  <Button
                    style={styles.button}
                    mode="outlined"
                    color={colors.white}
                    onPress={() => navigation.pop()}
                  >
                    Go Back
                  </Button>
                </View>
              </Spacer>

              <Spacer />

              <TouchableOpacity onPress={onPressTouch}>
                <FeaturedMovies
                  title="Similar Movies"
                  apiURL={`movie/${movie.id}/recommendations`}
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>
    );
  } else {
    return null;
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

  button: {
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
});
