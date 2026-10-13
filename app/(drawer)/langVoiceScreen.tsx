import Bioboxes from "@/components/bioboxes";
import Buttons from "@/components/buttons";
import Iconboxes from "@/components/iconBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompSlider from "../../components/slider";
export default function LangVoiceScreen(){
    const [language,setLanguage]=useState("en");
    const [volume,setVolume]=useState(50);
    const [speed,setSpeed]=useState(1.0);
    const [pitch,setPitch]=useState(10);
    const [test,setTest]=useState("")

    const handleSave=async()=>{
         Alert.alert(
         "Settings Saved!",
         `language:${language}\nspeed:${speed}x\nvolume:${volume}%\npitch:${pitch}%`
        )
    
        const languageObj={
            selectedLan:language,
            selectedSpeed:speed,
            selectedVol:volume,
            selectedPit:pitch
        }
        await AsyncStorage.setItem("languageSettings",JSON.stringify(languageObj))
        }



    return(
        <ImageBackground source={require("../../assets/images/lanvoiceimg.png")}
                style={{flex:1}}
                resizeMode="cover">
                
        <SafeAreaView  style={{flex:1}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10}}>
        
        <View style={styles.c1}>
            


          <View style={styles.c1_1}>
            <Bioboxes
             icon="web"
             iconSize={30}
             iconColor="#3478F6"
             iconBg="white"
             title="Language"
             subtitle="Select the language for speech"
             subtitlecolor="gray"
             subtitlesize={14}
             titlesize={18}
            />
          
            <View style={styles.dropdownBox}>
                <Text style={styles.flag}>🇮🇳</Text>
            <Picker
            selectedValue={language}
            onValueChange={(value) =>setLanguage(value)}
            style={styles.picker}
            dropdownIconColor="#142B66"
        >
          <Picker.Item
            label="English"
            value="en"
          />

          <Picker.Item
            label="Kannada (ಕನ್ನಡ)"
            value="ka"
          />

          <Picker.Item
            label="Hindi (हिन्दी)"
            value="hi"
          />
          <Picker.Item
            label="Tamil (தமிழ்)"
            value="ta"
          />
        </Picker>
        </View>
        {/* closing dropdown */}
      </View>

      <View style={styles.c1_2}>
            <Bioboxes
             icon="account-voice"
             iconSize={30}
             iconColor="#3478F6"
             iconBg="white"
             title="Voice"
             subtitle="Select speed , pitch and volume"
             subtitlecolor="gray"
             subtitlesize={14}
             titlesize={18}
            />

            <CompSlider
            title="Speed"
            valueStr={`${speed}x`}
            minValue={0}
            maxValue={2}
            step={0.5}
            value={speed}
            onChangeValue={setSpeed}
            minTrackTintCol="#3478F6"
            maxTrackTintCol="gray"
            thumbTintCol="orange"
            disabled={false}
            sc1="0x"
            sc2="0.5x"
            sc3="1x"
            sc4="1.5x"
            sc5="2x"
            />

            <CompSlider
            title="Volume"
            valueStr={`${volume}%`}
            minValue={0}
            maxValue={100}
            step={1}
            value={volume}
            onChangeValue={setVolume}
            minTrackTintCol="#3478F6"
            maxTrackTintCol="gray"
            thumbTintCol="orange"
            disabled={false}
            sc1="0%"
            sc2="25%"
            sc3="50%"
            sc4="75%"
            sc5="100%"
            />

            <CompSlider
            title="Pitch"
            valueStr={`${pitch}%`}
            minValue={0}
            maxValue={100}
            step={25}
            value={pitch}
            onChangeValue={setPitch}
            minTrackTintCol="#3478F6"
            maxTrackTintCol="gray"
            thumbTintCol="orange"
            disabled={false}
            sc1="0%"
            sc2="25%"
            sc3="50%"
            sc4="75%"
            sc5="100%"
            />
        </View>

        <View style={styles.test}>
            <View style={styles.icon_text}>
                <Iconboxes
                icons="chat-alert"
                iconColor="#3478F6"
                bgColor="white"
                width={40}
                height={40}
                size={30}
                />
            <Text style={styles.h2}>Enter the text to test</Text>
            </View>
            <TextInput style={styles.input} placeholder="Enter the text to test the voice."
            value={test}
            onChangeText={setTest}/>
           
           
            <Buttons
                icon="play-circle-outline"
                iconSize={20}
                iconColor="white"
                bg="#3478F6"
                title="Test Speech"
                btnHeight={50}
                btnWidth={200}
                fontSize={18}
                fontColor="white"
                borSize={0.5}
                borColor="white"
                onpress={() => {}}
                load={false}
            />

        </View>  

        <Buttons onpress={handleSave}
                icon="content-save-outline"
                iconSize={20}
                iconColor="white"
                bg="#3478F6"
                title="Save Settings"
                btnHeight={50}
                btnWidth={300}
                fontSize={18}
                fontColor="white"
                borSize={0.5}
                borColor="white"
                load={false}
            />         
        </View>
    

        
        </ScrollView>
        </SafeAreaView>
        </ImageBackground>
    );
}

    const styles=StyleSheet.create({
    c1:{
        minHeight:500,
        width:"100%",
        backgroundColor:"white",
        marginTop:130,
        padding:10,
        borderRadius:10,
        gap:15,
        paddingBottom:50,
        alignItems:"center",
        justifyContent:'space-evenly'
       
    },

    c1_1:{
        gap:10,
        backgroundColor:'white',
        borderRadius:15,
        width:'100%',
        alignItems:'flex-start',
        justifyContent:"space-evenly",
        minHeight:200
    },
    c1_2:{
        gap:10,
        backgroundColor:'white',
        borderRadius:15,
        width:'100%',
        alignItems:'center',
        justifyContent:"space-evenly",
        minHeight:200
    },

    dropdownBox:{
        flexDirection:"row",
        alignItems:"center",
        height:50,
        width: "100%",
        borderWidth: 1,
        borderColor: "#CDDCF4",
        borderRadius: 12,
        paddingLeft: 8,
        backgroundColor: "white",
    },

    flag:{
        fontSize: 20,
    },

    picker:{
        flex: 1,
        height: 55,
        color: "#142B66"
    },

    boxes:{
        minHeight:120,
        width:'100%',
        borderRadius:10,
        borderWidth:1,
        marginBottom:30,
        padding:5
    },

    header:{
        flexDirection:"row",
        alignItems:"center",
        padding:2,
        paddingHorizontal:3,
        justifyContent:"space-between",
    },
    
    title:{
        fontSize:16,
        fontWeight:"bold",
    },

    value:{
        fontSize:14,
        color:'grey'
    },
    scale:{
        flexDirection:"row",
        justifyContent:'space-between'
    },
    muted:{
        fontSize:14,
        color:'gray'
    },

    test:{
        minHeight:250,
        width:"95%",
        marginTop:30,
        elevation:8,
        padding:5,
        borderWidth:0.1,
        borderColor:'gray',
        backgroundColor:"white",
        borderRadius:10,
        alignItems:"center",
        justifyContent:'space-evenly',
        gap:10,
        marginBottom:30
        
    },

    h2:{
        fontSize:16,
        fontWeight:"bold",
        color:"gray"
    },

    input:{
        height:50,
        width:"90%",
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:"gray",
        borderRadius:10
    },

    icon_text:{
        flexDirection:'row',
        padding:2,
        backgroundColor:"white",
        width:"90%",
        alignItems:"center",
        justifyContent:"center"
    }
})