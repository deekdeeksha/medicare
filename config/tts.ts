
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as speech from "expo-speech";

export type TTSMedicine = {
  name: string;
  time?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  notes?: string;
};

type LanguageSettings = {
  selectedLan?: string;
  selectedPit?: number;
  selectedSpeed?: number;
  selectedVol?: number;
};

const formatDate = (value?: string) => {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (value?: string) => {
  if (!value) return "";

  const match = value.match(/^(\d{1,2}):(\d{2})$/);

  if (!match) return value;

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  if (hours > 23 || minutes > 59) return value;

  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

const textToSpeech = async (
  slotNum: number,
  slotCol: string,
  medicine?: TTSMedicine | null
) => {
  try {
    const userLang = await AsyncStorage.getItem("languageSettings");

    let settings: LanguageSettings = {};

    if (userLang) {
      try {
        settings = JSON.parse(userLang);
      } catch {
        console.warn("Invalid languageSettings JSON");
      }
    }

    const language = settings.selectedLan ?? "en";

    const pitchValue = Number(settings.selectedPit ?? 50) / 50;
    const pitch = Math.max(0.5, Math.min(2, pitchValue));

    const rateValue = Number(settings.selectedSpeed ?? 1);
    const rate = Math.max(0.1, Math.min(2, rateValue));

    const volumeValue = Number(settings.selectedVol ?? 100) / 100;
    const volume = Math.max(0, Math.min(1, volumeValue));

    const assigned = Boolean(medicine?.name?.trim());

    const time = formatTime(medicine?.time);
    const startDate = formatDate(medicine?.startDate);
    const endDate = formatDate(medicine?.endDate);
    const frequency = medicine?.frequency?.trim() || "";
    const medicineName = medicine?.name?.trim() || "";

    let message = "";
    let voiceLanguage = "en-IN";

    if (language === "en") {
      voiceLanguage = "en-IN";

      if (!assigned) {
        message = `Slot ${slotNum} is empty. Please fill the ${slotCol} slot with the prescribed medicine.`;
      } else {
        message =
          `Slot ${slotNum}, ${slotCol} slot. ` +
          `Medicine name: ${medicineName}. ` +
          (time ? `Scheduled time: ${time}. ` : "Schedule time is not set. ") +
          (frequency ? `Frequency: ${frequency}. ` : "") +
          (startDate ? `Start date: ${startDate}. ` : "") +
          (endDate ? `End date: ${endDate}. ` : "") +
          (medicine?.notes ? `Notes: ${medicine.notes}.` : "");
      }
    } else if (language === "ka") {
      voiceLanguage = "kn-IN";

      if (!assigned) {
        message = `ಸ್ಲಾಟ್ ${slotNum} ಖಾಲಿಯಾಗಿದೆ. ದಯವಿಟ್ಟು ${slotCol} ಸ್ಲಾಟ್‌ನಲ್ಲಿ ಔಷಧಿಯನ್ನು ತುಂಬಿಸಿ.`;
      } else {
        message =
          `ಸ್ಲಾಟ್ ${slotNum}. ಔಷಧಿಯ ಹೆಸರು: ${medicineName}. ` +
          (time ? `ನಿಗದಿತ ಸಮಯ: ${time}. ` : "ಸಮಯವನ್ನು ನಿಗದಿಪಡಿಸಿಲ್ಲ. ") +
          (frequency ? `ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳುವ ಆವರ್ತನೆ: ${frequency}. ` : "") +
          (startDate ? `ಪ್ರಾರಂಭದ ದಿನಾಂಕ: ${startDate}. ` : "") +
          (endDate ? `ಮುಕ್ತಾಯದ ದಿನಾಂಕ: ${endDate}. ` : "") +
          (medicine?.notes ? `ಟಿಪ್ಪಣಿ: ${medicine.notes}.` : "");
      }
    } else if (language === "hi") {
      voiceLanguage = "hi-IN";

      if (!assigned) {
        message = `स्लॉट ${slotNum} खाली है। कृपया ${slotCol} स्लॉट में दवा भरें।`;
      } else {
        message =
          `स्लॉट ${slotNum}। दवा का नाम: ${medicineName}। ` +
          (time ? `दवा लेने का निर्धारित समय: ${time}। ` : "समय निर्धारित नहीं है। ") +
          (frequency ? `दवा लेने की आवृत्ति: ${frequency}। ` : "") +
          (startDate ? `शुरू करने की तारीख: ${startDate}। ` : "") +
          (endDate ? `अंतिम तारीख: ${endDate}। ` : "") +
          (medicine?.notes ? `नोट: ${medicine.notes}।` : "");
      }
    } else if (language === "ta") {
      voiceLanguage = "ta-IN";

      if (!assigned) {
        message = `ஸ்லாட் ${slotNum} காலியாக உள்ளது. தயவுசெய்து ${slotCol} ஸ்லாட்டில் மருந்தை நிரப்பவும்.`;
      } else {
        message =
          `ஸ்லாட் ${slotNum}. மருந்தின் பெயர்: ${medicineName}. ` +
          (time ? `மருந்து எடுத்துக்கொள்ள வேண்டிய நேரம்: ${time}. ` : "நேரம் குறிப்பிடப்படவில்லை. ") +
          (frequency ? `மருந்து எடுத்துக்கொள்ளும் முறை: ${frequency}. ` : "") +
          (startDate ? `தொடக்க தேதி: ${startDate}. ` : "") +
          (endDate ? `முடிவு தேதி: ${endDate}. ` : "") +
          (medicine?.notes ? `குறிப்புகள்: ${medicine.notes}.` : "");
      }
    } else {
      voiceLanguage = "en-IN";
      message = assigned
        ? `Slot ${slotNum}. Medicine: ${medicineName}. ${time ? `Scheduled time: ${time}. ` : ""}${frequency ? `Frequency: ${frequency}. ` : ""}${startDate ? `Start date: ${startDate}. ` : ""}${endDate ? `End date: ${endDate}.` : ""}`
        : `Slot ${slotNum} is empty. Please fill the ${slotCol} slot.`;
    }

    await speech.stop();

    speech.speak(message, {
      language: voiceLanguage,
      pitch,
      rate,
      volume,
      onError: (error) => console.error("TTS error:", error),
    });
  } catch (error) {
    console.error("Text-to-speech error:", error);
  }
};

export default textToSpeech;
