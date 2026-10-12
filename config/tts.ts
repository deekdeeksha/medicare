import * as speech from "expo-speech";
const textToSpeech=(text:string,languageSelected:string)=>{
    speech.speak(text,{language:languageSelected});
}
export  default textToSpeech