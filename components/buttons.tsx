import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
type btnparam={
    icon:keyof typeof MaterialCommunityIcons.glyphMap,
    iconSize:number 
    iconColor:string 
    bg:string 
    title:string
    btnHeight:number 
    btnWidth:number
    fontSize:number 
    fontColor:string
    borSize:number 
    borColor:string
}
export default function Buttons({icon,iconSize,iconColor,bg,title,btnHeight,btnWidth,fontColor,fontSize,borColor,borSize}:btnparam){
    return(
        <TouchableOpacity style={[styles.button1,{backgroundColor:bg,minHeight:btnHeight,width:btnWidth,borderColor:borColor,borderWidth:borSize}]}>
            <MaterialCommunityIcons
            name={icon}
            size={iconSize}
            color={iconColor}/>
    <Text style={{color:fontColor,fontSize:fontSize,textTransform:"capitalize",fontWeight:"bold"}}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    button1:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        padding:10,
        borderRadius:10,
        gap:10
    }
})