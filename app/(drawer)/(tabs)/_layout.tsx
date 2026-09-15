import { Ionicons } from "@expo/vector-icons";
import { Tabs } from 'expo-router';
import { View } from "react-native";

export default function TabLayout() {

  return (
    <Tabs 
    screenOptions={{
      headerShown:false,
      tabBarShowLabel:true,
      tabBarLabelStyle:{fontSize:16,color:'white'},
      tabBarStyle:{
        height:100,
        width:"90%",
        marginLeft:'5%',
        marginBottom:'5%',
        padding:10,
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'row',
        position:'absolute',
        borderRadius:15,
         backgroundColor:"rgba(19, 166, 185, 0.9)",
      },

      tabBarLabelPosition: "below-icon",

      tabBarActiveTintColor: "#ffffff",
      tabBarInactiveTintColor: "#b7c7ff",
         

    }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
           tabBarIcon: ({ focused }) => (
          <View
            style={{height:80,width: 100,alignItems: 'center',justifyContent: 'center', backgroundColor: focused ? "#ffffff" : "transparent",padding: 10,borderRadius: 15,}}>

        <Ionicons
          name="home"
          size={28}
          color={focused ? "#13A6B9" : "#ffffff"}
        />
      </View>
    ),        }}
      />

      <Tabs.Screen
        name="slotScreen"
        options={{
          title: 'Add Tablet',
           tabBarIcon: ({ focused }) => (
          <View
            style={{height:80,width: 100,alignItems: 'center',justifyContent: 'center', backgroundColor: focused ? "#ffffff" : "transparent",padding: 10,borderRadius: 15,}}>

        <Ionicons
          name="add-circle"
          size={60}
          color={focused ? "#13A6B9" : "#ffffff"}
        />
      </View>
    ),        }}
      />

        <Tabs.Screen
        name="activeTablets"
        options={{
          title: 'Active Tablets',
           tabBarIcon: ({ focused }) => (
          <View
            style={{height:80,width: 100,alignItems: 'center',justifyContent: 'center', backgroundColor: focused ? "#ffffff" : "transparent",padding: 10,borderRadius: 15,}}>

        <Ionicons
          name="list"
          size={28}
          color={focused ? "#13A6B9" : "#ffffff"}
        />
      </View>
    ),        }}
      />


    </Tabs>
  );
}
