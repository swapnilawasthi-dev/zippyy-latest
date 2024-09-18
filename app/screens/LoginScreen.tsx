import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { validateMobileNumber } from "@/utils/validation"; // Assume this function exists

export default function LoginScreen() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    if (validateMobileNumber(mobileNumber)) {
      // Navigate to OTP screen, passing the mobile number as a parameter
      router.push({
        pathname: "/otp",
        params: { mobileNumber },
      });
    } else {
      // Show an error message if the mobile number is invalid
      Alert.alert(
        "Invalid mobile number",
        "Please enter a valid mobile number"
      );
    }
  };

  const handleSkip = () => {
    router.replace("/home");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText onPress={handleSkip} style={styles.skipText}>Skip</ThemedText>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Log in or sign up
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              color: Colors[colorScheme ?? "light"].text,
              borderColor: Colors[colorScheme ?? "light"].text,
            },
          ]}
          placeholder="Enter your mobile number"
          placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
          keyboardType="phone-pad"
          value={mobileNumber}
          onChangeText={setMobileNumber}
        />
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: Colors[colorScheme ?? "light"].tint },
          ]}
          onPress={handleLogin}
        >
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:StatusBar.currentHeight,
    backgroundColor: "#FFD504",
  },
  content: {
    height: "65%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  skipText: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#22222280",
    padding: 10,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});
