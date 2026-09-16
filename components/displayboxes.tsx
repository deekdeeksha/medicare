import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StyleSheet, Text, View } from "react-native"
type param ={
    icon:keyof typeof MaterialCommunityIcons.glyphMap,
    iconSize:number,
    iconColor:string,
    iconBg:string,
    title:string,
    value:string
}
export default function Displayboxes({icon,iconSize,iconColor,iconBg,title,value}:param){
    return(
        
        <View style={styles.c3}>
        <View style={[styles.iconBox,{backgroundColor:iconBg}]}>
         <MaterialCommunityIcons
                name={icon}
                size={iconSize}
                color={iconColor}
                
        />
        </View>
        <Text style={styles.title}>{title}</Text>
         <Text style={styles.subtitle}>{value}</Text>
        </View>
    )
}
const styles=StyleSheet.create({
c3:{
   
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 60,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 30
},

  iconBox:{
    height:40,
    width:40,
    backgroundColor:"white",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
   

  },

 title: {
    flex: 1,
    marginRight: 15,
    fontSize: 16,
    color: "#143B35",
    fontWeight: "600",
},

subtitle: {
    flex: 1,
    textAlign:"right",
    fontSize: 14,
    color: "#646B6C",
    fontWeight: "500",
},

})