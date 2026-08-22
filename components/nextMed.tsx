//Next medicine status box 
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import Iconboxes from "../components/iconBox";

const blue = {
  primary: "#195FDB",
  bright: "#3695FF",
  dark: "#123A73",
  light: "#EAF3FF",
};

type statusProps={
    maintext:string,
    Uheading:string,
    Uicon:keyof typeof MaterialCommunityIcons.glyphMap,
    Micon:keyof typeof MaterialCommunityIcons.glyphMap,
    iconColor:string,
    bgColor:string,
    headertext:string,
    footertext:string,
    UiconColor:string,
    MiconColor:string,
}
export default function NextMed({headertext,footertext,maintext,iconColor,Uicon,Micon,bgColor,Uheading,UiconColor,MiconColor }:statusProps)  {

    return(
        <View style={styles.outer}>
            <View style={styles.upperBox}>
                <Iconboxes icons={Uicon} bgColor={bgColor} width={40} height={40} iconColor={UiconColor} size={25}/>
                <Text style={styles.headings}>{Uheading}</Text>
                <Text style={[styles.h4,{color:"green"}]}>See All</Text>
            </View>

            <View style={styles.LowerBox}>
               
                <View style={styles.icon}>
                <Iconboxes icons={Micon} bgColor={"white"} width={70} height={70} iconColor={MiconColor} size={40}/>
                </View>

                <View style={styles.texts}>
                    <Text style={[styles.h3,{color:'black',fontWeight:'bold'}]}>10:30 AM  <Text style={{fontSize:14,backgroundColor:'rgba(128, 195, 221, 0.3)',borderRadius:5,color:'blue',padding:5}}>in 48 mins</Text>
                    </Text>
                    <Text style={styles.headings}>Paracetamol 500mg</Text>
                  <Text style={styles.h4}>1 Tablet  After Food </Text>  
                </View>


            </View>
            

        </View>
    )

} 


const styles=StyleSheet.create({
outer:{
    width:"95%",
    minHeight:150,
    padding:10,
    borderRadius:10,
    elevation:10,
    gap:20,
    alignItems:'center',
    justifyContent:'space-evenly',
   backgroundColor:'rgba(255,255,255,0.9)',
    
},
upperBox:{
    minHeight:50,
    width:"100%",
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    padding:5,
    borderRadius:10,
    borderBottomWidth:0.2,
    borderColor:'gray',
},
LowerBox:{
    minHeight:110,
    width:"100%",
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    backgroundColor:'transparent',
    padding:5,
},
icon:{
    minHeight:70,
    width:"20%",
    borderWidth:0.5,
    borderColor:"#1C9129",
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-evenly',
},
texts:{
 minHeight:70,
 width:'70%',
 gap:10,
 alignItems:'flex-start',
 justifyContent:'space-evenly',
 padding:10,
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
headings:{
    fontSize:14,
    fontWeight:'800',
    textTransform:'capitalize'
},
text:{
minHeight:150,
width:"100%",
padding:5,
alignItems:'flex-start',
justifyContent:"space-evenly",
}

})