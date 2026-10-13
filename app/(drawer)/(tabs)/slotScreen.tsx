import Footer from "@/components/footer";
import Slots from "@/components/slots";
import textToSpeech from "@/config/tts";
import { router } from "expo-router";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Slot from "../../../components/boxButtons";
export default function SlotsScreen() {

 const handleSlotInfo=(slotNum:number,slotCol:string)=>{
    Alert.alert(
      `slot ${slotNum}` ,
      `Fill the pills in the ${slotCol} slots of the dispencer`
    )
   textToSpeech(slotNum,slotCol)


}
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
const yellow = {
  bright: "#FFD21F",
  light: "#FFF8D6",
};

  return(
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1,backgroundColor:'white'}} contentContainerStyle={{flexGrow:1,alignItems:'center',gap:40,padding:10,paddingBottom:150}}>
      
      {/* c1  */}
      <View style={styles.c1}>
        <Text style={styles.h1}>Medicine Slots</Text>
        <Text style={styles.h3}>Tap on a slot to view details add / edit medicine</Text>
      </View>
      {/* closing c1 */}

      {/* c2------------------------ */}
    
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
        value={3}
        title="Filled slots"
        bgColor={green.light}
        tColor={green.primary}
      />
         <Slot 
        icons="view-grid"
        iconColor={red.primary}
        iconSize={28}
        value={2}
        title="Empty slots"
        bgColor={red.light}
        tColor={red.primary}
      />

      </View>
      {/* closing c2 */}    
    

     {/* c3------------------------- */}
      <View style={styles.c3}>
      
      <Slots
        iconColor={orange.primary}
        slotColor={orange.primary}
        slotValue={1}
        slotInfo="slot value 1"
        slotStatus="active"
        day="today"
        onPressInfo={()=>{handleSlotInfo(1,"orange")}}
        onPress={()=>{router.push({pathname:'/add',params:{slot:"1",color:"orange"}})}}
        time="7:00 Pm"
        tabletName="paracemtaol 500mg"
        repeat="twice a day"
      
      />

      <Slots
        iconColor={blue.bright}
        slotColor={blue.bright}
        slotValue={2}
        slotInfo="slot value 2"
        slotStatus="active"
        day="today"
         onPressInfo={()=>{handleSlotInfo(2,"blue")}}
        onPress={()=>{router.push({pathname:'/add',params:{slot:"2",color:"blue"}})}}
        time="7:00 Pm"
        tabletName="paracemtaol 500mg"
        repeat="twice a day"
      
      />
      <Slots
        iconColor={purple.primary}
        slotColor={purple.primary}
        slotValue={3}
        slotInfo="slot value 3"
        slotStatus="active"
         onPressInfo={()=>{handleSlotInfo(3,"purple")}}
        onPress={()=>{router.push({pathname:'/add',params:{slot:"3",color:"purple"}})}}
        day="today"
        time="7:00 Pm"
        tabletName="paracemtaol 500mg"
        repeat="twice a day"
      
      />
      <Slots
        iconColor={green.primary}
        slotColor={green.primary}
        slotValue={4}
        onPressInfo={()=>{handleSlotInfo(4,"green")}}
        onPress={()=>{router.push({pathname:'/add',params:{slot:"4",color:"green"}})}}
        slotInfo="slot value 4"
        slotStatus="active"
        day="today"
        time="7:00 Pm"
        tabletName="paracemtaol 500mg"
        repeat="twice a day"
      
      />
      <Slots
        iconColor={yellow.bright}
        slotColor={yellow.bright}
        slotValue={5}
        slotInfo="slot value 5"
        slotStatus="not set"
        day="today"
        onPressInfo={()=>{handleSlotInfo(5,"yellow")}}
        onPress={()=>{router.push({pathname:'/add',params:{slot:"5",color:"yellow"}})}}
        time="7:00 Pm"
        tabletName="paracemtaol 500mg"
        repeat="twice a day"
      
      />
      </View>
        {/* closing c3 */}
  
      {/* footer */}
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
  )
}
const styles=StyleSheet.create({
  c1:{
    minHeight:250,
    width:'100%',
    padding:20,
    gap:10,
    alignItems:'center',
    justifyContent:'flex-start',
    borderBottomLeftRadius:80,
    borderBottomRightRadius:80,
    backgroundColor:'rgba(0, 102, 255, 0.9)',
  },
  h1:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    marginTop:"5%"
  },
  h3:{
    fontSize:20,
    color:'white',
    marginTop:10,
    textAlign:'center'
  },
  c2:{
    minHeight:130,
    width:'90%',
    position:'absolute',
    marginTop:"40%",
    elevation:5,
    zIndex:100,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:15,
    backgroundColor:'rgba(255,255,255,10)',
  },
  c3:{
    minHeight:600,
    width:'100%',
    padding:10,
    marginTop:"15%",
    alignItems:'center',
    justifyContent:'space-evenly',
    gap:30,
    borderTopLeftRadius:80,
    //backgroundColor:'rgba(0, 102, 255, 0.7)',
  },
  
  h5:{
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  
  h6:{
    fontSize:16
  }
})

