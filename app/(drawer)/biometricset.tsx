
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boxes from "../../components/bioboxes";

export default function BiometricSet() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadSetting = async () => {
        try {
          const value =
            await AsyncStorage.getItem("biometricEnabled");

          if (active) setEnabled(value === "true");
        } catch {
          Alert.alert("Error", "Unable to load biometric settings.");
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
      const hardware =
        await LocalAuthentication.hasHardwareAsync();

      const enrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!hardware || !enrolled) {
        Alert.alert(
          "Biometrics unavailable",
          "Your device must support biometrics and have a fingerprint or Face ID enrolled."
        );
        return;
      }

      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Enable Medicare biometrics",
          cancelLabel: "Cancel",
          disableDeviceFallback: true,
        });

      if (!result.success) {
        Alert.alert(
          "Not enabled",
          "Biometric verification was unsuccessful."
        );
        return;
      }

      await AsyncStorage.setItem("biometricEnabled", "true");
      setEnabled(true);

      // Open the biometric verification screen after enabling.
      router.push("/biometric");
    } catch {
      Alert.alert("Error", "Could not enable biometrics.");
    } finally {
      setProcessing(false);
    }
  };

  const disableBiometric = async () => {
    if (!enabled || processing) return;

    setProcessing(true);

    try {
      await AsyncStorage.setItem("biometricEnabled", "false");
      setEnabled(false);

      Alert.alert(
        "Biometrics disabled",
        "You can now open Medicare without biometric verification."
      );
    } catch {
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
              Use your fingerprint to protect your medicines
              and personal information.
            </Text>
          </View>

          <View style={styles.c2}>
            <Boxes
              icon="shield-check-outline"
              iconSize={30}
              iconColor="#07745e"
              iconBg="#DFF5E5"
              title="Quick Access"
              subtitle="Verify your identity to access Medicare"
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
                >
                  {processing ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.enableText}>
                      {enabled
                        ? "✓ Biometric Enabled"
                        : "Enable Biometric"}
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={disableBiometric}
                  disabled={!enabled || processing}
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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 10,
    gap: 15,
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
  },
  h3: {
    fontSize: 14,
    textAlign: "center",
    color: "#565B67",
    fontWeight: "600",
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
    borderWidth: 1,
    borderColor: "#6CAA84",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  enableButton: {
    backgroundColor: "#6CAA84",
  },
  disabledButton: {
    backgroundColor: "#A8B9AF",
    borderColor: "#A8B9AF",
    opacity: 0.8,
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
    fontSize: 14,
    color: "#565B67",
    fontWeight: "600",
  },
});
