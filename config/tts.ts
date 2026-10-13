import AsyncStorage from "@react-native-async-storage/async-storage";
import * as speech from "expo-speech";
const textToSpeech=async(slotNum:number,slotCol:string)=>{
    const userLang=await AsyncStorage.getItem("languageSettings")
    console.log(userLang);
    
    if(userLang){
        const obj=JSON.parse(userLang)
          console.log("obj",obj);

         let pitch=obj.selectedPit/50;
        let volume = Number(obj.selectedVol ?? 100) / 100;
        volume = Math.max(0, Math.min(1, volume));
    if(obj.selectedLan==="en"){
      speech.speak( `slot ${slotNum} Fill the pills in the ${slotCol} slots of the dispencer`,{language:"en-IN",pitch:pitch,rate:obj.selectedSpeed??1.0,volume:volume??1});
    }

    if(obj.selectedLan==="ka"){
        speech.speak(`ಸ್ಲಾಟ್ ${slotNum}. ${slotCol} ಸ್ಲಾಟ್‌ಗಳಲ್ಲಿ ಮಾತ್ರೆಗಳನ್ನು ತುಂಬಿಸಿ.`,{language:"ka-IN",rate:obj.selectedSpeed??1.0,volume:volume??1,pitch:pitch??1});
    }

    if(obj.selectedLan==="hi"){
        speech.speak(`स्लॉट ${slotNum}। डिस्पेंसर के ${slotCol} स्लॉट में गोलियाँ भरें।`,{language:"hi-IN",pitch:pitch,rate:obj.selectedSpeed,volume:volume??1});
    }

    if(obj.selectedLan==="ta"){
        speech.speak(`ஸ்லாட் ${slotNum}. மருந்து வழங்கும் கருவியின் ${slotCol} ஸ்லாட்டுகளில் மாத்திரைகளை நிரப்பவும்.`,{language:"ta",pitch:pitch,rate:obj.selectedSpeed,volume:volume});
    }
}
}
export  default textToSpeech
