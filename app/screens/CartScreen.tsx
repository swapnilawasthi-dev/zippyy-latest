import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
}

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Litti Chokha",
      price: 499,
      quantity: 2,
      restaurant: "Lit Hai Chokha",
    },
    {
      id: "2",
      name: "Litti Chokha",
      price: 499,
      quantity: 2,
      restaurant: "Lit Hai Chokha",
    },
  ]);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const totalSavings = 100; // This should be calculated based on your business logic
  const deliveryAddress = "L-302 Jhansi Ho...";
  const deliveryTime = "15 minutes";
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: string, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={styles.cartItem}>
      <View style={styles.itemHeader}>
        <Text style={styles.restaurantName}>{item.restaurant}</Text>
      </View>
      <View style={styles.itemDetails}>
        <View style={styles.itemInfo}>
          <Ionicons name="leaf-outline" size={16} color="green" />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
        <View style={styles.itemPriceQuantity}>
          <Text style={styles.itemPrice}>₹{item.price}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.itemTotal}>
        <Text style={styles.itemTotalText}>₹{item.price * item.quantity}</Text>
      </View>
      <TouchableOpacity
        style={styles.addNoteButton}
        onPress={() => {
          setActiveItemId(item.id);
          setNoteModalVisible(true);
        }}
      >
        <Ionicons name="create-outline" size={16} color="#007AFF" />
        <Text style={styles.addNoteText}>Add Note</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            Cart ({cartItems.length} items)
          </Text>
        </View>

        <View style={styles.savingsBanner}>
          <Text style={styles.savingsText}>
            Yayyy! You saved ₹{totalSavings} on this order
          </Text>
        </View>

        {cartItems.map(renderCartItem)}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          <TouchableOpacity style={styles.detailItem}>
            <Ionicons name="location-outline" size={24} color="#007AFF" />
            <View style={styles.detailText}>
              <Text style={styles.detailTitle}>Delivering to Home</Text>
              <Text style={styles.detailSubtitle}>{deliveryAddress}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
          </TouchableOpacity>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={24} color="#007AFF" />
            <Text style={styles.detailTitle}>Delivering in {deliveryTime}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bill Details</Text>
          <TouchableOpacity style={styles.detailItem}>
            <Text style={styles.detailTitle}>
              To Pay (incl. all taxes and charges)
            </Text>
            <View style={styles.detailText}>
              <Text style={styles.detailTitle}>₹{totalAmount}</Text>
              <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>
              Payment Method: Cash On Delivery
            </Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          Review your order and address details to avoid cancellations
        </Text>

        <TouchableOpacity style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>Slide to Place Order</Text>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={noteModalVisible}
        onRequestClose={() => setNoteModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add cooking instructions</Text>
              <TouchableOpacity onPress={() => setNoteModalVisible(false)}>
                <Ionicons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.noteInput}
              multiline
              placeholder="Enter your cooking instructions here..."
              value={note}
              onChangeText={setNote}
              maxLength={100}
            />
            <Text style={styles.charCount}>{note.length}/100</Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => {
                // Here you would typically save the note to the respective cart item
                console.log(`Saving note for item ${activeItemId}: ${note}`);
                setNoteModalVisible(false);
              }}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
  },
  savingsBanner: {
    backgroundColor: "#FFD700",
    padding: 12,
    alignItems: "center",
  },
  savingsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItem: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
  },
  itemHeader: {
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemName: {
    marginLeft: 8,
    fontSize: 16,
  },
  itemPriceQuantity: {
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginTop: 4,
  },
  quantityButton: {
    fontSize: 18,
    color: "#007AFF",
    paddingHorizontal: 8,
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 8,
  },
  itemTotal: {
    alignItems: "flex-end",
    marginTop: 8,
  },
  itemTotalText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addNoteButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  addNoteText: {
    color: "#007AFF",
    marginLeft: 4,
  },
  section: {
    backgroundColor: "white",
    marginTop: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  detailText: {
    flex: 1,
    marginLeft: 8,
  },
  detailTitle: {
    fontSize: 16,
  },
  detailSubtitle: {
    fontSize: 14,
    color: "#8E8E93",
  },
  disclaimer: {
    margin: 16,
    textAlign: "center",
    color: "#8E8E93",
  },
  placeOrderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007AFF",
    margin: 16,
    padding: 16,
    borderRadius: 8,
  },
  placeOrderText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noteInput: {
    height: 100,
    borderColor: "#C7C7CC",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  charCount: {
    textAlign: "right",
    color: "#8E8E93",
  },
  doneButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartScreen;
