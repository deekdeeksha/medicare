import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "../../components/bioboxes1";
import Boxes from "../../components/boxButtons1";

export default function AboutScreen(){
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10,gap:15}}>
              
                <ImageBackground style={styles.imagebg}
                imageStyle={styles.backgroundImage} source={require("../../assets/images/aboutbg.jpg")} >
                 <Image source={require("../../assets/images/medi_logo.png")}
                    style={styles.image}/>
                  <Text style={styles.title}>Smart Medicine.Better Health.</Text>  
                   <Text style={styles.subtitle}>MediCare is your smart medication companion{"\n"}that helps you never miss a dose.
                    </Text>
                    <View style={styles.version}>
                        <Text style={styles.vertext}>Version 1.0.0</Text>
                    </View>
                </ImageBackground>

                
                <View style={styles.about}>
                    <View style={styles.icon}>
                <MaterialCommunityIcons 
                name="information-outline"
                size={28}
                color="#6C63FF"/>
                </View>

                <View style={styles.container}>
                    <Text style={styles.h1}>About Medicare</Text>
                    <Text style={styles.h3}>MediCare is designed to help you manage your medicines 
                        efficiently with reminders, smart alerts and real-time
                        device control. Our goal is to make medication simple,
                        safe and reliable for everyone.</Text>
                </View>
                </View>

                <ScrollView  horizontal showsHorizontalScrollIndicator={false} style={styles.c2}
                   contentContainerStyle={styles.boxContent}>
                    <Boxes
                        icons="bell-outline"
                        iconSize={30}
                        iconColor="#A064E8"
                        bgColor="#F1EEFF"
                        heading="Smart Reminders"
                        title="Never miss your medicine"
                        tColor="#A064E8"
                        />
                    
                    <Boxes
                        icons="cellphone-cog"
                        iconSize={30}
                        iconColor="#434a53"
                        bgColor="#EEF5FF"
                        heading="Device Control"
                        title="Control dispenser remotely"
                        tColor="#5796E8"
                        />
                    
                    <Boxes
                        icons="shield-check-outline"
                        iconSize={30}
                        iconColor="#4DBB82"
                        bgColor="#EDFAF3"
                        heading="Safe & Secure"
                        title="Your data is always protected"
                        tColor="#4DBB82"
                        />
                    
                    <Boxes
                        icons="chart-bar"
                        iconSize={30}
                        iconColor="#F28B2D"
                        bgColor="#FFF4E8"
                        heading="Logs & History"
                        title="Track your medicine history"
                        tColor="#F28B2D"
                        />
                       
            </ScrollView>
            
            <View style={styles.c3}>
                        <Box
                        icon="account-group-outline"
                        iconSize={30}
                        iconColor="#6C63FF" 
                        iconBg="#F1EEFF"
                        title="Developed By"
                        subtitle="Deeksha DP"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>

                        <Box
                        icon="email-outline"
                        iconSize={30}
                        iconColor="#5796E8" 
                        iconBg="#EEF5FF"
                        title="Contact Us"
                        subtitle="medicare.support@gmail.com"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>

                        <Box
                        icon="web"
                        iconSize={30}
                        iconColor="#4DBB82" 
                        iconBg="#EDFAF3"
                        title="Website"
                        subtitle="www.medicare.app"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>

                        <Box
                        icon="shield-lock-outline"
                        iconSize={30}
                        iconColor="#F28B2D" 
                        iconBg="#FFF4E8"
                        title="Privacy Policy"
                        subtitle="Read our privacy policy"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>
                    </View>
                    
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    
    imagebg:{
         width: "100%",
         minHeight:300,
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    backgroundImage:{
         borderRadius: 20,
    },

    image:{
       height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 6,
        borderColor: "white"
    
    },

    title:{
    fontSize: 16,
    color: "#555",
    marginTop: -10,
    fontWeight:"bold"
    },

    subtitle:{
    fontSize: 14,
    color: "#697083",
    textAlign: "center",
    fontWeight:"600"
    },

    version:{
        height:40,
        width:"40%",
        alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"#E4E1FF",
        borderRadius:20
    },

    vertext:{
    fontSize: 16,
    fontWeight: "700",
    color: "#6867E8",
    },

    about:{
        minHeight:170,
        width:"100%",
        backgroundColor:"#FFFFFF",
        borderRadius:20,
        elevation:10,
        padding:20,
        flexDirection:"row"
    },

    icon:{
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#F1EEFF",
    alignItems: "center",
    justifyContent: "center",
    
    },

    container:{
    flex: 1,
    marginLeft:18,
    },

    h1:{
        fontSize:18,
        fontWeight:"bold",
        color:"#0A1B4D",
        marginBottom:10
    },

    h3:{
        fontSize:14,
        color: "#666",
        
    },

    c2:{
        minHeight:180,
        width:"100%",
        padding:10,
        backgroundColor:"#FFFFFF",
        borderRadius:25,
        elevation:10,
    },

    boxContent: {
    alignItems: "center",
    padding: 10,
    gap: 15,
   justifyContent:"space-evenly",
    },

   c3:{
    width:"100%",
    backgroundColor:"#FFFFFF",
    borderRadius:20,
    overflow:"hidden",
    elevation:10,
}


})