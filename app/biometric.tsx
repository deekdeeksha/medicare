
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const BIOMETRIC_KEY = "biometricEnabled";

export default function Biometric() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    const checkBiometric = async () => {
      try {
        const enabled = await AsyncStorage.getItem(BIOMETRIC_KEY);

        // This screen must not be accessible while biometrics are disabled.
        if (enabled !== "true") {
          router.replace("/biometricset");
          return;
        }

        const enrolled =
          await LocalAuthentication.isEnrolledAsync();

        if (!enrolled) {
          await AsyncStorage.setItem(BIOMETRIC_KEY, "false");

          if (active) {
            Alert.alert(
              "Biometrics unavailable",
              "Please enable biometrics again from settings."
            );
            router.replace("/biometricset");
          }
          return;
        }

        const result =
          await LocalAuthentication.authenticateAsync({
            promptMessage: "Authenticate to continue",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
          });

        if (!active) return;

        if (result.success) {
          setAuthenticated(true);
        } else {
          // Do not leave the protected screen open after cancellation
          // or unsuccessful authentication.
          router.replace("/biometricset");
        }
      } catch (error) {
        if (active) {
          Alert.alert(
            "Authentication error",
            "Unable to verify your biometrics."
          );
          router.replace("/biometricset");
        }
      } finally {
        if (active) setChecking(false);
      }
    };

    checkBiometric();

    return () => {
      active = false;
    };
  }, [router]);

  const turnOffBiometric = async () => {
    try {
      await AsyncStorage.setItem(BIOMETRIC_KEY, "false");
      setAuthenticated(false);

      router.replace("/biometricset");
    } catch (error) {
      Alert.alert("Error", "Unable to turn off biometrics.");
    }
  };

  if (checking) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#07745e" />
        <Text style={styles.loadingText}>
          Verifying your identity...
        </Text>
      </View>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <ImageBackground
      source={require("../../assets/images/biometricbg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <MaterialCommunityIcons
            name="shield-check"
            size={90}
            color="#07745e"
          />

          <Text style={styles.title}>
            Biometric Authentication
          </Text>

          <Text style={styles.subtitle}>
            Your identity has been verified successfully.
          </Text>

          <View style={styles.statusBox}>
            <MaterialCommunityIcons
              name="fingerprint"
              size={32}
              color="#07745e"
            />
            <Text style={styles.statusText}>
              Biometric authentication is enabled
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={turnOffBiometric}
          >
            <Text style={styles.buttonText}>
              Turn Off Biometric
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#07745e",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#565B67",
    textAlign: "center",
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    elevation: 5,
  },
  statusText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#07745e",
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#6CAA84",
    borderRadius: 10,
    height: 55,
    width: 250,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#07745e",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: "#07745e",
  },
});
