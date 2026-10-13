import AsyncStorage from "@react-native-async-storage/async-storage";
import * as speech from "expo-speech";
const textToSpeech=async(slotNum:number,slotCol:string)=>{
    const userLang=await AsyncStorage.getItem("languageSettings")
    console.log(userLang);
   
    if(userLang){
        const obj=JSON.parse(userLang)
          console.log("obj",obj);
    
    if(obj.selectedLan==="en"){
      speech.speak( `slot ${slotNum} Fill the pills in the ${slotCol} slots of the dispencer`,{language:"en",pitch:obj.selectedPit,rate:obj.selectedSpeed,volume:obj.selectedVol});
    }

    if(obj.selectedLan==="ka"){
        speech.speak(`ಸ್ಲಾಟ್ ${slotNum}. ${slotCol} ಸ್ಲಾಟ್‌ಗಳಲ್ಲಿ ಮಾತ್ರೆಗಳನ್ನು ತುಂಬಿಸಿ.`,{language:"ka",pitch:obj.selectedPit,rate:obj.selectedSpeed,volume:obj.selectedVol});
    }

    if(obj.selectedLan==="hi"){
        speech.speak(`स्लॉट ${slotNum}। डिस्पेंसर के ${slotCol} स्लॉट में गोलियाँ भरें।`,{language:"hi",pitch:obj.selectedPit,rate:obj.selectedSpeed,volume:obj.selectedVol});
    }

    if(obj.selectedLan==="ta"){
        speech.speak(`ஸ்லாட் ${slotNum}. மருந்து வழங்கும் கருவியின் ${slotCol} ஸ்லாட்டுகளில் மாத்திரைகளை நிரப்பவும்.`,{language:"ta",pitch:obj.selectedPit,rate:obj.selectedSpeed,volume:obj.selectedVol});
    }
}
}
export  default textToSpeech
