import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type slotProps={
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string,
    iconSize:number,
    title:string,
    bgColor:string,
    tColor:string,
    heading:string,
   
}

export default function Slot({icons,iconColor,title,bgColor,iconSize,tColor,heading}:slotProps){
    return(
         <TouchableOpacity  style={[styles.c2_boxes,{backgroundColor:bgColor}]}>
          <MaterialCommunityIcons name={icons} size={iconSize} color={iconColor}/>
          
          <Text style={[styles.h2,{color:tColor}]}>{heading}</Text>
          <Text style={styles.h4}>{title}</Text>
        </TouchableOpacity>
    )
} 

const styles=StyleSheet.create({
    c2_boxes:{
    minHeight:160,
    width:150,
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:10,
    borderRadius:15,
  },
  
  h2:{
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:10
  },

  h4:{
     fontSize: 14,
        fontWeight: "600",
        color: "#777",
        textAlign: "center",
        marginTop: 8,
        lineHeight: 16,
  }
  
})