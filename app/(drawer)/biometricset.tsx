
import { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { useFocusEffect, useRouter } from "expo-router";
import Boxes from "../../components/bioboxes";

const BIOMETRIC_KEY = "biometricEnabled";

export default function BiometricSet() {
  const router = useRouter();

  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // Load the saved biometric setting whenever this screen is focused.
  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadSetting = async () => {
        try {
          const value = await AsyncStorage.getItem(BIOMETRIC_KEY);

          if (active) {
            setEnabled(value === "true");
          }
        } catch (error) {
          Alert.alert("Error", "Could not load biometric settings.");
        } finally {
          if (active) setLoading(false);
        }
      };

      loadSetting();

      return () => {
        active = false;
      };
    }, [])
  );

  const enableBiometric = async () => {
    if (enabled || processing) return;

    setProcessing(true);

    try {
      const hardwareAvailable =
        await LocalAuthentication.hasHardwareAsync();

      if (!hardwareAvailable) {
        Alert.alert(
          "Not supported",
          "Your device does not support biometric authentication."
        );
        return;
      }

      const enrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!enrolled) {
        Alert.alert(
          "No biometrics enrolled",
          "Please register your fingerprint or Face ID in your device settings first."
        );
        return;
      }

      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Enable biometric authentication",
          cancelLabel: "Cancel",
          disableDeviceFallback: true,
        });

      if (!result.success) {
        Alert.alert(
          "Authentication cancelled",
          "Biometric authentication was not enabled."
        );
        return;
      }

      await AsyncStorage.setItem(BIOMETRIC_KEY, "true");
      setEnabled(true);

      // Navigate only after authentication succeeds and the setting is saved.
      router.push("/biometric");
    } catch (error) {
      Alert.alert(
        "Error",
        "Unable to enable biometric authentication."
      );
    } finally {
      setProcessing(false);
    }
  };

  const disableBiometric = async () => {
    if (processing) return;

    setProcessing(true);

    try {
      await AsyncStorage.setItem(BIOMETRIC_KEY, "false");
      setEnabled(false);

      Alert.alert(
        "Biometrics disabled",
        "Biometric authentication has been turned off."
      );
    } catch (error) {
      Alert.alert("Error", "Could not disable biometrics.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/biometricbg.jpg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.c1}>
            <Image
              source={require("../../assets/images/biometric.jpg")}
              style={styles.image}
            />

            <Text style={styles.h1}>Secure Your Account</Text>

            <Text style={styles.h3}>
              Use your fingerprint or Face ID to protect your
              medicines and personal information.
            </Text>
          </View>

          <View style={styles.c2}>
            <Boxes
              icon="shield-check-outline"
              iconSize={30}
              iconColor="#07745e"
              iconBg="#DFF5E5"
              title="Quick Access"
              subtitle="Unlock supported features using biometrics"
              titlesize={18}
              subtitlesize={14}
              subtitlecolor="#595F64"
            />

            <Boxes
              icon="lock-outline"
              iconSize={30}
              iconColor="#07745e"
              iconBg="#DFF5E5"
              title="Enhanced Security"
              subtitle="Protect access to your personal information"
              titlesize={18}
              subtitlesize={14}
              subtitlecolor="#595F64"
            />

            {loading ? (
              <ActivityIndicator size="large" color="#07745e" />
            ) : (
              <>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.enableButton,
                    enabled && styles.disabledButton,
                  ]}
                  onPress={enableBiometric}
                  disabled={enabled || processing}
                  activeOpacity={0.8}
                >
                  {processing ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.enableText}>
                      {enabled
                        ? "✓ Biometric Enabled"
                        : "♧ Enable Biometric"}
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.disableButton]}
                  onPress={disableBiometric}
                  disabled={processing || !enabled}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.disableText,
                      !enabled && styles.disabledText,
                    ]}
                  >
                    Turn Off Biometric
                  </Text>
                </TouchableOpacity>

                <Text style={styles.status}>
                  Status: {enabled ? "Enabled" : "Disabled"}
                </Text>
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    gap: 15,
    flexGrow: 1,
  },
  c1: {
    minHeight: 200,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    borderRadius: 10,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "white",
  },
  h1: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#07745e",
    marginTop: 8,
  },
  h3: {
    fontSize: 14,
    textAlign: "center",
    color: "#565B67",
    fontWeight: "600",
    marginTop: 8,
  },
  c2: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 10,
    elevation: 10,
    gap: 20,
  },
  button: {
    width: 280,
    minHeight: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  enableButton: {
    backgroundColor: "#6CAA84",
  },
  disabledButton: {
    backgroundColor: "#A8B9AF",
    opacity: 0.75,
  },
  disableButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#6CAA84",
  },
  enableText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  disableText: {
    color: "#6CAA84",
    fontSize: 18,
    fontWeight: "600",
  },
  disabledText: {
    color: "#A0A0A0",
  },
  status: {
    color: "#565B67",
    fontSize: 14,
    fontWeight: "600",
  },
});
