import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PowerByScreen(){
     useFocusEffect(
         useCallback(()=>{
             const timer=setTimeout(async()=>{
             const userLogged=await AsyncStorage.getItem("user")
             if (userLogged==="true"){
              router.replace("/(drawer)/(tabs)")
             }
             else{
              router.replace("/loginscreen")
             }
             },3000)
         return()=>clearTimeout(timer)
         },[])
     );
  return(
    <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      <View style={styles.container}>
        <Text style={styles.h1}>Powered By</Text>
        <Image source={require("../assets/images/our_logo.png")}
        style={{width: 300, height: 300,borderRadius:10,borderWidth:0.3}}/>
        
      </View>
    </SafeAreaView>

  )
}

const styles=StyleSheet.create({
    container:{
       width:"90%",
       height:400,
       alignItems:"center",
       justifyContent:"space-evenly",
       borderRadius:5
    },
    h1:{
        fontSize:40,
        textTransform:'capitalize',
        fontWeight:'bold',
    }
})
    
