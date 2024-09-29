import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface RestaurantProps {
  name: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  images: ImageSourcePropType[];
  promoted: boolean;
  freeDelivery: boolean;
  deliveryTime: string;
}

const { width } = Dimensions.get("window");
const CARD_WIDTH = width - 32; // Assuming 16px padding on each side

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantProps }) => {
  const {
    name,
    cuisine,
    rating,
    reviewCount,
    images,
    promoted,
    freeDelivery,
    deliveryTime,
  } = restaurant;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[
              styles.image,
              { opacity: index === activeImageIndex ? 1 : 0 },
            ]}
          />
        ))}
        <View style={styles.dotsContainer}>
          {images.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === activeImageIndex
                      ? "white"
                      : "rgba(255, 255, 255, 0.5)",
                },
              ]}
              onPress={() => setActiveImageIndex(index)}
            />
          ))}
        </View>
        {promoted && (
          <View style={styles.promotedBadge}>
            <Text style={styles.promotedText}>Promoted</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviewCount}>({reviewCount})</Text>
          </View>
        </View>
        <Text style={styles.cuisine}>{cuisine}</Text>
        <View style={styles.footerContainer}>
          <View style={styles.deliveryTimeContainer}>
            <Ionicons name="time-outline" size={16} color="#666" />
            <Text style={styles.deliveryTime}>{deliveryTime}</Text>
          </View>
          {freeDelivery && (
            <View style={styles.freeDeliveryContainer}>
              <Text style={styles.freeDeliveryText}>FREE DELIVERY</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    backgroundColor: "white",
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  dotsContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  promotedBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#FF69B4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  promotedText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cuisine: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryTime: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  freeDeliveryContainer: {
    backgroundColor: "#3498db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeDeliveryText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default RestaurantCard;
