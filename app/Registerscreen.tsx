import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function(){
    return(
        <ImageBackground source={require("../assets/images/registerbg.png")}
        style={{flex:1}}
        resizeMode="cover">
        <SafeAreaView style={{flex:1}}>
        <ScrollView style={{flex:1}} contentContainerStyle={{alignItems:"center",justifyContent:"space-evenly",padding:10}}>
        <View style={styles.c1}>
            
            {/* box1 */}
            <View style={styles.box1}>
                <View style={styles.labelbox}><Text style={styles.label}>Full Name</Text></View>
                <View style={styles.c1_1}>
                <View style={styles.logobox}>
                    <MaterialIcons
                    name="person-outline"
                    size={25}
                    color="#3A7BFF"/>
                </View>
                
                <TextInput style={styles.input} placeholder="Enter your full name" 
                placeholderTextColor={"#3A7BFF"}/>
            </View>
            </View>

            {/* box2 */}
            <View style={styles.box1}>
                <View style={styles.labelbox}><Text style={styles.label}>Email Address</Text></View>
                <View style={styles.c1_1}>
                <View style={styles.logobox}>
                    <MaterialIcons
                    name="email"
                    size={25}
                    color="#3A7BFF"/>
                </View>
                
                <TextInput style={styles.input} placeholder="Enter your email address" 
                placeholderTextColor={"#3A7BFF"}/>
            </View>
            </View>

            {/* box3 */}
            <View style={styles.box1}>
                <View style={styles.labelbox}><Text style={styles.label}>Phone Number</Text></View>
                <View style={styles.c1_1}>
                <View style={styles.logobox}>
                    <MaterialIcons
                    name="phone"
                    size={25}
                    color="#3A7BFF"/>
                </View>
                
                <TextInput style={styles.input} placeholder="Enter your phone number" 
                placeholderTextColor={"#3A7BFF"}/>
            </View>
            </View>

            {/* box4 */}
            <View style={styles.box1}>
                <View style={styles.labelbox}><Text style={styles.label}>Password</Text></View>
                <View style={styles.c1_1}>
                <View style={styles.logobox}>
                    <MaterialIcons
                    name="lock"
                    size={25}
                    color="#3A7BFF"/>
                </View>
                
                <TextInput style={styles.input} placeholder="Create a password" 
                placeholderTextColor={"#3A7BFF"}
                 secureTextEntry={true}/>
            </View>
            </View>

            {/* box5 */}
            <View style={styles.box1}>
                <View style={styles.labelbox}><Text style={styles.label}>Confirm Password</Text></View>
                <View style={styles.c1_1}>
                <View style={styles.logobox}>
                    <MaterialIcons
                    name="lock"
                    size={25}
                    color="#3A7BFF"/>
                </View>
                
                <TextInput style={styles.input} placeholder="Confirm your password" 
                placeholderTextColor={"#3A7BFF"}
                secureTextEntry={true}/>
            </View>
            </View>

            <TouchableOpacity style={styles.loginbtn}>
                        <Text style={styles.login}>Register</Text>
                        <MaterialIcons
                        name="arrow-forward"
                        size={26}
                        color="white"/>
                        
                    </TouchableOpacity>
                    

                    <View style={styles.c2}>
                        <View style={styles.line}/>
                        <Text style={styles.text}>OR</Text>
                         <View style={styles.line}/>
                    </View>

                    <View style={styles.c3}>
                        
                    <TouchableOpacity style={styles.google}>
                    <Image source={require("../assets/images/google.png")} 
                    style={{height:20,width:20}}/>
                    <Text style={styles.text2}>Continue with Google</Text>
                    </TouchableOpacity>
                    
                    

                    
                    <TouchableOpacity style={styles.apple}>
                        <MaterialIcons
                        name="apple"
                        size={25}
                        color="black"/>
                        <Text style={styles.text2}>Continue with Apple</Text>
                    </TouchableOpacity>
                    </View>

                    <Text style={{fontSize:14,color:"#8A98AD"}}>Already have an account?
                        <Text style={{fontSize:14,color:"#3A7BFF",fontWeight:"bold"}}>Login</Text></Text>
            
        
        </View> 
       </ScrollView>   
        </SafeAreaView>    
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    c1:{
         minHeight:600,
        width:"100%",
        backgroundColor:"rgba(255,255,255,0.5)",
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:10,
        borderRadius:20,
        marginTop:150,
        gap:15
    },

    box1:{
        width:"90%",
        alignItems:"flex-start",
        justifyContent:"space-evenly",
        padding:10,
        backgroundColor:"white",
        borderRadius:15,
        borderWidth:0.2,
        borderColor:"rgba(171, 200, 239, 0.9)"
        
    },

    

    label:{
        fontSize:15,
        fontWeight:"bold",
        color:"#3A7BFF",
    },

    c1_1:{
        alignItems:"center",
        justifyContent:"space-evenly",
        borderRadius:5,
        flexDirection:"row",
        padding:10,
        width:"100%",
        gap:10,
        backgroundColor:"white"
    },

    logobox:{
        padding:5,
        alignItems:"center",
        justifyContent:"space-evenly",
        backgroundColor:"white",
        borderRadius:9,
    },

    input:{
        borderWidth:0.5,
        paddingHorizontal:20,
        paddingVertical:5,
        borderRadius:5,
        width:"85%",
        backgroundColor:"white",
        height:40,
        borderColor:"rgba(171, 200, 239, 0.9)",
        fontSize:14

    },

    loginbtn:{
        width:"90%",
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:"#3A7BFF",
        paddingVertical:10,
        paddingHorizontal:30,       
         gap:20,
         justifyContent:"center",
        borderRadius:8,
        
    },

    login:{
        fontSize:16,
        color:"white",
        fontWeight:"bold"
    },

    logobox1:{
        backgroundColor:"white",
        height:25,
        width:25,
        borderRadius:15
    },

    c2:{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 25,
    },

    line:{
        flex: 1,
        height: 1,
        backgroundColor: "rgba(171, 200, 239, 0.9)",
    },

    text:{
        marginHorizontal: 10,
        fontSize: 15,
        color: "#8A98AD",
    },

    c3:{
        minHeight:40,
        width:"100%",
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly",
        borderRadius:10,
        paddingVertical:20,
        paddingHorizontal:5
    },

    google:{
        flexDirection:"row",
        width:"45%",
        minHeight:60,
        alignItems:"center",
        justifyContent:"space-evenly",
        borderWidth:0.2,
        borderColor:"rgba(171, 200, 239, 0.9)",
        borderRadius:15,
        padding:5
    },
    
    apple:{
        flexDirection:"row",
        width:"45%",
        minHeight:60,
        borderWidth:0.2,
        borderColor:"rgba(171, 200, 239, 0.9)",
        alignItems:"center",
        justifyContent:"space-evenly",
        borderRadius:15,
        padding:5
       
    },

    text2:{
        fontSize:12,
        fontWeight:"bold"
    }




})


