
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Biometric() {
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [message, setMessage] = useState(
    "Verify your identity to continue"
  );
  const [attempt, setAttempt] = useState(0);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const verifyUser = async () => {
        setChecking(true);
        setAuthenticated(false);

        try {
          const enabled =
            await AsyncStorage.getItem("biometricEnabled");

          const loggedIn = await AsyncStorage.getItem("user");

          if (!active) return;

          if (loggedIn !== "true") {
            router.replace("/loginscreen");
            return;
          }

          if (enabled !== "true") {
            router.replace("/(drawer)/(tabs)");
            return;
          }

          const hasHardware =
            await LocalAuthentication.hasHardwareAsync();

          const enrolled =
            await LocalAuthentication.isEnrolledAsync();

          if (!active) return;

          if (!hasHardware || !enrolled) {
            setMessage(
              "Biometrics are unavailable. Enable them in your device settings."
            );
            return;
          }

          const result =
            await LocalAuthentication.authenticateAsync({
              promptMessage: "Unlock Medicare",
              cancelLabel: "Cancel",
              disableDeviceFallback: true,
            });

          if (!active) return;

          if (result.success) {
            setAuthenticated(true);
            router.replace("/(drawer)/(tabs)");
          } else {
            setMessage(
              "Authentication was unsuccessful. Please try again."
            );
          }
        } catch (error) {
          if (active) {
            setMessage(
              "Unable to verify your identity. Please try again."
            );
          }
        } finally {
          if (active) setChecking(false);
        }
      };

      verifyUser();

      return () => {
        active = false;
      };
    }, [attempt])
  );

  const retryAuthentication = () => {
    setMessage("Verify your identity to continue");
    setAttempt((previous) => previous + 1);
  };

  const goToLogin = async () => {
    await AsyncStorage.setItem("user", "false");
    router.replace("/loginscreen");
  };

  if (checking) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#07745e" />
        <Text style={styles.message}>
          Verifying your identity...
        </Text>
      </SafeAreaView>
    );
  }

  // Do not render protected content while authentication is pending
  // or unsuccessful.
  if (authenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="fingerprint"
          size={100}
          color="#07745e"
        />

        <Text style={styles.title}>Unlock Medicare</Text>

        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={retryAuthentication}
        >
          <MaterialCommunityIcons
            name="fingerprint"
            size={25}
            color="white"
          />
          <Text style={styles.buttonText}>
            Try Again
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={goToLogin}
        >
          <Text style={styles.cancelText}>
            Go to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F2FAF6",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    backgroundColor: "#F2FAF6",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#07745e",
  },
  message: {
    fontSize: 16,
    color: "#565B67",
    textAlign: "center",
    lineHeight: 24,
  },
  button: {
    width: 250,
    height: 58,
    backgroundColor: "#6CAA84",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    padding: 12,
  },
  cancelText: {
    color: "#07745e",
    fontSize: 16,
    fontWeight: "600",
  },
});
