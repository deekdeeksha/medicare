
import Footer from "@/components/footer";
import {
    getMedicines,
    type Medicine,
} from "@/config/medicineStorage";
import textToSpeech from "@/config/tts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SLOT_COLORS: Record<string, string> = {
  "1": "#1C9129",
  "2": "#FFD21F",
  "3": "#000000",
  "4": "#8061C5",
  "5": "#8B4513",
  green: "#1C9129",
  yellow: "#FFD21F",
  black: "#000000",
  purple: "#8061C5",
  brown: "#8B4513",
};

const getSlotNumber = (slot: string | number): number => {
  const match = String(slot ?? "").match(/\d+/);
  const number = match ? Number(match[0]) : 1;
  return number >= 1 && number <= 5 ? number : 1;
};

const getSlotColor = (medicine: Medicine): string => {
  const slotNumber = getSlotNumber(medicine.slot);
  const savedColor = String(medicine.slotColor ?? "").toLowerCase();

  return SLOT_COLORS[savedColor] ?? SLOT_COLORS[String(slotNumber)] ?? "#1C9129";
};

const formatDate = (value?: string): string => {
  if (!value) return "Not specified";

  // Supports dates stored as YYYY-MM-DD without timezone shifting.
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    const [, year, month, day] = match;
    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isMedicineActive = (medicine: Medicine): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const parseDate = (value?: string): Date | null => {
    if (!value) return null;

    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (match) {
      return new Date(
        Number(match[1]),
        Number(match[2]) - 1,
        Number(match[3])
      );
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;

    parsed.setHours(0, 0, 0, 0);
    return parsed;
  };

  const startDate = parseDate(medicine.startDate);
  const endDate = parseDate(medicine.endDate);

  if (startDate && today < startDate) return false;
  if (endDate && today > endDate) return false;

  return true;
};

export default function ActiveTablets() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

 const loadMedicines = useCallback(async () => {
  try {
    setLoading(true);

    // Load ALL saved schedules, including expired ones.
    // Expired schedules must remain visible so the user can delete them.
    const savedMedicines = await getMedicines();

    setMedicines(savedMedicines);
  } catch (error) {
    console.error("Error loading medicines:", error);

    Alert.alert(
      "Error",
      "Unable to load saved medicine schedules."
    );
  } finally {
    setLoading(false);
  }
}, []);

  useFocusEffect(
    useCallback(() => {
      void loadMedicines();
    }, [loadMedicines])
  );

  const handleInfo = (medicine: Medicine) => {
    const slotNumber = getSlotNumber(medicine.slot);
    const slotColor = getSlotColor(medicine);

    Alert.alert(
      medicine.name || "Medicine Information",
      `Slot: ${slotNumber}\n` +
        `Category: ${medicine.category || "Not specified"}\n` +
        `Schedule time: ${medicine.time || "Not specified"}\n` +
        `Frequency: ${medicine.frequency || "Not specified"}\n` +
        `Start date: ${formatDate(medicine.startDate)}\n` +
        `End date: ${formatDate(medicine.endDate)}\n` +
        `Notes: ${medicine.notes?.trim() || "No notes added"}`
    );

    // Uses the same multilingual TTS function as slotscreen.tsx.
    void textToSpeech(slotNumber, slotColor, medicine);
  };

  const handleDeleteSchedule = (medicine: Medicine) => {
    Alert.alert(
      "Delete Schedule",
      `Are you sure you want to delete "${medicine.name}" from Slot ${getSlotNumber(medicine.slot)}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Read all schedules from the shared storage key.
              const storedData =
                await AsyncStorage.getItem("savedMedicines");

              const allMedicines: Medicine[] = storedData
                ? JSON.parse(storedData)
                : [];

              // Delete only the selected medicine by its unique ID.
              const updatedMedicines = allMedicines.filter(
                (item) => item.id !== medicine.id
              );

              await AsyncStorage.setItem(
                "savedMedicines",
                JSON.stringify(updatedMedicines)
              );

              // Refresh this screen immediately.
              setMedicines(updatedMedicines.filter(isMedicineActive));

              Alert.alert(
                "Schedule Deleted",
                `${medicine.name} has been removed from the schedule.`
              );
            } catch (error) {
              console.error("Error deleting medicine schedule:", error);

              Alert.alert(
                "Delete Failed",
                "Unable to delete this schedule. Please try again."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialCommunityIcons
              name="pill"
              size={30}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.heading}>Active Tablets</Text>
            <Text style={styles.subtitle}>
              Your currently scheduled medicines
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <MaterialCommunityIcons
              name="medical-bag"
              size={28}
              color="#2878D0"
            />
          </View>

          <View style={styles.summaryText}>
            <Text style={styles.summaryLabel}>Active medicines</Text>
            <Text style={styles.summaryCount}>{medicines.length}</Text>
          </View>
        </View>

        {/* Medicine list */}
        {loading ? (
          <View style={styles.centerContent}>
            <ActivityIndicator size="large" color="#2878D0" />
            <Text style={styles.loadingText}>
              Loading your medicines...
            </Text>
          </View>
        ) : (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {medicines.length === 0 ? (
              <View style={styles.emptyCard}>
                <MaterialCommunityIcons
                  name="pill-off"
                  size={56}
                  color="#9AA6B2"
                />
                <Text style={styles.emptyTitle}>
                  No Active Medicines
                </Text>
                <Text style={styles.emptyDescription}>
                  Your currently scheduled medicines will appear here.
                </Text>
              </View>
            ) : (
              medicines.map((medicine) => {
                const slotNumber = getSlotNumber(medicine.slot);
                const slotColor = getSlotColor(medicine);

                return (
                  <View key={medicine.id} style={styles.medicineCard}>
                    {/* Medicine heading and Info button */}
                    <View style={styles.cardTop}>
                      <View
                        style={[
                          styles.medicineIcon,
                          { backgroundColor: slotColor },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name="pill"
                          size={25}
                          color={
                            slotColor === "#FFD21F"
                              ? "#222222"
                              : "#FFFFFF"
                          }
                        />
                      </View>

                      <View style={styles.medicineTitleContainer}>
                        <Text style={styles.medicineName}>
                          {medicine.name || "Unnamed Medicine"}
                        </Text>
                        <Text style={styles.category}>
                          {medicine.category || "General medicine"}
                        </Text>
                      </View>

                      <TouchableOpacity
                        style={styles.infoButton}
                        onPress={() => handleInfo(medicine)}
                        activeOpacity={0.75}
                        accessibilityRole="button"
                        accessibilityLabel={`Read information about ${medicine.name}`}
                      >
                        <MaterialCommunityIcons
                          name="information-outline"
                          size={24}
                          color="#2878D0"
                        />
                        <Text style={styles.infoButtonText}>Info</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    {/* Slot */}
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="view-grid-outline"
                        size={19}
                        color="#65758B"
                      />
                      <Text style={styles.detailLabel}>Dispenser slot</Text>

                      <View
                        style={[
                          styles.slotBadge,
                          { backgroundColor: slotColor },
                        ]}
                      >
                        <Text
                          style={[
                            styles.slotBadgeText,
                            slotColor === "#FFD21F" && {
                              color: "#222222",
                            },
                          ]}
                        >
                          Slot {slotNumber}
                        </Text>
                      </View>
                    </View>

                    {/* Schedule time */}
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="clock-outline"
                        size={19}
                        color="#65758B"
                      />
                      <Text style={styles.detailLabel}>Schedule time</Text>
                      <Text style={styles.detailValue}>
                        {medicine.time || "Not specified"}
                      </Text>
                    </View>

                    {/* Frequency */}
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="repeat"
                        size={19}
                        color="#65758B"
                      />
                      <Text style={styles.detailLabel}>Frequency</Text>
                      <Text style={styles.detailValue}>
                        {medicine.frequency || "Not specified"}
                      </Text>
                    </View>

                    {/* Start date */}
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="calendar-start"
                        size={19}
                        color="#65758B"
                      />
                      <Text style={styles.detailLabel}>Start date</Text>
                      <Text style={styles.detailValue}>
                        {formatDate(medicine.startDate)}
                      </Text>
                    </View>

                    {/* End date */}
                    <View style={styles.detailRow}>
                      <MaterialCommunityIcons
                        name="calendar-end"
                        size={19}
                        color="#65758B"
                      />
                      <Text style={styles.detailLabel}>End date</Text>
                      <Text style={styles.detailValue}>
                        {formatDate(medicine.endDate)}
                      </Text>
                    </View>

                    {/* Notes */}
                    {!!medicine.notes?.trim() && (
                      <View style={styles.notesContainer}>
                        <MaterialCommunityIcons
                          name="note-text-outline"
                          size={19}
                          color="#65758B"
                        />
                        <Text style={styles.notesText}>
                          {medicine.notes}
                        </Text>
                      </View>
                    )}

                    {/* Delete Schedule button */}
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteSchedule(medicine)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`Delete schedule for ${medicine.name}`}
                    >
                      <MaterialCommunityIcons
                        name="delete-outline"
                        size={21}
                        color="#D32F2F"
                      />
                      <Text style={styles.deleteButtonText}>
                        Delete Schedule
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        )}

        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F7FB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2878D0",
    paddingHorizontal: 20,
    paddingVertical: 22,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  headerIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    marginLeft: 14,
    flex: 1,
  },
  heading: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#E8F2FF",
    marginTop: 4,
  },
  summaryCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 10,
    padding: 15,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF3FF",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    marginLeft: 13,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#65758B",
  },
  summaryCount: {
    fontSize: 23,
    fontWeight: "800",
    color: "#182B45",
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 5,
    paddingBottom: 20,
    flexGrow: 1,
  },
  medicineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  medicineIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  medicineTitleContainer: {
    flex: 1,
    marginLeft: 11,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#182B45",
  },
  category: {
    fontSize: 12,
    color: "#7A8798",
    marginTop: 4,
  },
  infoButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 11,
    backgroundColor: "#EAF3FF",
    marginLeft: 5,
  },
  infoButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2878D0",
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "#EDF0F5",
    marginVertical: 14,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },
  detailLabel: {
    flex: 1,
    fontSize: 13,
    color: "#65758B",
  },
  detailValue: {
    maxWidth: "53%",
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#26364A",
  },
  slotBadge: {
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 8,
  },
  slotBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderTopWidth: 1,
    borderTopColor: "#EDF0F5",
    paddingTop: 12,
    gap: 8,
  },
  notesText: {
    flex: 1,
    color: "#526176",
    fontSize: 13,
    lineHeight: 19,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF0F0",
    borderWidth: 1,
    borderColor: "#FFD6D6",
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 15,
    gap: 8,
  },
  deleteButtonText: {
    color: "#D32F2F",
    fontSize: 14,
    fontWeight: "700",
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#65758B",
    fontSize: 14,
  },
  emptyCard: {
    flex: 1,
    minHeight: 260,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#26364A",
    marginTop: 15,
  },
  emptyDescription: {
    textAlign: "center",
    color: "#7A8798",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
});
