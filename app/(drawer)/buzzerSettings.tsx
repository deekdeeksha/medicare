
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ESP32_IP = "192.168.4.1";
const BASE_URL = `http://${ESP32_IP}`;

type Pattern = {
  id: number;
  name: string;
  icon:
    | "bell-outline"
    | "metronome"
    | "alarm-bell"
    | "bell-ring-outline"
    | "alarm-light-outline"
    | "volume-high";
};

const PATTERNS: Pattern[] = [
  { id: 0, name: "Single Beep", icon: "bell-outline" },
  { id: 1, name: "Slow Beeps", icon: "metronome" },
  { id: 2, name: "Fast Beeps", icon: "alarm-bell" },
  { id: 3, name: "Double Beep", icon: "bell-ring-outline" },
  { id: 4, name: "SOS Pattern", icon: "alarm-light-outline" },
  { id: 5, name: "Continuous", icon: "volume-high" },
];

export default function BuzzerSettings() {
  const [connected, setConnected] = useState(false);
  const [volume, setVolume] = useState(70);
  const [pattern, setPattern] = useState(1);
  const [muted, setMuted] = useState(false);
  const [onMs, setOnMs] = useState(200);
  const [offMs, setOffMs] = useState(300);
  const [loading, setLoading] = useState(false);
  const [testing, setTesting] = useState(false);

  const request = useCallback(async (path: string) => {
    const response = await fetch(`${BASE_URL}${path}`);

    if (!response.ok) {
      throw new Error(`ESP32 returned ${response.status}`);
    }

    return response;
  }, []);

  const checkConnection = useCallback(async () => {
    try {
      await request("/status");
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, [request]);

  useEffect(() => {
    checkConnection();

    const timer = setInterval(checkConnection, 5000);

    return () => clearInterval(timer);
  }, [checkConnection]);

  const send = async (
    path: string,
    successMessage: string,
    onSuccess?: () => void
  ) => {
    if (loading) return;

    setLoading(true);

    try {
      await request(path);
      onSuccess?.();
      Alert.alert("Success", successMessage);
    } catch {
      setConnected(false);

      Alert.alert(
        "Connection Error",
        "Could not communicate with the ESP32. Connect your phone to MEDICARE_ESP32 Wi-Fi and check the ESP32 firmware."
      );
    } finally {
      setLoading(false);
    }
  };

  const adjustVolume = (value: number) => {
    setVolume(Math.max(0, Math.min(100, value)));
  };

  const adjustTiming = (
    current: number,
    amount: number,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    setter(Math.max(50, Math.min(2000, current + amount)));
  };

  const saveSettings = () => {
    const query = [
      `volume=${volume}`,
      `pattern=${pattern}`,
      `muted=${muted ? 1 : 0}`,
      `onMs=${onMs}`,
      `offMs=${offMs}`,
    ].join("&");

    send(
      `/buzzer/settings?${query}`,
      "Buzzer settings saved."
    );
  };

  const startTest = () => {
    if (muted) {
      Alert.alert(
        "Buzzer Muted",
        "Unmute the buzzer before starting a sound test."
      );
      return;
    }

    send(
      `/buzzer/test?pattern=${pattern}`,
      "Buzzer test started.",
      () => setTesting(true)
    );
  };

  const stopTest = () => {
    send(
      "/buzzer/stop",
      "Buzzer test stopped.",
      () => setTesting(false)
    );
  };

  const toggleMute = () => {
    const nextMuted = !muted;

    send(
      `/buzzer/settings?volume=${volume}&pattern=${pattern}&muted=${
        nextMuted ? 1 : 0
      }&onMs=${onMs}&offMs=${offMs}`,
      nextMuted ? "Buzzer muted." : "Buzzer unmuted.",
      () => setMuted(nextMuted)
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="volume-high"
              size={32}
              color="#2563EB"
            />
          </View>

          <Text style={styles.title}>Buzzer Sound & Pattern</Text>

          <Text style={styles.subtitle}>
            Customize your Medicare dispenser alerts
          </Text>
        </View>

        {/* ESP32 CONNECTION */}
        <View style={styles.connectionCard}>
          <View
            style={[
              styles.connectionDot,
              {
                backgroundColor: connected ? "#16A34A" : "#DC2626",
              },
            ]}
          />

          <View style={styles.flex}>
            <Text style={styles.cardTitle}>
              ESP32 {connected ? "Connected" : "Disconnected"}
            </Text>
            <Text style={styles.muted}>{ESP32_IP}</Text>
          </View>

          <Pressable
            onPress={checkConnection}
            disabled={loading}
            hitSlop={10}
          >
            <MaterialCommunityIcons
              name="refresh"
              size={24}
              color="#2563EB"
            />
          </Pressable>
        </View>

        {/* VOLUME */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="volume-medium"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Buzzer Volume</Text>
              <Text style={styles.muted}>
                Choose your preferred level
              </Text>
            </View>

            <Text style={styles.volumeValue}>{volume}%</Text>
          </View>

          <View style={styles.presetRow}>
            {[0, 25, 50, 75, 100].map((value) => (
              <Pressable
                key={value}
                disabled={loading}
                style={[
                  styles.presetButton,
                  volume === value && styles.presetSelected,
                ]}
                onPress={() => adjustVolume(value)}
              >
                <Text
                  style={[
                    styles.presetText,
                    volume === value && styles.presetTextSelected,
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
              onPress={() => adjustVolume(volume - 5)}
            >
              <MaterialCommunityIcons
                name="minus"
                size={24}
                color="#2563EB"
              />
            </Pressable>

            <View style={styles.flex}>
              <Text style={styles.adjustTitle}>Manual adjustment</Text>
              <Text style={styles.muted}>Change by 5%</Text>
            </View>

            <Pressable
              style={styles.adjustButton}
              disabled={loading}
              onPress={() => adjustVolume(volume + 5)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={24}
                color="#2563EB"
              />
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.button,
              muted ? styles.unmuteButton : styles.muteButton,
            ]}
            disabled={loading || !connected}
            onPress={toggleMute}
          >
            <MaterialCommunityIcons
              name={muted ? "volume-high" : "volume-off"}
              size={21}
              color={muted ? "#15803D" : "#B91C1C"}
            />
            <Text
              style={[
                styles.actionText,
                { color: muted ? "#15803D" : "#B91C1C" },
              ]}
            >
              {muted ? "Unmute Buzzer" : "Mute Buzzer"}
            </Text>
          </Pressable>

          <Text style={styles.note}>
            Volume control depends on the buzzer and driver hardware.
            Ordinary ON/OFF buzzers may not support true volume adjustment.
          </Text>
        </View>

        {/* PATTERNS */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="waveform"
                size={24}
                color="#2563EB"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Buzzer Pattern</Text>
              <Text style={styles.muted}>
                Select an alert style
              </Text>
            </View>
          </View>

          <View style={styles.patternGrid}>
            {PATTERNS.map((item) => (
              <Pressable
                key={item.id}
                disabled={loading}
                onPress={() => setPattern(item.id)}
                style={[
                  styles.patternCard,
                  pattern === item.id && styles.patternSelected,
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={28}
                  color={pattern === item.id ? "#2563EB" : "#64748B"}
                />

                <Text
                  style={[
                    styles.patternText,
                    pattern === item.id && styles.patternTextSelected,
                  ]}
                >
                  {item.name}
                </Text>

                {pattern === item.id && (
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={17}
                    color="#2563EB"
                  />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* CUSTOM TIMING */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons
                name="timer-outline"
                size={24}
                color="#D97706"
              />
            </View>

            <View style={styles.flex}>
              <Text style={styles.cardTitle}>Custom Beep Timing</Text>
              <Text style={styles.muted}>
                Adjust the ON and OFF durations
              </Text>
            </View>
          </View>

          <View style={styles.timingRow}>
            <View style={styles.flex}>
              <Text style={styles.adjustTitle}>Beep ON duration</Text>
              <Text style={styles.timingValue}>{onMs} ms</Text>
            </View>

            <Pressable
              style={styles.smallButton}
              disabled={loading}
              onPress={() => adjustTiming(onMs, -50, setOnMs)}
            >
              <MaterialCommunityIcons
                name="minus"
                size={20}
                color="#2563EB"
              />
            </Pressable>

            <Pressable
              style={styles.smallButton}
              disabled={loading}
              onPress={() => adjustTiming(onMs, 50, setOnMs)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color="#2563EB"
              />
            </Pressable>
          </View>

          <View style={styles.timingRow}>
            <View style={styles.flex}>
              <Text style={styles.adjustTitle}>Pause between beeps</Text>
              <Text style={styles.timingValue}>{offMs} ms</Text>
            </View>

            <Pressable
              style={styles.smallButton}
              disabled={loading}
              onPress={() => adjustTiming(offMs, -50, setOffMs)}
            >
              <MaterialCommunityIcons
                name="minus"
                size={20}
                color="#2563EB"
              />
            </Pressable>

            <Pressable
              style={styles.smallButton}
              disabled={loading}
              onPress={() => adjustTiming(offMs, 50, setOffMs)}
            >
              <MaterialCommunityIcons
                name="plus"
                size={20}
                color="#2563EB"
              />
            </Pressable>
          </View>

          <Text style={styles.note}>
            Timing changes take effect on the ESP32 after saving.
          </Text>
        </View>

        {/* SAVE SETTINGS */}
        <Pressable
          style={[
            styles.button,
            styles.saveButton,
            (!connected || loading) && styles.disabledButton,
          ]}
          disabled={!connected || loading}
          onPress={saveSettings}
        >
          <MaterialCommunityIcons
            name="content-save-outline"
            size={21}
            color="#FFFFFF"
          />
          <Text style={styles.saveText}>Save Buzzer Settings</Text>
        </Pressable>

        {/* TEST AND STOP */}
        <View style={styles.testRow}>
          <Pressable
            style={[
              styles.button,
              styles.testButton,
              styles.flex,
              (!connected || loading) && styles.disabledButton,
            ]}
            disabled={!connected || loading}
            onPress={startTest}
          >
            <MaterialCommunityIcons
              name="play"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.saveText}>Test Buzzer</Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              styles.stopButton,
              styles.flex,
              (!connected || loading) && styles.disabledButton,
            ]}
            disabled={!connected || loading}
            onPress={stopTest}
          >
            <MaterialCommunityIcons
              name="stop"
              size={21}
              color="#B91C1C"
            />
            <Text style={styles.stopText}>Stop Test</Text>
          </Pressable>
        </View>

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color="#2563EB" />
            <Text style={styles.muted}>
              Sending command to ESP32...
            </Text>
          </View>
        )}

        {testing && (
          <View style={styles.testingStatus}>
            <MaterialCommunityIcons
              name="volume-high"
              size={18}
              color="#15803D"
            />
            <Text style={styles.testingText}>
              Test command accepted
            </Text>
          </View>
        )}

        <Text style={styles.footer}>
          MEDICARE • Sound Controller
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
    marginBottom: 23,
  },
  headerIcon: {
    width: 62,
    height: 62,
    borderRadius: 19,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 7,
    textAlign: "center",
  },
  connectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9EDF3",
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  connectionDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9EDF3",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 17,
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  flex: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  muted: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 5,
  },
  volumeValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563EB",
  },
  presetRow: {
    flexDirection: "row",
    gap: 7,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 9,
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
    fontSize: 11,
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
    marginBottom: 14,
  },
  adjustButton: {
    width: 43,
    height: 43,
    borderRadius: 11,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  adjustTitle: {
    color: "#374151",
    fontSize: 13,
    fontWeight: "600",
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
  muteButton: {
    backgroundColor: "#FEF2F2",
  },
  unmuteButton: {
    backgroundColor: "#F0FDF4",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  note: {
    fontSize: 11,
    lineHeight: 17,
    color: "#9CA3AF",
    marginTop: 12,
  },
  patternGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 5,
  },
  patternCard: {
    width: "48%",
    minHeight: 112,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 8,
  },
  patternSelected: {
    borderColor: "#2563EB",
    backgroundColor: "#EFF6FF",
  },
  patternText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
    textAlign: "center",
  },
  patternTextSelected: {
    color: "#1D4ED8",
  },
  timingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 18,
  },
  timingValue: {
    color: "#2563EB",
    fontWeight: "700",
    marginTop: 5,
    fontSize: 13,
  },
  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#2563EB",
    marginBottom: 12,
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  testRow: {
    flexDirection: "row",
    gap: 12,
  },
  testButton: {
    backgroundColor: "#16A34A",
  },
  stopButton: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  stopText: {
    color: "#B91C1C",
    fontSize: 13,
    fontWeight: "700",
  },
  disabledButton: {
    opacity: 0.45,
  },
  loadingRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    padding: 12,
  },
  testingStatus: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 14,
  },
  testingText: {
    color: "#15803D",
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    marginTop: 22,
  },
});
