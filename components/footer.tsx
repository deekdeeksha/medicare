import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Iconboxes from "./iconBox";

type footerboxprops={
       icons:keyof typeof MaterialCommunityIcons.glyphMap;
       iconColor:string,
       bgColor:string,
       width:number,
       height:number,
       size:number,
       title:string,
       subtitle:string,
       color:string
}
export default function Footer({
iconColor,icons,bgColor,width,height,size,title,subtitle,color}:footerboxprops){
    return(
        <View style={[styles.main,{backgroundColor:bgColor}]}>
            <Iconboxes  icons={icons} size={size} iconColor={iconColor} height={height} width={width}  bgColor={bgColor} />
           <View style={styles.texts}>
            <Text style={[styles.title,{color:color}]}>{title}  </Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            </View>   
        
        </View>
    )
}
const styles=StyleSheet.create({
main:{
    borderRadius:10,
    minHeight:100,
    width:"100%",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:5,
    paddingVertical:20,
    elevation:10,
},
title:{
    fontSize:18,
    fontWeight:'bold',
    textTransform:'capitalize'
},
subtitle:{
    fontSize:14,
    color:'gray',
    fontWeight:'300'
},
texts:{
    alignItems:'flex-start',
    justifyContent:'center',
    padding:2,
    gap:10
}
})