import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Define types
type MenuItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  discount?: number;
};

type Category = {
  id: string;
  name: string;
};

// Sample data
const categories: Category[] = [
  { id: "1", name: "All" },
  { id: "2", name: "North Indian" },
  { id: "3", name: "Burger" },
  { id: "4", name: "Pizza" },
];

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Litti Chokha",
    price: 499,
    rating: 4.8,
    reviewCount: 50,
    image: "https://example.com/litti-chokha.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    discount: 15,
  },
  // Add more menu items here
];

const RestaurantScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      {item.discount && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>{item.discount}% OFF</Text>
        </View>
      )}
      <Text style={styles.menuItemName}>{item.name}</Text>
      <Text style={styles.menuItemPrice}>₹{item.price}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={16} color="#FFD700" />
        <Text style={styles.rating}>{item.rating}</Text>
        <Text style={styles.reviewCount}>({item.reviewCount})</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>ADD</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: "https://example.com/restaurant-image.jpg" }}
          style={styles.headerImage}
        />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>Lit Hai Chokha</Text>
          <Text style={styles.cuisineType}>North Indian</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#4CAF50" />
            <Text style={styles.rating}>5.0</Text>
            <Text style={styles.reviewCount}>(32 ratings)</Text>
          </View>
          <Text style={styles.freeDelivery}>FREE DELIVERY</Text>
        </View>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <FlatList
          data={menuItems.filter((item) => item.discount)}
          renderItem={renderMenuItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.featuredItems}
        />
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.categories}
        />
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          style={styles.menuItems}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalItemName}>{selectedItem.name}</Text>
                <Text style={styles.modalItemDescription}>
                  {selectedItem.description}
                </Text>
                <Text style={styles.modalItemPrice}>₹{selectedItem.price}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerImage: {
    width: "100%",
    height: 200,
  },
  restaurantInfo: {
    padding: 16,
    backgroundColor: "white",
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cuisineType: {
    fontSize: 16,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: "#666",
    marginLeft: 4,
  },
  freeDelivery: {
    marginTop: 8,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
  },
  featuredItems: {
    marginBottom: 16,
  },
  categories: {
    backgroundColor: "white",
    paddingVertical: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#3498db",
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    color: "#3498db",
    fontWeight: "bold",
  },
  menuItems: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  menuItemImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuItemPrice: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "white",
    borderColor: "#3498db",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  addButtonText: {
    color: "#3498db",
    fontWeight: "bold",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#3498db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalItemName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalItemDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  modalItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#3498db",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RestaurantScreen;
