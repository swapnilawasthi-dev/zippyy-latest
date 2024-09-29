import { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import OTPField from "@/components/OTPField";

export default function AuthenticationScreen() {
  const router = useRouter();
  const { mobileNumber } = useLocalSearchParams<{ mobileNumber: string }>();
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleResend = () => {
    if (canResend) {
      // Resend Logic
      setCountdown(20);
      setCanResend(false);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.length === 4) {
      Alert.alert("Success", "OTP verified successfully!", [
        { text: "OK", onPress: () => router.replace("/(tabs)") },
      ]);
    } else {
      Alert.alert("Invalid OTP", "Please enter a valid 4-digit OTP");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.backContainer}>
        <ThemedText onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </ThemedText>
      </ThemedView>
      <ThemedText type="title" style={styles.title}>
        Verification
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Enter OTP sent to {mobileNumber}
      </ThemedText>
      <OTPField value={otp} setValue={(value: any) => setOtp(value)} />

      <TouchableOpacity style={[styles.button]} onPress={handleVerifyOTP}>
        <ThemedText style={styles.buttonText}>Verify</ThemedText>
      </TouchableOpacity>
      <ThemedText style={styles.subtitle}>
        Didn't receive the OTP?{" "}
        <ThemedText
          style={[styles.link, !canResend && styles.disabledLink]}
          onPress={handleResend}
        >
          Resend
        </ThemedText>{" "}
        {countdown > 0 ? `in ${countdown} seconds` : ""}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    marginTop: 100,
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 20,
    color: "#222222",
    textAlign: "center",
  },
  subtitle: {
    marginBottom: 20,
    textAlign: "center",
    color: "#222222",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 40,
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
  link: {
    color: "#007BFF",
    textDecorationLine: "underline",
  },
  backContainer: {
    position: "absolute",
    top: 70,
    left: 20,
    backgroundColor: "#22222280",
    borderRadius: 16,
    height: 33,
    width: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledLink: {
    color: "#AAAAAA",
    // textDecorationLine: "none",
  },
});
