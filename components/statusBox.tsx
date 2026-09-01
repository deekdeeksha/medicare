// status box for battery and slots
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Iconboxes from "../components/iconBox";
type statusProps={
    maintext:string,
    suffix:string,
    icons:keyof typeof MaterialCommunityIcons.glyphMap;
    iconColor:string,
    bgColor:string,
    headertext:string,
    footertext:string,
    prefix:string
    tColor:string
}

export default function Time({headertext,footertext,maintext,suffix,prefix,iconColor,icons,bgColor,tColor }:statusProps)  {

    return(
        <View style={styles.outer}>
            <View style={styles.text}>
                <Text style={styles.h3}>{headertext}</Text>
                <Text style={[styles.h2, { color: tColor }]}>{prefix} {maintext} {suffix}</Text>
                <Text style={styles.h4}>{footertext}</Text>
            </View>
            <View style={[styles.icon, { borderColor: iconColor }]}>
                <Iconboxes 
                 size={28}
                 icons={icons}
                 iconColor={iconColor}
                 bgColor={bgColor}
                />
            </View>
        </View>
    )

} 


const styles=StyleSheet.create({
outer:{
    width:"45%",
    minHeight:150,
    padding:10,
    flexDirection:'row',
    borderRadius:10,
    elevation:10,
    alignItems:'center',
    justifyContent:'space-evenly',
   backgroundColor:'rgba(255,255,255,0.9)',
    
},
icon:{
    padding:5,
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:100,
    borderWidth:2,
    right:20,
    top:55,
    position:'absolute',
    borderColor:'green'
},
h3:{
    fontSize:18,
    fontWeight:'800',
    textTransform:'capitalize'
},
h2:{
    fontSize:25,
    fontWeight:'600',
    color:'green',
    textTransform:'capitalize'
},
h4:{
    fontSize:14,
    fontWeight:'600',
    color:'gray',
    textTransform:'capitalize'
},

text:{
minHeight:150,
width:"100%",
padding:5,
alignItems:'flex-start',
justifyContent:"space-evenly",
backgroundColor:'rgba(255,255,255,0.9)',

}


})