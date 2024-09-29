import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface CuisineCardProps {
  name: string;
  image: any; // Using 'any' for simplicity, but ideally use a more specific type
  onPress: () => void;
}

export default function CuisineCard({
  cuisine,
}: {
  cuisine: CuisineCardProps;
}) {
  const { name, image, onPress } = cuisine;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      accessibilityLabel={`${name} cuisine`}
    >
      <Image source={image} width={76} height={45} resizeMode="cover" />
      <Text style={styles.name}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 16,
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "white",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
});
