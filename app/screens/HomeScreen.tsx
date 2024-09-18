import React from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Salad', icon: '🥗' },
  { name: 'Dessert', icon: '🍰' },
];

const restaurants = [
  { name: 'Pizza Palace', rating: 4.5, image: 'https://example.com/pizza-palace.jpg' },
  { name: 'Burger Barn', rating: 4.2, image: 'https://example.com/burger-barn.jpg' },
  { name: 'Sushi Spot', rating: 4.8, image: 'https://example.com/sushi-spot.jpg' },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">FoodApp</ThemedText>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color={Colors[colorScheme].text} />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.searchBar}>
        <Ionicons name="search-outline" size={20} color={Colors[colorScheme].text} />
        <ThemedText style={styles.searchText}>Search for restaurants or foods</ThemedText>
      </ThemedView>

      <ThemedView style={styles.categoriesContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Categories</ThemedText>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <ThemedText style={styles.categoryIcon}>{category.icon}</ThemedText>
              <ThemedText>{category.name}</ThemedText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.restaurantsContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Popular Restaurants</ThemedText>
        {restaurants.map((restaurant, index) => (
          <TouchableOpacity key={index} style={styles.restaurantItem}>
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
            <ThemedView style={styles.restaurantInfo}>
              <ThemedText type="defaultSemiBold">{restaurant.name}</ThemedText>
              <ThemedView style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <ThemedText>{restaurant.rating}</ThemedText>
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchText: {
    marginLeft: 8,
    color: '#888',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 12,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 12,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 4,
  },
  restaurantsContainer: {
    paddingHorizontal: 16,
  },
  restaurantItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  restaurantImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});