import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Boxes from "../../components/bioboxes";
import Buttons from "../../components/buttons";
export default function BiometricSet(){
    
    return(
        <ImageBackground source={require("../../assets/images/biometricbg.jpg")}
        style={{flex:1}}
        resizeMode="cover">
            <SafeAreaView style={{flex:1}}>
                <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10,gap:15}}>
                 <View style={styles.c1}>
                    <Image source={require("../../assets/images/biometric.jpg")}
                        style={{height:120,width:120,borderRadius:60,borderWidth:6,borderColor:"white"}}/>
                        <Text style={styles.h1}>Secure Your Account </Text>
                        <Text style={styles.h3}>Use your fingerprint to unlock the app and protect your data</Text>
                    </View>

                 <View style={styles.c2}>
                        <Boxes
                        icon="shield-check-outline"
                        iconSize={30}
                        iconColor="#07745e" 
                        iconBg="#DFF5E5"
                        title="Quick Access"
                        subtitle="Unlock the app instantly using your fingerprint"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>
                      
                      <Boxes
                        icon="lock-outline"
                        iconSize={30}
                        iconColor="#07745e"
                        iconBg="#DFF5E5"
                        title="Enhanced Security"
                        subtitle="Keep your medicines and personal information safe"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>
                    
                     <Buttons
                     icon="fingerprint"
                     iconSize={28}
                     iconColor="white"
                     bg="#6CAA84"
                     title="Set Biometric(Turn on) "
                     btnHeight={60} 
                     btnWidth={280}
                     fontSize={20}
                     fontColor="white"
                     borColor="white"
                     borSize={0.1}
                    />

                    <Buttons
                     icon="hand-back-right-outline"
                     iconSize={28}
                     iconColor="#6CAA84"
                     bg="white"
                     title="Turn off Biometric "
                     btnHeight={60} 
                     btnWidth={280}
                     fontSize={20}
                     fontColor="#6CAA84"
                     borColor="#6CAA84"
                     borSize={0.8}
                    />
                      
                    </View>  

                     
                 

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    c1:{
        minHeight:200,
        width:"90%",
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:10,
        flexDirection:"column",
        borderRadius:10,
        backgroundColor:"transparent",
    },

    h1:{
        fontSize:20,
        fontWeight:"bold",
        color:"#07745e"
    },

    h3:{
        fontSize:14,
        textAlign:"center",
        color:"#565B67",
        fontWeight:"600"
    },

    c2:{
        minHeight:300,
        width:"100%",
        backgroundColor:"white",
        alignItems:"center",
        justifyContent:"space-evenly",
        paddingHorizontal:10,
        paddingVertical:20,
        borderRadius:10,
        elevation:10,
        gap:20
    
    },

   
    
   
})