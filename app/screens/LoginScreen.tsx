import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { validateMobileNumber } from "@/utils/validation";

export default function LoginScreen() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const colorScheme = useColorScheme();

  const handleLogin = () => {
    if (validateMobileNumber(mobileNumber)) {
      // Navigate to OTP screen, passing the mobile number as a parameter
      router.push({
        pathname: "/authentication",
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
      <ThemedView style={styles.skipContainer}>
        <ThemedText onPress={handleSkip} style={styles.skipText}>
          Skip
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Log in or sign up
        </ThemedText>
        <ThemedView style={styles.mobileContainer}>
          <ThemedText style={styles.mobileText}>+91</ThemedText>
          <ThemedView style={styles.verticalLine} />
          <TextInput
            style={[styles.input]}
            placeholder="Enter your mobile number"
            placeholderTextColor={Colors[colorScheme ?? "light"].tabIconDefault}
            keyboardType="phone-pad"
            value={mobileNumber}
            cursorColor={"#22222280"}
            onChangeText={setMobileNumber}
          />
        </ThemedView>

        <TouchableOpacity style={[styles.button]} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </TouchableOpacity>
        <ThemedView style={styles.termsContainer}>
          <ThemedText style={styles.termsText}>
            By continuing, you agree to our{" "}
            <ThemedText style={styles.termsTextLink}>
              Terms of Service{" "}
            </ThemedText>
            and{" "}
            <ThemedText style={styles.termsTextLink}>Privacy Policy</ThemedText>
            .
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#FFD504",
  },
  content: {
    height: "60%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 36,
    paddingVertical: 30,
    backgroundColor: "white",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  skipContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    backgroundColor: "#22222280",
    borderRadius: 16,
    height: 33,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  skipText: {
    fontSize: 14,
    fontWeight: 600,
    color: "white",
    lineHeight: 18,
  },
  title: {
    fontSize: 24,
    color: "#222222",
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#007BFF",
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  termsContainer: {
    backgroundColor: "white",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  termsText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  termsTextLink: {
    color: "#007BFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  mobileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 30,
    height: 50,
  },
  verticalLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#000",
    marginHorizontal: 10,
  },
  input: {
    width: "86%",
    height: 50,
    paddingHorizontal: 5,
    fontSize: 16,
    color: "#4A4A4A",
  },
  mobileText: {
    fontSize: 16,
    fontWeight: 400,
    color: "#4A4A4A",
  },
});
