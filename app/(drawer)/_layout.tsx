import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
export  default function Drawernavigate(){
    const size=28;
    return(
        <Drawer>
            <Drawer.Screen name="(tabs)" options={{headerShown:true ,title:'Home',drawerIcon:({size})=>(<MaterialCommunityIcons name="home" color={"#3695FF"} size={size} />) }}/> 

            <Drawer.Screen name="profilescreen" options={{headerShown:true,title:'Profile',drawerIcon:({size})=>(<MaterialCommunityIcons name="account" color={"#1C9129"} size={size} />)}} />
            
            <Drawer.Screen name="biometricset" options={{headerShown:true,title:'Security & Privacy',drawerIcon:({size})=>(<MaterialCommunityIcons name="lock" color={"#FFD21F"} size={size} />)}} />

            <Drawer.Screen name="Aboutscreen" options={{headerShown:true,title:'About Medicare',drawerIcon:({size})=>(<MaterialCommunityIcons name="information" color={"#FF9224"} size={size} />)}} />

            <Drawer.Screen name="contactscreen" options={{headerShown:true,title:'Contact Us',drawerIcon:({size})=>(<MaterialCommunityIcons name="phone" color={"#195FDB"} size={size} />)}} />

            <Drawer.Screen name="langVoiceScreen" options={{headerShown:true,title:'Language & Voice',drawerIcon:({size})=>(<MaterialCommunityIcons name="translate" color={"#6e7a92"} size={size} />)}} />
            
            <Drawer.Screen name="displaySettings" options={{headerShown:true,title:'Display Settings',drawerIcon:({size})=>(<MaterialCommunityIcons name="tab" color={"#6e7a92"} size={size} />)}} />
            
         
         
         
         </Drawer>   
    )
}
