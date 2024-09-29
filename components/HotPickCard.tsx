import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

interface HotPick {
  image: any;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  discount: number;
  isVeg: boolean;
}

const HotPickCard = ({ hotPick }: { hotPick: HotPick }) => {
  return (
    <View style={styles.hotPick}>
      <LinearGradient
        colors={["rgba(217, 217, 217, 0.21)", "rgba(170, 170, 170, 0.56)"]}
        style={styles.imageContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Image style={styles.image} source={hotPick.image} />
      </LinearGradient>
      <LinearGradient
        colors={["#007BFF", "#006ADC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.discountBadge}
      >
        <Text style={styles.discountText}>{hotPick.discount}%</Text>
        <Text style={styles.discountText}>OFF</Text>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          {hotPick?.isVeg ? (
            <Image source={require("../assets/images/veg.png")} />
          ) : (
            <Image source={require("../assets/images/non_veg.png")} />
          )}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{hotPick.rating}</Text>
            <Text style={styles.reviewCount}>({hotPick.reviewCount}+)</Text>
          </View>
        </View>
        <Text style={styles.name} numberOfLines={1}>
          {hotPick.name}
        </Text>
        <Text style={styles.subName}>Lit Hai Chokha</Text>
        <View style={styles.priceAddContainer}>
          <Text style={styles.price}>₹{hotPick.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hotPick: {
    width: 140,
    height: 220,
    marginRight: 12,
    marginTop: 8,
    borderRadius: 16,
    backgroundColor: "white",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  discountBadge: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "#3498db",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderBottomRightRadius: 8,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  content: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subName: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  priceAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
  },
  addButton: {
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  addButtonText: {
    color: "#3498db",
    fontSize: 12,
    fontWeight: "bold",
  },
  imageContainer: {
    paddingTop: 25,
    height: 110,
  },
  image: {
    alignSelf: "center",
    height: 70,
    width: 128,
  },
  contentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default HotPickCard;
