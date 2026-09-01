import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Boxes from "../components/displayboxes"
import Buttons from "@/components/buttons"; 
import { SafeAreaView } from "react-native-safe-area-context";

export default function profileScreen() {

    return(
        <SafeAreaView style={{flex:1,backgroundColor: "#F7FAF9"}}>
        <View style={styles.container}>
            <View style={styles.header}>
            <View style={styles.headerbtn}>
                <TouchableOpacity
                onPress={()=>router.back()}>
                 <MaterialIcons
                name="chevron-left"
                size={26}
                color="#075B48"/>
                </TouchableOpacity>

                </View>

            <Text style={styles.h1}>My Profile</Text>

            <TouchableOpacity style={styles.headerbtn}>
                <MaterialIcons
                name="edit"
                size={26}
                color="#075B48"/>
            </TouchableOpacity>
            </View>

             <ScrollView
         style={{flex:1}} contentContainerStyle={{alignItems:"center",padding:10,gap:15}}>
        

         
          <ImageBackground
            source={require("../assets/images/profilebg.png")}
            style={{minHeight:200,width:"100%",borderRadius:25,overflow:"hidden"}}>
            <View style={styles.c1}>
        <Image
        source={{
uri:"https://as2.ftcdn.net/v2/jpg/05/49/98/39/1000_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg",
}}
        style={styles.profile}
        />

        <TouchableOpacity style={styles.btn1}>
        <Ionicons name="camera" size={25} color="white"/>
        </TouchableOpacity>

        </View>
        <View style={styles.c2}>
        <Text style={styles.t2}>
            Deeksha DP
        </Text>

        
        <Text style={styles.t3}>
            deekshadp45@gmail.com
        </Text>
        </View>
        </ImageBackground>

        

        <View style={styles.sectionTitle}>
        <View style={styles.sectionIcon}>
        <MaterialCommunityIcons
            name="account"
            size={24}
            color="#075B48"
        />
    </View>

    <Text style={styles.title}>
        Personal Information
    </Text>
</View>
        
        <View style={styles.perinfo}>
            
            <Boxes
            icon="account"
            iconBg="#EAF4ED"
            iconColor="#075B48"
            title="Full Name"
            value="Deeksha.DP"
            iconSize={28}/>
            <Boxes
             icon="email"
            iconBg="#EAF4ED"
            iconColor="#075B48"
            title="Email"
            value="deekshadp45@gmail.com"
            iconSize={28}/>
            <Boxes
             icon="phone"
            iconBg="#EAF4ED"
            iconColor="#075B48"
            title="Phone Number"
            value="7975207873"
            iconSize={28}/>
            <Boxes
            icon="calendar"
            iconBg="#EAF4ED"
            iconColor="#075B48"
            title="Date of Birth"
            value="17/08/2005"
            iconSize={28}/>
        </View>

        <Buttons
        icon="logout"
        iconColor="#E31A17"
        iconSize={24}
        bg="#FCEBEB"
        btnHeight={50}
        btnWidth={300}
        title="Logout"
        fontColor="#E31A17"
        fontSize={16}
        borColor="#F2BCBC"
        borSize={2}
        />
        </ScrollView>
        </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        gap:15

    },
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        paddingHorizontal:15
    },
   headerbtn:{
    height:40,
    width:40,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"space-evenly",
    borderRadius:20
   },
   h1:{
    fontSize:20,
    fontWeight:"bold",
    color:"#075B48"
   },
    c1:{
      position:"relative",
      alignItems:"center",
      justifyContent:"space-evenly"
  },

  profile: {
    width: 100,
    height: 100,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: "#075B48",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    
  },

  btn1:{
    position: "absolute",
    bottom:2,
    right:100,
    backgroundColor: "#075B48",
    width: 40,
    height:40,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
   t2:{
    marginTop:6,
    textTransform:"capitalize",
    fontSize:20,
    fontWeight:"bold",
    color:"#075B48",
    alignItems:"center",
    justifyContent:"space-evenly"
  },
  c2: {
   alignItems:"center",
   justifyContent:"space-evenly"
  },


  t3:{
    color: "grey",
    fontSize:16,
    fontWeight: "bold",
  },

  perinfo:{
    minHeight:400,
    width:"100%",
    borderRadius:20,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"space-evenly",
    padding:15,
    gap:10
    
  },

  sectionTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
},

sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EAF4ED",
    alignItems: "center",
    justifyContent: "center",
},

title: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "bold",
    color: "#143B35",
},
    

    
  

  
  
})