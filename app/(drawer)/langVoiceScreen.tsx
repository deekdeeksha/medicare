import Bioboxes from "@/components/bioboxes";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LangVoiceScreen(){
    return(
        <ImageBackground source={require("../../assets/images/lanvoiceimg.png")}
                style={{flex:1}}
                resizeMode="cover">
                
        <SafeAreaView  style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10}}>
        <View style={styles.c1}>
            
            <View style={styles.c1_1}>
            <Bioboxes
             icon="translate"
             iconSize={28}
             iconColor="black"
             iconBg="white"
             title="language"
             subtitle="select your langauge"
             subtitlecolor="gray"
             subtitlesize={14}
             titlesize={18}
            />
        
            </View>

            
            <View style={styles.c1_2}>
                
            </View>


        </View>
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    c1:{
        minHeight:200,
        width:"100%",
        backgroundColor:"pink",
        borderRadius:20,
        marginTop:100,
    },

})