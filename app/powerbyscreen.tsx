
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PowerByScreen() {
  useFocusEffect(
    useCallback(() => {
      let active = true;

      const timer = setTimeout(async () => {
        try {
          const userLogged = await AsyncStorage.getItem("user");
          const biometricEnabled =
            await AsyncStorage.getItem("biometricEnabled");

          if (!active) return;

          if (userLogged === "true") {
            if (biometricEnabled === "true") {
              // Biometric authentication is enabled.
              router.replace("/biometric");
            } else {
              // Biometrics are disabled.
              router.replace("/(drawer)/(tabs)");
            }
          } else {
            router.replace("/loginscreen");
          }
        } catch (error) {
          if (active) {
            router.replace("/loginscreen");
          }
        }
      }, 3000);

      return () => {
        active = false;
        clearTimeout(timer);
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.h1}>Powered By</Text>

        <Image
          source={require("../assets/images/our_logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "90%",
    height: 400,
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 5,
  },
  h1: {
    fontSize: 40,
    textTransform: "capitalize",
    fontWeight: "bold",
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
