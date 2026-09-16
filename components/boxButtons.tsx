import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type slotProps={
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string,
    value:number,
    iconSize:number,
    title:string,
    bgColor:string,
    tColor:string,
    heading:string,
   
}

export default function Slot({icons,iconColor,value,title,bgColor,iconSize,tColor,heading}:slotProps){
    return(
         <TouchableOpacity  style={[styles.c2_boxes,{backgroundColor:bgColor}]}>
          <MaterialCommunityIcons name={icons} size={iconSize} color={iconColor}/>
          <Text style={[styles.h3,{color:tColor}]}>{value}</Text>
          <Text style={[styles.h2,{color:tColor}]}>{heading}</Text>
          <Text style={styles.h4}>{title}</Text>
        </TouchableOpacity>
    )
} 

const styles=StyleSheet.create({
    c2_boxes:{
    minHeight:120,
    width:'32%',
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:10,
    borderRadius:10,
  },
  h4:{
    fontSize:16,
    fontWeight:'600'
  },
  h3:{
    fontSize:20,
    fontWeight:'bold'
  },
  h2:{
    fontSize:20,
    fontWeight:"bold"
  }
  
})