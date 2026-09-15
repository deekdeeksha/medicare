import { Drawer } from "expo-router/drawer";
import { Image, Text, View } from "react-native";
export  default function Drawernavigate(){
    return(
        <Drawer screenOptions={{headerShown:false}}>
          
          
          <Drawer.Screen
              name="(tabs)"options={{headerShown: true,title: "home",headerStyle:{height:150},
                headerTitle: () => (
                <View style={{ flexDirection: "row", alignItems: "center",justifyContent:'space-evenly' }}>
                    <Image
                        source={require("../../assets/images/medi_logo.png")} // 👈 your logo path
                        style={{ width:80, height:80, marginRight: 8 }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>MediCare</Text>
                </View>
            ),
  
  
        }}
        />  
        <Drawer.Screen name="profileScreen" options={{headerShown:true}}/>
         </Drawer>   
    )
}

