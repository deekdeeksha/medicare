import { resetPassword } from "@/config/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgetpassScreen(){
    const[email,setEmail]=useState('')
    const[errormsg,setErrormsg]=useState('')
    const handleForgetPass=async()=>{
        if(!email){
         setErrormsg("Enter the email")
         return
        }

        else if(!email.includes("@gmail.com")){
            setErrormsg("Enter the valid email")
            return
        }

        else{
            try{
            const result=await resetPassword(email)
                if(result.success){
                    Alert.alert("Success",`Password reset link has been sent to your ${email}`)
                    router.navigate("/loginscreen")
                    
                }
                else{
                    Alert.alert("Failed","Try again later")
                    console.log(result.message);
                    
                }
            }

            catch(error){
                console.log(error);
                
            }
            
        }
    }

    return(
         <SafeAreaView style={{flex:1, backgroundColor: '#F3F9F7'}}>
             <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10,gap:5}}>

                    <View style={styles.img}>
                        <Image source={require("../assets/images/forgetpass.png")}
                                        style={{height:250,width:250,borderRadius:30}}
                                        resizeMode="contain"/>
                    </View>

                     <Text style={styles.header}>Forget Password ?</Text>

                    <Text style={styles.description}>No worries! Enter your email address{"\n"} 
                        and  we'll send you a link to reset your password</Text>
                    
                    <Text style={styles.h2}>Email Address</Text>
                    <View style={styles.c1}>
                         
                    <MaterialCommunityIcons
                        name="email"
                        size={22}
                        color="#46566B"
                        style={styles.icon}
                    />

                    <TextInput 
                        style={styles.input}
                        placeholder="Enter your email address"
                       value={email}
                       onChangeText={setEmail} 
                       />
                        </View>
                    
                     <TouchableOpacity onPress={handleForgetPass}
                              style={styles.btn1}>
                              <Text style={styles.resetlink}>
                                Send Reset Link
                              </Text>
                            </TouchableOpacity>
             </ScrollView>
         </SafeAreaView>
    )
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
    color: "#052A2E",
    textAlign: "center",
    marginBottom:15
    },

    description:{
    fontSize: 14,
    lineHeight:20,
    color: "#5E6C7C",
    textAlign: "center",
    fontWeight: "400",
    marginBottom: 55,
    },

    c1:{
        width: "90%",
        height: 45,
        borderWidth: 1,
        borderColor: "#D5DCE5",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-evenly",
        paddingHorizontal: 15,
        backgroundColor: "#F9FAFB",
        marginBottom: 15,
    },

    icon:{
           marginRight: 10,
    },

    input:{
        flex: 1,
        fontSize: 15,
        color: "#10243E",
    },

    btn1:{
    minHeight:50,
    width:"90%",
    alignItems:"center",
    justifyContent:"space-evenly",
    backgroundColor:"#087D68",
    borderRadius:25
  },

  resetlink:{
    fontSize:18,
    color:"white",
    fontWeight:"bold"
  },

  h2:{
    fontSize:14,
    color:"#116356",
    fontWeight:"bold",
    marginRight:200
  }

})