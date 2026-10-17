import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
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

// Keep this IP aligned with the ESP32 access-point address shown on your TFT/Serial Monitor.
const ESP32_IP = "192.168.4.1";
const BASE_URL = `http://${ESP32_IP}`;

const SERVOS = [
  { slot: 1, title: "Servo 1", subtitle: "Medicine slot 1", channel: "PCA9685 CH0" },
  { slot: 2, title: "Servo 2", subtitle: "Medicine slot 2", channel: "PCA9685 CH1" },
  { slot: 3, title: "Servo 3", subtitle: "Medicine slot 3", channel: "PCA9685 CH2" },
  { slot: 4, title: "Servo 4", subtitle: "Medicine slot 4", channel: "PCA9685 CH3" },
  { slot: 5, title: "Servo 5", subtitle: "Medicine slot 5", channel: "PCA9685 CH4" },
];

type ServoItem = (typeof SERVOS)[number];

export default function ServoRotateScreen() {
  const [connected, setConnected] = useState(false);
  const [busySlot, setBusySlot] = useState<number | null>(null); // 0 = sequential all, -1 = all together
  const [queuedSlots, setQueuedSlots] = useState<string[]>([]);
  const [servoMoving, setServoMoving] = useState(false);
  const [servoQueue, setServoQueue] = useState(0);
  const [message, setMessage] = useState("Connect to MEDICARE_ESP32 Wi-Fi to control the servos.");

  const request = useCallback(async (path: string) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: "GET",
        signal: controller.signal,
      });
      if (!response.ok) {
        let details = "";
        try {
          const data = await response.json();
          details = data?.message ? `: ${data.message}` : "";
        } catch {
          // Keep the HTTP status as the useful error if no JSON was returned.
        }
        throw new Error(`ESP32 returned ${response.status}${details}`);
      }
      return response;
    } finally {
      clearTimeout(timeout);
    }
  }, []);

  const checkConnection = useCallback(async () => {
    try {
      const response = await request("/status");
      setConnected(true);
      try {
        const data = await response.json();
        setServoMoving(!!data?.servoBusy);
        setServoQueue(Number(data?.servoQueue ?? 0));
      } catch {
        // Status JSON is optional for the connection check.
      }
    } catch {
      setConnected(false);
      setServoMoving(false);
      setServoQueue(0);
    }
  }, [request]);

  useEffect(() => {
    checkConnection();
    const timer = setInterval(checkConnection, 2000);
    return () => clearInterval(timer);
  }, [checkConnection]);

  const rotateServo = async (servo: ServoItem) => {
    if (busySlot !== null) return;
    setBusySlot(servo.slot);
    setMessage(`Sending rotation request to ${servo.title}…`);
    try {
      await request(`/servo?slot=${servo.slot}`);
      setQueuedSlots((previous) => [`S${servo.slot}`, ...previous].slice(0, 4));
      setMessage(`${servo.title} rotation request sent. Repeated presses are queued by the ESP32.`);
      setConnected(true);
      checkConnection();
    } catch (error) {
      setConnected(false);
      const details = error instanceof Error ? error.message : "Unknown connection error";
      setMessage("Could not rotate the servo. Check Wi-Fi and the ESP32 firmware.");
      Alert.alert(
        "Servo control failed",
        `${details}\n\nConnect your phone to MEDICARE_ESP32 and make sure the ESP32 is powered on.`
      );
    } finally {
      setBusySlot(null);
    }
  };

  // All five servos sweep together, exactly like the standalone test sketch.
  const rotateAllTogether = async () => {
    if (busySlot !== null) return;
    setBusySlot(-1);
    setMessage("Sending rotation request for all servos together…");
    try {
      await request("/servo/all");
      setQueuedSlots((previous) => ["ALL", ...previous].slice(0, 4));
      setMessage("All five servos rotate together. Further requests are queued by the ESP32.");
      setConnected(true);
      checkConnection();
    } catch (error) {
      setConnected(false);
      Alert.alert(
        "Could not rotate all servos",
        error instanceof Error ? error.message : "Check the ESP32 connection."
      );
      setMessage("Could not send the request. Check the ESP32 connection.");
    } finally {
      setBusySlot(null);
    }
  };

  // Each servo rotates one after another (queued by the ESP32).
  const rotateAllInOrder = async () => {
    if (busySlot !== null) return;
    setBusySlot(0);
    setMessage("Sending rotation requests for all five servos…");
    const failed: number[] = [];
    try {
      // Sequential requests let the ESP32 queue each rotation in order.
      for (const servo of SERVOS) {
        try {
          await request(`/servo?slot=${servo.slot}`);
          setQueuedSlots((previous) => [`S${servo.slot}`, ...previous].slice(0, 4));
        } catch {
          failed.push(servo.slot);
          break;
        }
      }
      if (failed.length) {
        throw new Error(`Request failed at Servo ${failed[0]}`);
      }
      setConnected(true);
      setMessage("All five servo rotation requests were sent in order.");
      checkConnection();
    } catch (error) {
      setConnected(false);
      Alert.alert(
        "Could not rotate all servos",
        error instanceof Error ? error.message : "Check the ESP32 connection."
      );
      setMessage("Some requests could not be sent. Check the ESP32 connection.");
    } finally {
      setBusySlot(null);
    }
  };

  const disabled = busySlot !== null;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons name="rotate-3d-variant" size={30} color="#2563EB" />
          </View>
          <Text style={styles.title}>Servo Rotation</Text>
          <Text style={styles.subtitle}>
            Manually rotate each medicine dispenser rotor from your phone or the TFT touchscreen.
          </Text>
        </View>

        <View style={styles.connectionCard}>
          <View style={[styles.connectionDot, { backgroundColor: connected ? "#16A34A" : "#DC2626" }]} />
          <View style={styles.connectionTextWrap}>
            <Text style={styles.connectionTitle}>
              ESP32 {connected ? "Connected" : "Not connected"}
            </Text>
            <Text style={styles.connectionSubtitle}>MEDICARE_ESP32 · {ESP32_IP}</Text>
          </View>
          <Pressable style={styles.refreshButton} onPress={checkConnection} accessibilityRole="button">
            <MaterialCommunityIcons name="refresh" size={21} color="#2563EB" />
          </Pressable>
        </View>

        {connected && (
          <View style={styles.movingCard}>
            <MaterialCommunityIcons
              name={servoMoving ? "progress-clock" : "check-circle-outline"}
              size={20}
              color={servoMoving ? "#B45309" : "#15803D"}
            />
            <Text style={[styles.movingText, { color: servoMoving ? "#B45309" : "#15803D" }]}>
              {servoMoving
                ? `Servo moving${servoQueue > 0 ? ` · ${servoQueue} queued` : ""}`
                : "Servos idle"}
            </Text>
          </View>
        )}

        <View style={styles.noticeCard}>
          <MaterialCommunityIcons name="information-outline" size={22} color="#1D4ED8" />
          <Text style={styles.noticeText}>
            Tap Rotate to run the selected servo out and back. If another servo is moving, the ESP32 queues new requests instead of dropping them.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [styles.rotateAllButton, pressed && styles.pressed, disabled && styles.disabled]}
          onPress={rotateAllTogether}
          disabled={disabled}
          accessibilityRole="button"
        >
          {busySlot === -1 ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <MaterialCommunityIcons name="rotate-right" size={22} color="#FFFFFF" />
          )}
          <Text style={styles.rotateAllText}>Rotate All Together</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.rotateOrderButton, pressed && styles.pressed, disabled && styles.disabled]}
          onPress={rotateAllInOrder}
          disabled={disabled}
          accessibilityRole="button"
        >
          {busySlot === 0 ? (
            <ActivityIndicator color="#2563EB" />
          ) : (
            <MaterialCommunityIcons name="format-list-numbered" size={22} color="#2563EB" />
          )}
          <Text style={styles.rotateOrderText}>Rotate All One By One</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Individual control</Text>
        {SERVOS.map((servo) => (
          <View key={servo.slot} style={styles.servoCard}>
            <View style={styles.servoIcon}>
              <MaterialCommunityIcons name="cog-outline" size={25} color="#2563EB" />
            </View>
            <View style={styles.servoInfo}>
              <Text style={styles.servoTitle}>{servo.title}</Text>
              <Text style={styles.servoSubtitle}>{servo.subtitle}</Text>
              <Text style={styles.channel}>{servo.channel}</Text>
            </View>
            <Pressable
              style={({ pressed }) => [styles.rotateButton, pressed && styles.pressed, disabled && styles.disabled]}
              onPress={() => rotateServo(servo)}
              disabled={disabled}
              accessibilityRole="button"
            >
              {busySlot === servo.slot ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialCommunityIcons name="rotate-right" size={18} color="#FFFFFF" />
                  <Text style={styles.rotateButtonText}>Rotate</Text>
                </>
              )}
            </Pressable>
          </View>
        ))}

        <View style={styles.statusCard}>
          <MaterialCommunityIcons name="message-text-outline" size={20} color="#64748B" />
          <Text style={styles.statusText}>{message}</Text>
        </View>

        {queuedSlots.length > 0 && (
          <Text style={styles.queueText}>
            Recent requests: {queuedSlots.join("  ·  ")}
          </Text>
        )}

        <Text style={styles.footer}>
          If the phone cannot connect, join the ESP32 Wi-Fi network and confirm the IP address in the firmware matches this screen.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FB" },
  container: { padding: 20, paddingBottom: 36 },
  header: { alignItems: "center", marginBottom: 22, paddingTop: 8 },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#E8F0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: { fontSize: 25, fontWeight: "800", color: "#0F172A" },
  subtitle: { fontSize: 14, lineHeight: 20, color: "#64748B", textAlign: "center", marginTop: 7 },
  connectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  connectionDot: { width: 10, height: 10, borderRadius: 5, marginRight: 11 },
  connectionTextWrap: { flex: 1 },
  connectionTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A" },
  connectionSubtitle: { fontSize: 12, color: "#64748B", marginTop: 3 },
  refreshButton: { padding: 7, borderRadius: 10, backgroundColor: "#EFF6FF" },
  movingCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 13,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  movingText: { fontSize: 13, fontWeight: "700" },
  noticeCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    borderWidth: 1,
    borderRadius: 14,
    padding: 13,
    marginBottom: 16,
  },
  noticeText: { flex: 1, color: "#1E40AF", fontSize: 13, lineHeight: 19 },
  rotateAllButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 15,
    backgroundColor: "#2563EB",
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  rotateAllText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  rotateOrderButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#2563EB",
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  rotateOrderText: { color: "#2563EB", fontSize: 15, fontWeight: "800" },
  sectionTitle: { color: "#0F172A", fontSize: 17, fontWeight: "800", marginBottom: 12 },
  servoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 13,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  servoIcon: {
    width: 45,
    height: 45,
    borderRadius: 13,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },
  servoInfo: { flex: 1 },
  servoTitle: { fontSize: 15, fontWeight: "800", color: "#0F172A" },
  servoSubtitle: { fontSize: 12, color: "#64748B", marginTop: 2 },
  channel: { fontSize: 10, color: "#94A3B8", marginTop: 4, fontWeight: "600" },
  rotateButton: {
    minWidth: 83,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#0F172A",
    borderRadius: 11,
    paddingHorizontal: 10,
  },
  rotateButtonText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
  pressed: { opacity: 0.78, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.55 },
  statusCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    padding: 13,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  statusText: { flex: 1, color: "#475569", fontSize: 12, lineHeight: 18 },
  queueText: { color: "#64748B", fontSize: 11, marginTop: 10 },
  footer: { color: "#94A3B8", fontSize: 11, lineHeight: 17, textAlign: "center", marginTop: 18 },
});
