import { useState } from 'react';
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthenticationScreen() {
  const router = useRouter();
  const { mobileNumber } = useLocalSearchParams<{ mobileNumber: string }>();
  const [otp, setOtp] = useState('');
  const colorScheme = useColorScheme();

  const handleVerifyOTP = () => {
    // TODO: Implement OTP verification logic
    if (otp.length === 6) {
      // For now, we'll just simulate a successful verification
      Alert.alert('Success', 'OTP verified successfully!', [
        { text: 'OK', onPress: () => router.replace('/home') }
      ]);
    } else {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Verify OTP</ThemedText>
      <ThemedText style={styles.subtitle}>
        Enter the 6-digit code sent to {mobileNumber}
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].text }
        ]}
        placeholder="Enter OTP"
        placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
        onPress={handleVerifyOTP}
      >
        <ThemedText style={styles.buttonText}>Verify OTP</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});