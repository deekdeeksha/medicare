import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Iconboxes from "./iconBox";

type verticalButtonProps={
    icon:keyof typeof MaterialCommunityIcons.glyphMap,
    heading:string,
    iconSize:number,
    iconColor:string,
    iconbgColor:string,
    iconHeight:number,
    iconWidth:number;
    bg:string;
}
export  default function VerticalButtons({icon,heading,iconSize,iconColor,bg,iconbgColor,iconHeight,iconWidth}:verticalButtonProps){
    return(
        <TouchableOpacity  style={[styles.btn,{backgroundColor:bg}]}>
            <Iconboxes  icons={icon} size={iconSize} iconColor={iconColor} height={iconHeight} width={iconWidth}  bgColor={iconbgColor} />
            
            <Text style={styles.titles}>{heading}</Text>
            
            <Iconboxes icons="information" size={20} iconColor={iconColor} height={30} width={30}  bgColor={iconbgColor} />

        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    btn:{
        minHeight:200,
        width:150,
        alignItems:'center',
        justifyContent:'space-evenly',
        borderRadius:10,
        padding:10,
        elevation:10,
    },
    titles:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        textTransform:'capitalize'
    }
})