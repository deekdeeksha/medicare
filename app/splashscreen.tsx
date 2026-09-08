import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback } from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen(){
    useFocusEffect(
        useCallback(()=>{
            const timer=setTimeout(() => {
                router.replace("../powerbyscreen");
            }, 3000);

            return()=>clearTimeout(timer);
        },[])
    );
    return(
        <SafeAreaView style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <View style={styles.container}>

                <Image source={require("../assets/images/medi_logo.png")}
                style={{width: 300, height: 300,borderRadius:10,borderWidth:0.2}}/>
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
        backgroundColor:"white",
        borderRadius:5
    }
})
