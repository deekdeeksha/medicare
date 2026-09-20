import Footer from "@/components/footer";
import VerticalButtons from "@/components/verticalButtons";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NextMed from "../../../components/nextMed";
import StatusField from "../../../components/statusBox";
import TimeDateSlots from "../../../components/timeDateSlots";
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
  return(
    <ImageBackground source={require("../../../assets/images/homepage.png")} style={{flex:1}}>
    <SafeAreaView style={{flex:1}}>
    <ScrollView style={{flex:1}} contentContainerStyle={{paddingBottom:150,paddingTop:250,gap:40,alignItems:'center',justifyContent:'space-evenly',padding:10}}>
    
    {/* name  text     */}
      <View style={{marginRight:70}}>
        <Text style={styles.heading}>Hello, Deeksha 👋</Text>
        <Text style={styles.subtitle}>Here's your health summary today</Text>
      </View>

      {/* time date box */}
       <TimeDateSlots 
       date="21 Aug 2026" 
       time="10:00 AM"/>
       
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
      <NextMed
        Uicon="clock"
        Micon="pill"
        UiconColor={blue.bright}
        MiconColor="#1C9129"
        bgColor="#3694ff34"
        Uheading="Next Medicine Schedule"
        maintext="10:30 AM"
        iconColor="#1C9129"
      />

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
  }

})