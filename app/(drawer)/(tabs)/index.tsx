import Footer from "@/components/footer";
import VerticalButtons from "@/components/verticalButtons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StatusField from "../../../components/statusBox";
import TimeDateSlots from "../../../components/timeDateSlots";
import {
  formatDoseTime,
  getMedicines,
  getNextDose,
  Medicine,
} from "../../../config/medicineStorage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function home  ()  {
  const blue = {
  primary: "#195FDB",
  bright: "#3695FF",
  dark: "#123A73",
  light: "#EAF3FF",
};
const green = {
  primary: "#1C9129", 
  light: "#EEF9F0",
};
const purple = {
  primary: "#8061C5",
  light: "#F5F0FF",
};
const orange = {
  primary: "#FF9224",
  light: "#FFF5EA",
};
const red = {
  primary: "#DC2626",
  light: "#FEF2F2",
};

const ESP32_IP = "192.168.4.1";
const TIME_URL = `http://${ESP32_IP}/time`;

const [rtcTime, setRtcTime] = useState("Loading....");
const [rtcDate, setRtcDate] = useState("Loading....");
const [rtcConnected, setRtcConnected] = useState(false);

useEffect(() => {
  let mounted = true;

  const fetchRtcTime = async () => {
    try {
      const response = await fetch(TIME_URL);

      if (!response.ok) {
        throw new Error("RTC request failed");
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error("RTC is unavailable");
      }

      if (mounted) {
        setRtcTime(data.time);
        setRtcDate(data.date);
        setRtcConnected(true);
      }
    } catch (error) {
      if (mounted) {
        setRtcConnected(false);
      }

      console.log("RTC fetch error:", error);
    }
  };

  fetchRtcTime();

  const interval = setInterval(fetchRtcTime, 1000);

  return () => {
    mounted = false;
    clearInterval(interval);
  };
}, []);
const BASE_URL = `http://${ESP32_IP}`;

const triggerEmergencyAlert = async () => {
  console.log("sos  pressed"); 
  try {
    const response = await fetch(`${BASE_URL}/buzzer/on`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("ESP32 request failed");
    }

    Alert.alert("Emergency Alert", "Buzzer activated successfully!");
  } catch (error) {
    Alert.alert(
      "Connection Error",
      "Could not connect to the Medicare device. Check your Wi-Fi connection."
    );
  }
};


const [nextMedicine, setNextMedicine] = useState<{
  medicine: Medicine;
  dose: Date;
} | null>(null);

useFocusEffect(
  useCallback(() => {
    let mounted = true;

    const loadNextMedicine = async () => {
      const medicines = await getMedicines();
      const now = new Date();

      const upcoming = medicines
        .map((medicine) => ({
          medicine,
          dose: getNextDose(medicine, now),
        }))
        .filter(
          (item): item is {
            medicine: Medicine;
            dose: Date;
          } => item.dose !== null
        )
        .sort(
          (a, b) =>
            a.dose.getTime() - b.dose.getTime()
        );

      if (mounted) {
        setNextMedicine(upcoming[0] ?? null);
      }
    };

    loadNextMedicine();

    return () => {
      mounted = false;
    };
  }, [])
);

  return(
    <ImageBackground source={require("../../../assets/images/homepage.png")} style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:150,paddingTop:250,gap:40,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
    
    {/* name  text     */}
      <View style={{marginRight:70}}>
        <Text style={styles.heading}>Hello, Deeksha  👋</Text>
        <Text style={styles.subtitle}>Here's your health summary today</Text>
      </View>

      <View style={{width:"90%",minHeight:100,backgroundColor:"white",elevation:8,borderRadius:10,alignItems:"center",justifyContent:"space-evenly"}}>
        <Text style={{fontSize:18,fontWeight:"bold"}}><MaterialCommunityIcons name="wifi" color="#075B48" size={28}/>   Device Connection</Text>
        {rtcConnected?(<Text style={{color:"green",fontSize:16,fontWeight:"600"}}>Device Connected</Text>):(<Text style={{color:"red",fontSize:16,fontWeight:"600"}}>Not Connected</Text>)}
      </View>
      {/* time date box */}
      
      <TimeDateSlots 
       date={rtcDate}
       time={rtcTime}/>
       
      {/* Battery and slots field  */}
      <View style={styles.status}>
      <StatusField
        maintext="85"
        suffix="%"
        headertext="Battery Status"
        icons="battery-40"
        prefix=""
        iconColor="#1C9129"
        bgColor="white"
        tColor="#1C9129"
        footertext="Device Connected"  
        />
      <StatusField
        maintext="/"
        suffix="5"
        prefix="4"
        headertext="Slots Filled"
        icons="slot-machine"
        iconColor="#2879E8"
        tColor="#2879E8"
        bgColor="white"
        footertext="75% slots used"
      />  
      </View>

      
      {/* Next medicine schedule field */}
  <View style={styles.nextMedicine}>
        <Text style={styles.nextTitle}> Next Medicine Schedule </Text>

      {nextMedicine ? (
      <>
      <Text style={styles.medicineName}>
        {nextMedicine.medicine.name}
      </Text>

      <Text style={styles.medicineTime}>
        {formatDoseTime(nextMedicine.dose)}
      </Text>

      <Text style={styles.medicineDetails}>
        Slot {nextMedicine.medicine.slot}
        {" • "}
        {nextMedicine.medicine.category}
      </Text>

      <Text style={styles.medicineDetails}>
        {nextMedicine.dose.toDateString() ===
        new Date().toDateString()
          ? "Scheduled for today"
          : `Scheduled for ${nextMedicine.dose.toLocaleDateString()}`}
      </Text>
    </>
  ) : (
    <Text style={styles.medicineDetails}>
      No upcoming medicine schedules
    </Text>
  )}
</View>

      {/* quick actions */}
      <ScrollView contentContainerStyle={{padding:10,alignItems:'center',justifyContent:'space-evenly',gap:30}} showsHorizontalScrollIndicator={false} horizontal={true} style={styles.scroll}>
      <VerticalButtons 
        icon="alert"
        heading="emergency alert"
        iconColor={red.primary}
        iconSize={40}
        iconHeight={80}
        iconWidth={80}
        bg={red.light}
        iconbgColor="white"
        onpress={triggerEmergencyAlert}
      />
      <VerticalButtons
        icon="history"
        heading="medicine history"
        iconColor={green.primary}
        iconSize={40}
        iconHeight={80}
        iconWidth={80}
        bg={green.light}
        iconbgColor="white"
        
      />
      <VerticalButtons 
        icon="scan-helper"
        heading="medicine info"
        iconColor={purple.primary}
        iconSize={40}
        iconHeight={80}
        iconWidth={80}
        bg={purple.light}
        iconbgColor="white"
      />
      <VerticalButtons 
        icon="cog"
        heading="settings"
        iconColor={orange.primary}
        iconSize={40}
        iconHeight={80}
        iconWidth={80}
        bg={orange.light}
        iconbgColor="white"
      />
      </ScrollView>

      <Footer 
      icons="check-decagram"
      iconColor={blue.primary}
      bgColor={blue.light}
      width={80}
      height={80}
      size={40}
      title="stay healthy, stay on track!"
      subtitle="Don't miss your medicine, consistency is key"
      color={blue.bright}
      />

    </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  )
}

const styles=StyleSheet.create({
  heading:{
    fontSize:30,
    fontWeight:'bold',
  },
  subtitle:{
    fontSize:18,
    color:'gray',
     width:"100%",
    textAlign:'center',
    fontWeight:"600"
  },
  status:{
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    width:"100%",
    elevation:10,
    paddingVertical:10,
  },
  scroll:{
    minHeight:150,
    width:"100%",
    borderRadius:10,
  },
  nextMedicine: {
  width: "100%",
  padding: 20,
  borderRadius: 18,
  backgroundColor: "#EAF3FF",
  borderWidth: 1,
  borderColor: "#BBD5FF",
  elevation: 3,
},
nextTitle: {
  fontSize: 18,
  fontWeight: "bold",
  color: "#195FDB",
  marginBottom: 12,
},
medicineName: {
  fontSize: 24,
  fontWeight: "bold",
  color: "#123A73",
},
medicineTime: {
  fontSize: 30,
  fontWeight: "bold",
  color: "#195FDB",
  marginVertical: 8,
},
medicineDetails: {
  fontSize: 15,
  color: "#555",
  marginTop: 4,
},

})
