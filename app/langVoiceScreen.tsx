import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LangVoiceScreen(){
    return(
        <ImageBackground source={require("../assets/images/lanvoiceimg.png")}
                style={{flex:1}}
                resizeMode="cover">
                
        <SafeAreaView  style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10}}>
        <View style={styles.c1}>
            <View style={styles.c1_1}>
                <MaterialCommunityIcons name="translate"
                size={26}
                color="blue"/>

                <Text>Language</Text>
                <Text>Select the language for speech</Text>
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
        flexDirection:"row"
    },

})