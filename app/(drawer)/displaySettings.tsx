import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ESP32_IP = "192.168.4.1";
const BASE_URL = `http://${ESP32_IP}`;

type SleepOption = {
  label: string;
  value: number;
};

const SLEEP_OPTIONS: SleepOption[] = [
  { label: "30 sec", value: 30 },
  { label: "1 min", value: 60 },
  { label: "5 min", value: 300 },
];

export default function DisplaySettings() {
  const [brightness, setBrightness] = useState(100);
  const [message, setMessage] = useState("");
  const [sleepSeconds, setSleepSeconds] = useState(60);
  const [connected, setConnected] = useState(false);
  const [displaySleeping, setDisplaySleeping] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendCommand = useCallback(
    async (path: string) => {
      const response = await fetch(`${BASE_URL}${path}`);

      if (!response.ok) {
        throw new Error(`ESP32 returned ${response.status}`);
      }

      return response;
    },
    []
  );

  const checkConnection = useCallback(async () => {
    try {
      const response = await sendCommand("/status");
      const data = await response.json();

      setConnected(true);

      if (typeof data.brightness === "number") {
        setBrightness(data.brightness);
      }

      if (typeof data.sleepSeconds === "number") {
        setSleepSeconds(data.sleepSeconds);
      }

      if (typeof data.sleeping === "boolean") {
        setDisplaySleeping(data.sleeping);
      }
    } catch {
      setConnected(false);
    }
  }, [sendCommand]);

  useEffect(() => {
    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, [checkConnection]);

  const runAction = async (
    path: string,
    successMessage: string,
    onSuccess?: () => void
  ) => {
    if (loading) return;

    setLoading(true);

    try {
      await sendCommand(path);
      onSuccess?.();
      Alert.alert("Success", successMessage);
      checkConnection();
    } catch {
      setConnected(false);

      Alert.alert(
        "Connection Error",
        "Could not communicate with the ESP32. Connect your phone to MEDICARE_ESP32 and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // BRIGHTNESS: ESP32 accepts 0-100
  const changeBrightness = async (value: number) => {
    const next = Math.max(0, Math.min(100, value));

    if (loading) return;

    setLoading(true);

    try {
      await sendCommand(`/brightness?value=${next}`);

      setBrightness(next);

      if (next > 0) {
        setDisplaySleeping(false);
      }
    } catch {
      setConnected(false);

      Alert.alert(
        "Brightness Error",
        "Could not update the TFT brightness."
      );
    } finally {
      setLoading(false);
    }
  };

  // CUSTOM MESSAGE
  const showMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) {
      Alert.alert("Message Required", "Please enter a message first.");
      return;
    }

    runAction(
      `/text?value=${encodeURIComponent(trimmed)}`,
      "Your message was sent to the TFT.",
      () => setDisplaySleeping(false)
    );
  };

  const clearMessage = () => {
    runAction("/clear", "Display message cleared.");
  };

  // AUTOMATIC SLEEP
  const saveSleep = () => {
    runAction(
      `/sleep?seconds=${sleepSeconds}`,
      `Automatic sleep timeout set to ${sleepSeconds} seconds.`
    );
  };

  // WAKE DISPLAY
  const wakeDisplay = () => {
    runAction(
      "/wake",
      "Wake command sent to the TFT.",
      () => setDisplaySleeping(false)
    );
  };

  // MANUAL DISPLAY OFF
  const turnDisplayOff = () => {
    runAction(
      "/displayoff",
      "Display-off command sent.",
      () => setDisplaySleeping(true)
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="monitor"
              size={29}
              color="#2563EB"
            />
          </View>

          <Text style={styles.title}>Display Settings</Text>

          <Text style={styles.subtitle}>
            Manage your Medicare dispenser display
          </Text>
        </View>

        {/* CONNECTION */}
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="wifi"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>ESP32 Connection</Text>
              <Text style={styles.muted}>{ESP32_IP}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                connected ? styles.online : styles.offline,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  {
                    color: connected ? "#15803D" : "#B91C1C",
                  },
                ]}
              >
                {connected ? "Connected" : "Disconnected"}
              </Text>
            </View>
          </View>

          <Pressable
            style={styles.refreshButton}
            onPress={checkConnection}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={17}
              color="#2563EB"
            />
            <Text style={styles.refreshText}>Check Connection</Text>
          </Pressable>
        </View>

        {/* BRIGHTNESS */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="brightness-6"
                size={24}
                color="#D97706"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>TFT Brightness</Text>
              <Text style={styles.muted}>
                Choose a preset or adjust manually
              </Text>
            </View>

            <Text style={styles.value}>{brightness}%</Text>
          </View>

          <View style={styles.presetRow}>
            {[0, 25, 50, 100].map((value) => (
              <Pressable
                key={value}
                disabled={loading}
                style={[
                  styles.presetButton,
                  brightness === value && styles.presetSelected,
                ]}
                onPress={() => changeBrightness(value)}
              >
                <Text
                  style={[
                    styles.presetText,
                    brightness === value && styles.presetTextSelected,
                  ]}
                >
                  {value}%
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.adjustRow}>
            <Pressable
              style={styles.adjustButton}
              disabled={loading}
              onPress={() => changeBrightness(brightness - 10)}
            >
              <MaterialCommunityIcons
                name="minus"
                size={25}
                color="#2563EB"
              />
            </Pressable>

            <View style={styles.flex}>
              <Text style={styles.adjustTitle}>Manual adjustment</Text>
              <Text style={styles.muted}>Change by 10%</Text>
            </View>

            <Pressable
              style={styles.adjustButton}
              disabled={loading}
              onPress={() => changeBrightness(brightness + 10)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={25}
                color="#2563EB"
              />
            </Pressable>
          </View>

          <Text style={styles.note}>
            Note: 0% turns the backlight brightness to zero. Use Display Off
            for the dedicated display-off command.
          </Text>
        </View>

        {/* CUSTOM MESSAGE */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Custom Display Message</Text>
              <Text style={styles.muted}>
                Send a message to your TFT
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter your message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            maxLength={100}
            multiline
          />

          <Text style={styles.characterCount}>
            {message.length}/100 characters
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={[styles.button, styles.primary, styles.flex]}
              onPress={showMessage}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="monitor-eye"
                size={19}
                color="#FFFFFF"
              />
              <Text style={styles.primaryText}>Show Message</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.secondary, styles.flex]}
              onPress={clearMessage}
              disabled={loading}
            >
              <MaterialCommunityIcons
                name="broom"
                size={19}
                color="#374151"
              />
              <Text style={styles.secondaryText}>Clear</Text>
            </Pressable>
          </View>
        </View>

        {/* AUTOMATIC SLEEP */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Automatic Display Sleep</Text>
              <Text style={styles.muted}>
                Sleep after touchscreen inactivity
              </Text>
            </View>
          </View>

          <View style={styles.sleepOptions}>
            {SLEEP_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.sleepOption,
                  sleepSeconds === option.value &&
                    styles.sleepOptionSelected,
                ]}
                onPress={() => setSleepSeconds(option.value)}
              >
                <Text
                  style={[
                    styles.sleepOptionText,
                    sleepSeconds === option.value &&
                      styles.sleepOptionTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={[styles.button, styles.primary, styles.fullButton]}
            onPress={saveSleep}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name="content-save-outline"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.primaryText}>Save Auto-Sleep</Text>
          </Pressable>

          <Text style={styles.note}>
            This sets the inactivity timeout. It does not automatically wake
            the TFT after the selected number of seconds.
          </Text>
        </View>

        {/* DISPLAY POWER */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View
              style={[
                styles.iconBox,
                { backgroundColor: "#FEF2F2" },
              ]}
            >
              <MaterialCommunityIcons
                name="monitor-off"
                size={24}
                color="#DC2626"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Display Power</Text>
              <Text style={styles.muted}>
                Switch the TFT off or wake it
              </Text>
            </View>
          </View>

          <View style={styles.powerStatus}>
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: displaySleeping
                    ? "#DC2626"
                    : "#16A34A",
                },
              ]}
            />

            <Text style={styles.powerStatusText}>
              {displaySleeping
                ? "Off / sleeping command reported"
                : "Awake command reported"}
            </Text>
          </View>

          <Pressable
            style={[styles.button, styles.danger, styles.fullButton]}
            onPress={turnDisplayOff}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name="power"
              size={21}
              color="#B91C1C"
            />
            <Text style={styles.dangerText}>Turn Display Off</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.blueLight, styles.fullButton]}
            onPress={wakeDisplay}
            disabled={loading}
          >
            <MaterialCommunityIcons
              name="monitor"
              size={21}
              color="#1D4ED8"
            />
            <Text style={styles.blueText}>Wake Display</Text>
          </Pressable>

          <Text style={styles.note}>
            The status shown here reflects the ESP32's software state. It
            cannot confirm the physical backlight is actually off.
          </Text>
        </View>

        {/* LOADING */}
        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text style={styles.muted}>Sending command to ESP32...</Text>
          </View>
        )}

        <Text style={styles.footer}>
          MEDICARE • Display Controller
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  container: {
    padding: 18,
    paddingBottom: 35,
  },

  header: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 24,
  },

  headerIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9EDF3",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 17,
  },

  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  flex: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  muted: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  value: {
    color: "#2563EB",
    fontSize: 18,
    fontWeight: "700",
  },

  statusBadge: {
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  online: {
    backgroundColor: "#DCFCE7",
  },

  offline: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  refreshText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },

  presetRow: {
    flexDirection: "row",
    gap: 8,
  },

  presetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },

  presetSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  presetText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },

  presetTextSelected: {
    color: "#FFFFFF",
  },

  adjustRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 17,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },

  adjustButton: {
    width: 46,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  adjustTitle: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },

  input: {
    minHeight: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
    backgroundColor: "#FAFAFA",
  },

  characterCount: {
    textAlign: "right",
    color: "#9CA3AF",
    fontSize: 11,
    marginTop: 5,
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },

  button: {
    minHeight: 47,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  primary: {
    backgroundColor: "#2563EB",
  },

  primaryText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },

  secondary: {
    backgroundColor: "#F3F4F6",
  },

  secondaryText: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
  },

  sleepOptions: {
    flexDirection: "row",
    gap: 8,
  },

  sleepOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },

  sleepOptionSelected: {
    backgroundColor: "#EFF6FF",
    borderColor: "#2563EB",
  },

  sleepOptionText: {
    color: "#374151",
    fontSize: 12,
    fontWeight: "500",
  },

  sleepOptionTextSelected: {
    color: "#1D4ED8",
    fontWeight: "700",
  },

  fullButton: {
    width: "100%",
    marginTop: 12,
  },

  blueLight: {
    backgroundColor: "#EFF6FF",
  },

  blueText: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "600",
  },

  danger: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  dangerText: {
    color: "#B91C1C",
    fontSize: 14,
    fontWeight: "600",
  },

  powerStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 12,
    marginBottom: 5,
  },

  statusDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },

  powerStatusText: {
    fontSize: 12,
    color: "#4B5563",
    flex: 1,
  },

  note: {
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
    marginTop: 12,
  },

  loadingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 5,
  },
});