import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

type iconboxprops={
       icons:keyof typeof MaterialCommunityIcons.glyphMap;
       iconColor:string,
       bgColor:string,
       width:number,
       height:number,
       size:number
}
export default function Iconboxes({
iconColor,icons,bgColor,width,height,size}:iconboxprops){
    return(
        <View style={[styles.bg,{backgroundColor:bgColor,width:width,height:height}]}>
           <MaterialCommunityIcons name={icons} size={size} color={iconColor}/>  
        </View>
    )
}
const styles=StyleSheet.create({
bg:{
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    padding:5
}
})