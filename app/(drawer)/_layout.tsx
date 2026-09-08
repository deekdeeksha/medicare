import { Drawer } from "expo-router/drawer";
export  default function Drawernavigate(){
    return(
        <Drawer>
            <Drawer.Screen name="(tabs)" options={{headerShown:true ,title:'Home'}}/> 
            <Drawer.Screen name="aboutScreen" options={{headerShown:true,title:'About'}}/>
            <Drawer.Screen name="biometricset" options={{headerShown:true,title:'Security'}}/>
            <Drawer.Screen name="profilescreen" options={{headerShown:true,title:'Profile'}}/>
         </Drawer>   
    )
}