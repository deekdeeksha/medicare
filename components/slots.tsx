import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type slotprops={
    slotValue:number,
    slotStatus:string,
    slotInfo:string,
    iconColor:string,
    slotColor:string,
    tabletName:string,
    time:string,
    repeat:string,
    day:string
}
export default function Slots({day,slotColor,slotValue,slotStatus,slotInfo,iconColor,repeat,time,tabletName}:slotprops){
    return(

        <View style={styles.s1}>

          <View  style={styles.status}>
            <View style={{padding:5,paddingHorizontal:20,borderRadius:10,backgroundColor:slotColor,alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>Slot {slotValue}</Text>
            </View>
            <MaterialCommunityIcons name="information" size={34} color={"rgba(0, 102, 255, 0.7)"}/>
            
            <View style={{padding:5,paddingHorizontal:20,borderRadius:11,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>{slotStatus}</Text>
            </View>
          </View>  

          <View  style={styles.text}>
            <View style={[styles.img,{borderColor:iconColor}]}>
               <MaterialCommunityIcons name="pill-multiple"  size={40} color={iconColor}/> 
            </View>
            
            <View style={styles.des}>
              <Text style={styles.h4}>{tabletName}</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="timeline"/>{time}</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="calendar-today"/>{day}</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="repeat" />{repeat}</Text>       
            </View>
          </View>

          <TouchableOpacity  style={[styles.view,{backgroundColor:iconColor}]}>
            <Text style={[styles.h5,{color:'black'}]}>Tap to view / edit</Text>
            <MaterialCommunityIcons name="arrow-right-thick" size={28} />
          </TouchableOpacity>

        </View>
      
    )
}

const styles=StyleSheet.create({

    s1:{
    minHeight:200,
    borderRadius:15,
    width:'100%',
    elevation:10,
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:5,
    backgroundColor:'white'
  },
  status:{
    minHeight:50,
    paddingVertical:5,
    paddingHorizontal:10,
    width:'100%',
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'rgba(108, 196, 236, 0.5)',
  },
  text:{
    minHeight:150,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
    paddingVertical:5,
  },
  view:{
    minHeight:40,
    width:'100%',
    backgroundColor:'rgba(108, 196, 236, 0.5)',
    justifyContent:'space-between',
    paddingHorizontal:10,
    alignItems:'center',
    flexDirection:'row',
    borderBottomRightRadius:10,
    borderBottomLeftRadius:10
  },

  h5:{
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
  img:{
    minHeight:100,
    width:"28%",
    padding:1,
    borderWidth:0.9,
    borderColor:'rgba(0, 102, 255, 0.7)',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    borderRadius:100,
  },
  des:{
    padding:10,
    paddingHorizontal:15,
    backgroundColor:'white',
    alignItems:'center',
    gap:5,
    justifyContent:'space-evenly'
  },
  h6:{
    fontSize:16
  },
  h4:{
    fontSize:18,
    fontWeight:'bold'
  }

})