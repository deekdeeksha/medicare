
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Medicine = {
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

const MEDICINES_KEY = "savedMedicines";

export async function getMedicines(): Promise<Medicine[]> {
  try {
    const data = await AsyncStorage.getItem(MEDICINES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading medicines:", error);
    return [];
  }
}

export async function saveMedicine(
  medicine: Medicine
): Promise<void> {
  const medicines = await getMedicines();

  // Replace the existing medicine if editing it.
  const updated = [
    ...medicines.filter((item) => item.id !== medicine.id),
    medicine,
  ];

  await AsyncStorage.setItem(
    MEDICINES_KEY,
    JSON.stringify(updated)
  );
}

export function isMedicineActive(
  medicine: Medicine,
  now = new Date()
): boolean {
  const start = new Date(medicine.startDate);
  const end = new Date(medicine.endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  return now >= start && now <= end;
}

// Frequency is calculated from the selected first dose time.
export function getDoseInterval(
  frequency: string
): number {
  switch (frequency) {
    case "Once a Day":
      return 24;
    case "Twice a Day":
      return 12;
    case "Three Times a Day":
      return 8;
    case "Every 6 Hours":
      return 6;
    case "Every 8 Hours":
      return 8;
    case "Every 12 Hours":
      return 12;
    default:
      return 24;
  }
}

export function getNextDose(
  medicine: Medicine,
  now = new Date()
): Date | null {
  if (!isMedicineActive(medicine, now)) {
    return null;
  }

  const [hours, minutes] = medicine.time
    .split(":")
    .map(Number);

  const interval = getDoseInterval(medicine.frequency);
  const start = new Date(medicine.startDate);
  const end = new Date(medicine.endDate);

  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  // Search today and upcoming days for the next dose.
  for (
    let day = new Date(Math.max(start.getTime(), new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()));
    day <= end;
    day.setDate(day.getDate() + 1)
  ) {
    const firstDose = new Date(day);
    firstDose.setHours(hours, minutes, 0, 0);

    for (let h = 0; h < 24; h += interval) {
      const dose = new Date(
        firstDose.getTime() + h * 60 * 60 * 1000
      );

      if (dose > end) break;

      if (dose >= now && dose >= start && dose <= end) {
        return dose;
      }
    }
  }

  return null;
}

export function formatDoseTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
