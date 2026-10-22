
import Footer from "@/components/footer";
import Slots from "@/components/slots";
import textToSpeech from "@/config/tts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slot from "../../../components/boxButtons";

type Medicine = {
  id: string;
  name: string;
  category: string;
  slot: string;
  slotColor: string;
  frequency: string;
  startDate: string;
  endDate: string;
  time: string;
  notes: string;
};

const SLOT_CONFIG = [
  { slot: 1, name: "green", color: "#1C9129" },
  { slot: 2, name: "yellow", color: "#FFD21F" },
  { slot: 3, name: "black", color: "#000000" },
  { slot: 4, name: "purple", color: "#8061C5" },
  { slot: 5, name: "brown", color: "#8B4513" },
];

const normalizeSlotNumber = (slot: string | number): number | null => {
  // Handles 4, "4", "Slot 4", "slot 4", and similar formats.
  const match = String(slot ?? "").match(/\d+/);

  if (!match) return null;

  const number = Number(match[0]);

  return number >= 1 && number <= 5 ? number : null;
};

export default function SlotsScreen() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMedicines = useCallback(async () => {
    try {
      setLoading(true);

      const stored = await AsyncStorage.getItem("savedMedicines");
      const parsed: unknown = stored ? JSON.parse(stored) : [];

      const validMedicines = Array.isArray(parsed)
        ? (parsed as Medicine[])
        : [];

      setMedicines(validMedicines);
    } catch (error) {
      console.error("Error loading medicines:", error);
      Alert.alert("Error", "Unable to load saved medicine schedules.");
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadMedicines();
    }, [loadMedicines])
  );

  const getSlotMedicine = (slotNum: number): Medicine | undefined => {
    return medicines.find(
      (medicine) =>
        normalizeSlotNumber(medicine.slot) === slotNum
    );
  };

const getSlotStatus = (medicine?: Medicine) => {
  if (!medicine) return "not set";

  if (!medicine.startDate || !medicine.endDate) {
    return "active";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(`${medicine.startDate}T00:00:00`);
  const end = new Date(`${medicine.endDate}T00:00:00`);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return "active";
  }

  return today >= start && today <= end ? "active" : "not set";
};
  const formatTime = (time?: string) => {
    if (!time) return "Time not set";

    if (/\b(AM|PM)\b/i.test(time)) {
      return time.replace(/\b(am|pm)\b/i, (value) =>
        value.toUpperCase()
      );
    }

    const match = time.match(/^(\d{1,2}):(\d{2})$/);

    if (!match) return time;

    const hours = Number(match[1]);
    const minutes = Number(match[2]);

    if (hours > 23 || minutes > 59) return time;

    const suffix = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
  };

  const handleSlotInfo = (
    slotNum: number,
    slotColor: string
  ) => {
    const medicine = getSlotMedicine(slotNum);

    if (!medicine) {
      Alert.alert(
        `Slot ${slotNum}`,
        `Slot ${slotNum} (${slotColor}) is empty. Please add a medicine.`
      );

      void textToSpeech(slotNum, slotColor, null);
      return;
    }

    Alert.alert(
      `Slot ${slotNum} - ${medicine.name}`,
      `Medicine: ${medicine.name}\n` +
        `Time: ${formatTime(medicine.time)}\n` +
        `Frequency: ${medicine.frequency || "Not specified"}\n` +
        `Start date: ${medicine.startDate || "Not specified"}\n` +
        `End date: ${medicine.endDate || "Not specified"}\n` +
        `Notes: ${medicine.notes || "None"}`
    );

    void textToSpeech(slotNum, slotColor, medicine);
  };

  const handleAddSchedule = (slotNum: number, slotColor: string) => {
    const existingMedicine = getSlotMedicine(slotNum);

    // Block navigation if a schedule already occupies this slot.
    if (existingMedicine) {
      Alert.alert(
        "Slot Already Occupied",
        `Slot ${slotNum} already contains ${existingMedicine.name}.\n\nPlease delete its schedule from Active Tablets before adding another medicine.`
      );
      return;
    }

    router.push({
      pathname: "/add",
      params: {
        slot: String(slotNum),
        color: slotColor,
      },
    });
  };

  const blue = {
    primary: "#195FDB",
    bright: "#3695FF",
    light: "#EAF3FF",
  };

  const green = {
    primary: "#1C9129",
    light: "#EEF9F0",
  };

  const red = {
    primary: "#DC2626",
    light: "#FEF2F2",
  };

  const filledSlots = SLOT_CONFIG.filter((config) =>
    getSlotMedicine(config.slot)
  ).length;

  const emptySlots = SLOT_CONFIG.length - filledSlots;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          gap: 40,
          padding: 10,
          paddingBottom: 150,
        }}
      >
        {/* Header */}
        <View style={styles.c1}>
          <Text style={styles.h1}>Medicine Slots</Text>
          <Text style={styles.h3}>
            Tap an empty slot to add a medicine. Use Info to hear details.
          </Text>
        </View>

        {/* Slot summary */}
        <View style={styles.c2}>
          <Slot
            icons="view-grid"
            iconColor={blue.bright}
            iconSize={28}
            value={5}
            title="Total slots"
            bgColor={blue.light}
            tColor={blue.primary}
          />

          <Slot
            icons="view-grid"
            iconColor={green.primary}
            iconSize={28}
            value={filledSlots}
            title="Filled slots"
            bgColor={green.light}
            tColor={green.primary}
          />

          <Slot
            icons="view-grid"
            iconColor={red.primary}
            iconSize={28}
            value={emptySlots}
            title="Empty slots"
            bgColor={red.light}
            tColor={red.primary}
          />
        </View>

        {/* All five medicine slots */}
        <View style={styles.c3}>
          {loading ? (
            <ActivityIndicator size="large" color={blue.primary} />
          ) : (
            SLOT_CONFIG.map((config) => {
              const medicine = getSlotMedicine(config.slot);
              const occupied = Boolean(medicine);
              const status = getSlotStatus(medicine);

              return (
                <View
                  key={config.slot}
                  style={styles.slotWrapper}
                >
                  <Slots
                    iconColor={config.color}
                    slotColor={config.color}
                    slotValue={config.slot}
                    slotInfo={
                      medicine
                        ? `${medicine.name} - ${formatTime(medicine.time)}`
                        : `Slot ${config.slot} is empty`
                    }
                    slotStatus={status}
                    day="today"
                    onPressInfo={() =>
                      handleSlotInfo(config.slot, config.name)
                    }
                    onPress={() =>
                      handleAddSchedule(config.slot, config.name)
                    }
                    time={
                      medicine
                        ? formatTime(medicine.time)
                        : "Not set"
                    }
                    tabletName={
                      medicine
                        ? medicine.name
                        : "No medicine added"
                    }
                    repeat={
                      medicine
                        ? medicine.frequency || "Frequency not set"
                        : "Add a medicine"
                    }
                  />

                  {occupied && (
                    <View style={styles.occupiedLabel}>
                      <MaterialCommunityIconsPlaceholder />
                      <Text style={styles.occupiedText}>
                        Schedule already set — delete it from Active Tablets
                        to reuse this slot.
                      </Text>
                    </View>
                  )}
                </View>
              );
            })
          )}
        </View>

        {/* Footer */}
        <Footer
          icons="pill-multiple"
          iconColor="#2563EB"
          bgColor="#EEF5FF"
          width={70}
          height={70}
          size={40}
          title="Stay on Track with Your Medicines"
          subtitle="Take your medicines on time and stay healthy."
          color="#123A73"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// Small visual indicator for an occupied slot.
function MaterialCommunityIconsPlaceholder() {
  return <View style={styles.occupiedDot} />;
}

const styles = StyleSheet.create({
  c1: {
    minHeight: 250,
    width: "100%",
    padding: 20,
    gap: 10,
    alignItems: "center",
    justifyContent: "flex-start",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    backgroundColor: "rgba(0, 102, 255, 0.9)",
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginTop: "5%",
  },
  h3: {
    fontSize: 20,
    color: "white",
    marginTop: 10,
    textAlign: "center",
  },
  c2: {
    minHeight: 130,
    width: "90%",
    position: "absolute",
    marginTop: "40%",
    elevation: 5,
    zIndex: 100,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 15,
    backgroundColor: "white",
  },
  c3: {
    minHeight: 600,
    width: "100%",
    padding: 10,
    marginTop: "15%",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 30,
    borderTopLeftRadius: 80,
  },
  slotWrapper: {
    width: "100%",
    alignItems: "center",
  },
  occupiedLabel: {
    width: "92%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FFF7E6",
    borderColor: "#F2D49B",
    borderWidth: 1,
    borderRadius: 10,
    padding: 9,
    marginTop: 8,
  },
  occupiedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#C17A00",
  },
  occupiedText: {
    flex: 1,
    color: "#805400",
    fontSize: 12,
    textAlign: "center",
  },
});
