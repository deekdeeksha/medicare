import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
type param={
    icon:keyof typeof MaterialCommunityIcons.glyphMap,
    iconSize:number,
    iconColor:string,
    iconBg:string,
    title:string,
    subtitle:string,
    titlesize:number,
    subtitlesize:number,
    subtitlecolor:string
}
export default function Bioboxes({icon,iconSize,iconColor,iconBg,title,subtitle,titlesize,subtitlesize,subtitlecolor}:param){
    return(
        <View style={styles.c2}>
            <View style={[styles.iconBox,{backgroundColor:iconBg}]}>
                <MaterialCommunityIcons
                name={icon}
                size={iconSize}
                color={iconColor}/>
            </View>
            <View style={styles.textbox}>
                <Text style={[styles.text1,{fontSize:titlesize}]}>{title}</Text>
                <Text style={[styles.text2,{fontSize:subtitlesize,color:subtitlecolor}]}>{subtitle}</Text>
            </View>
            
            <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color="#666"/>
        </View>
    )
} 

const styles=StyleSheet.create({
    c2:{ 
        minHeight:80,
        width:"100%",
        backgroundColor:"#FFFFFF",
        alignItems:"center",
        justifyContent:"space-evenly",
        padding:10,
        flexDirection:"row",
        gap:10,
        borderBottomWidth:0.2,
        borderColor:"gray"
    },

    iconBox:{
        padding:5,
        alignItems:"center",
        justifyContent:'center',
        borderRadius:15,
    },

    textbox:{
        flex:1,
        marginLeft:18
    },

    text1:{
    fontWeight:"700",
    color:"#0A0A0A",
    },

   text2:{
    marginTop:5,
    fontWeight:"500"
},
   

})