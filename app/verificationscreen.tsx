import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationScreen() {
    return(
        <SafeAreaView style={{flex:1, backgroundColor: 'white'}}>
            <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10,gap:15}}>
                    
            <View style={styles.img}>
                <Image source={require("../assets/images/verificationImg.png")}
                style={{height:250,width:250,borderRadius:30}}
                resizeMode="contain"/>
            </View>

            <Text style={styles.header}>Verification Link Sent !</Text>

            <Text style={styles.description}>We’ve sent a verification link to your email{"\n"}
          address. Please check your inbox and click{"\n"}
          the link to verify your account.</Text>

            <View style={styles.c1}> 
            <View>
            <MaterialCommunityIcons
              name="email-outline"
              size={45}
              color="#15916F"
            />
          </View>

          <View style={styles.c1_2}>
            <Text style={styles.h1}>
              Didn’t receive the email?
            </Text>

            <Text style={styles.h2}>
              Check your spam or junk folder.
            </Text>
          </View>
        </View>

       
        <TouchableOpacity onPress={()=>{router.navigate("/loginscreen")}}
          style={styles.btn1}>
          <Text style={styles.logintext}>
            Back to Login
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
    img:{
    width: "100%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    },

    header:{
    fontSize: 24,
    fontWeight: "700",
    color: "#10243E",
    textAlign: "center",
    marginBottom:15
    },

    description:{
    fontSize: 14,
    lineHeight:20,
    color: "#46566B",
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 55,
    },

    c1:{
        flexDirection:"row",
        minHeight:80,
        width:"90%",
        backgroundColor:"#EDF9F5",
        borderRadius:20,
        alignItems:"center",
        justifyContent:"space-evenly",
        marginBottom:20
    },


  h1: {
    fontSize:16,
    fontWeight: "700",
    color: "#08785F",
    marginBottom: 10,
  },

  h2: {
    fontSize: 14,
    color: "#3C806F",
    lineHeight: 27,
  },

  btn1:{
    minHeight:50,
    width:"90%",
    alignItems:"center",
    justifyContent:"space-evenly",
    backgroundColor:"#087D68",
    borderRadius:25
  },

  logintext:{
    fontSize:18,
    color:"white",
    fontWeight:"bold",
  }

    



})