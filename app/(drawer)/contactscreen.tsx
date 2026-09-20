import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Box from "../../components/bioboxes1";
export default function Contactscreen(){
    return(
         <SafeAreaView style={{flex:1,backgroundColor: "#F7F8FD"}}>
             <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:5,gap:30}}>

            
            <ImageBackground style={styles.imagebg}
             imageStyle={styles.backgroundImage} source={require("../../assets/images/contactbg.png")}>
            </ImageBackground>
            
            <View style={styles.c1}>
                    <Box 
                        icon="phone"
                        iconSize={30}
                        iconColor="#2870D9" 
                        iconBg="#D9E8FF"
                        title="Call Us"
                        subtitle="+91 7975207873"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>
                    
                    <Box 
                        icon="email"
                        iconSize={30}
                        iconColor="#7434D5" 
                        iconBg="#E9DFFF"
                        title="Email Us"
                        subtitle="support@medicareapp.com"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>

                   

                    <Box 
                        icon="web"
                        iconSize={30}
                        iconColor="#E83C82" 
                        iconBg="#FBD9E7"
                        title="Website"
                        subtitle="www.medicareapp.com"
                        titlesize={18}
                        subtitlesize={14}
                        subtitlecolor="#595F64"/>

                    <Box 
                        icon="clock-outline"
                        iconSize={30}
                        iconColor="#E69A09" 
                        iconBg=""
                        title="Support Hours"
                        subtitle="Mon-Sat|9:00AM-6:00PM"
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
         minHeight:140,
        alignItems: "center",
        justifyContent: "space-evenly",
        
    },

    backgroundImage:{
         borderRadius: 20,
    },

    c1:{
    width:"100%",
    backgroundColor:"#FFFFFF",
    borderRadius:20,
    overflow:"hidden",
    elevation:10,
    }



  
  
})