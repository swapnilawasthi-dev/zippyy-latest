import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import AppSearchBar from "@/components/SearchBar";
import CuisineCard from "@/components/CuisineCard";
import HotPickCard from "@/components/HotPickCard";
import RestaurantCard from "@/components/RestaurantCard";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const banners = [
  { id: 1, image: require("../../assets/images/rectangle.png") },
  { id: 2, image: require("../../assets/images/rectangle.png") },
  { id: 3, image: require("../../assets/images/rectangle.png") },
];

const hotPicks = [
  {
    id: 1,
    name: "Pizza Palace",
    rating: 4.5,
    image: require("../../assets/svg/pizza.svg"),
    price: 122,
    reviewCount: 22,
    discount: 10,
    isVeg: true,
  },
  {
    id: 2,
    name: "Burger Barn",
    rating: 4.2,
    image: require("../../assets/svg/pizza.svg"),
    price: 122,
    reviewCount: 22,
    discount: 10,
    isVeg: false,
  },
  {
    id: 3,
    name: "Sushi Spot",
    rating: 4.8,
    image: require("../../assets/svg/pizza.svg"),
    price: 122,
    reviewCount: 22,
    discount: 10,
    isVeg: true,
  },
];

const cuisines = [
  {
    id: 1,
    name: "Italian",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
  {
    id: 2,
    name: "North Indian",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
  {
    id: 3,
    name: "Mexican",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
  {
    id: 4,
    name: "Continental",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
  {
    id: 5,
    name: "Lebanese",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
  {
    id: 6,
    name: "South Indian",
    image: require("../../assets/svg/pizza.svg"),
    onPress: () => {},
  },
];

const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    rating: 4.5,
    images: [require("../../assets/images/rectangle.png")],
    cuisine: "Indian",
    reviewCount: 32,
    promoted: true,
    freeDelivery: true,
  },
  {
    id: 2,
    name: "Burger Barn",
    rating: 4.2,
    images: [require("../../assets/images/rectangle.png")],
    cuisine: "Indian",
    reviewCount: 32,
    promoted: true,
    freeDelivery: true,
  },
  {
    id: 3,
    name: "Sushi Spot",
    rating: 4.8,
    images: [require("../../assets/images/rectangle.png")],
    cuisine: "Indian",
    reviewCount: 32,
    promoted: true,
    freeDelivery: true,
  },
];

const BannerCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");

  const renderBanner = useCallback(({ item }: { item: any }) => {
    return (
      <Image
        source={item.image}
        style={styles.bannerImage}
        accessibilityLabel={`Banner ${item.id}`}
      />
    );
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        data={banners}
        renderItem={renderBanner}
        sliderWidth={screenWidth}
        itemWidth={screenWidth * 0.9}
        onSnapToItem={(index) => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotStyle={styles.paginationInactiveDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <Text style={styles.sectionTitle}>{title}</Text>
);

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <LinearGradient
        colors={["#006ADC", "rgba(0, 123, 255, 0.6)", "rgba(0, 123, 255, 0.2)"]}
        locations={[0, 0.5, 1]}
        style={styles.header}
      >
        <View style={styles.topRow}>
          <View style={styles.locationContainer}>
            <Image
              width={32}
              height={32}
              source={require("../../assets/images/Favorites_light.png")}
            />
            <View style={styles.locationTextContainer}>
              <Text style={styles.deliveringText}>Delivering in</Text>
              <Text style={styles.timeText}>{"20 minutes"}</Text>
              <View style={styles.locationButton}>
                <Text style={styles.locationText}>
                  {"Kormangala, Bangalore"}
                </Text>
                <Ionicons name="chevron-down" size={16} color="white" />
              </View>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                width={32}
                height={32}
                source={require("../../assets/images/GIft_fill.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Image
                width={32}
                height={32}
                source={require("../../assets/images/User_cicrle_light.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.contentMarketingText}>Content Marketing!!</Text>
        <View style={styles.searchBar}>
          <AppSearchBar term={searchTerm} onChangeTerm={setSearchTerm} />
        </View>
      </LinearGradient>
      <BannerCarousel />
      <View style={styles.section}>
        <SectionTitle title="Hot Picks" />
        <FlatList
          data={hotPicks}
          horizontal
          contentContainerStyle={styles.horizontalFlatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.hotPickContainer}>
              <HotPickCard hotPick={item} />
            </View>
          )}
        />
      </View>
      <View style={styles.section}>
        <SectionTitle title="What's on your mind?" />
        <FlatList
          data={cuisines}
          horizontal
          contentContainerStyle={styles.horizontalFlatlist}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CuisineCard cuisine={item} />}
        />
      </View>
      <View style={styles.section}>
        <SectionTitle title="Restaurants to explore" />
      </View>
    </>
  );
};

export default function HomeScreen() {
  const [endReached, setEndReached] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onEndReached = useCallback(() => {
    if (!isLoading) {
      setIsLoading(true);
      // Simulating API call
      setTimeout(() => {
        setIsLoading(false);
        setEndReached(true);
      }, 1000);
    }
  }, [isLoading]);

  const renderRestaurant = useCallback(
    ({ item }: { item: any }) => (
      <TouchableOpacity
        onPress={() => router.navigate("/restaurant")}
        style={styles.restaurantContainer}
      >
        <RestaurantCard restaurant={item} />
      </TouchableOpacity>
    ),
    []
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        ListHeaderComponent={Header}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading && <ActivityIndicator size="large" color="#006ADC" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  header: {
    paddingTop: StatusBar.currentHeight,
    height: (StatusBar.currentHeight ?? 0) + 194,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchBar: {
    position: "absolute",
    bottom: -20,
    left: 16,
    right: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
  },
  carouselContainer: {
    marginTop: 40,
    marginHorizontal: 16,
    alignItems: "center",
  },
  bannerImage: {
    width: "100%",
    height: 100,
    borderRadius: 16,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5F6368",
  },
  paginationInactiveDot: {
    backgroundColor: "#B1B1B1",
  },
  hotPickContainer: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  restaurantContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationTextContainer: {
    marginLeft: 10,
  },
  deliveringText: {
    color: "white",
    fontSize: 14,
    lineHeight: 15,
  },
  timeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 25,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    color: "white",
    fontSize: 14,
    marginRight: 4,
    lineHeight: 15,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 5,
  },
  iconButton: {
    marginLeft: 16,
  },
  contentMarketingText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 25,
  },
  horizontalFlatlist: {
    marginHorizontal: 10,
  },
});
