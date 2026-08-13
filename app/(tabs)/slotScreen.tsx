import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SlotsScreen() {
  return(
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{flex:1,backgroundColor:'white'}} contentContainerStyle={{flexGrow:1,alignItems:'center',gap:40,paddingBottom:100}}>
      {/* c1  */}
      <View style={styles.c1}>
        <Text style={styles.h1}>Medicine Slots</Text>
        <Text style={styles.h3}>Tap on a slot to view details add / edit medicine</Text>
      </View>
      {/* closing c1 */}

      {/* c2------------------------------------------------------------------------------------------------------------------------- */}
      <View style={styles.c2}>
        
        <View  style={styles.c2_boxes}>
          <MaterialCommunityIcons name="slot-machine" size={30} color="blue"/>
          <Text style={[styles.h4]}>5</Text>
          <Text style={styles.h4}>Total slots</Text>
        </View>
            
        <View  style={styles.c2_boxes}>
          <MaterialCommunityIcons name="slot-machine" size={30} color="green"/>
          <Text style={[styles.h4]}>5</Text>
          <Text style={styles.h4}>Filled slots</Text>
        </View>

        <View  style={styles.c2_boxes}>
          <MaterialCommunityIcons name="slot-machine" size={30} color="red"/>
          <Text style={[styles.h4]}>5</Text>
          <Text style={styles.h4}>Empty slots</Text>
        </View>

      </View>

     {/* c3------------------------------------------------------------------------------------------------------------------------ */}
      <View style={styles.c3}>

        {/* slot 1 */}
        <View style={styles.s1}>
          {/* status */}
          <View  style={styles.status}>
            <View style={{padding:5,paddingHorizontal:20,borderRadius:11,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>Slot 1</Text>
            </View>
            <MaterialCommunityIcons name="information" size={34} color={"rgba(0, 102, 255, 0.7)"}/>
            
            <View style={{padding:5,paddingHorizontal:20,borderRadius:11,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>active</Text>
            </View>
          </View>  

          <View  style={styles.text}>
            <View style={styles.img}>

            </View>
            
            <View style={styles.des}>
              <Text style={styles.h4}>Paracetamol 500mg</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="timeline"/> 9:00AM</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="calendar-today"/> Today</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="repeat" /> twice a day</Text>       
            </View>
          </View>

          <View  style={styles.view}>
            <Text style={[styles.h5,{color:'black'}]}>Tap to view / edit</Text>
            <MaterialCommunityIcons name="arrow-right-thick" size={28} />
          </View>
        </View>
      
      {/* slot 2 --------------------------------------------------------------------------------------------------------------------*/}
       {/* slot 1 */}
        <View style={styles.s1}>
          {/* status */}
          <View  style={styles.status}>
            <View style={{padding:5,paddingHorizontal:20,borderRadius:11,backgroundColor:'red',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>Slot 1</Text>
            </View>
            <MaterialCommunityIcons name="information" size={34} color={"rgba(0, 102, 255, 0.7)"}/>
            
            <View style={{padding:5,paddingHorizontal:20,borderRadius:11,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
              <Text style={styles.h5}>active</Text>
            </View>
          </View>  

          <View  style={styles.text}>
            <View style={styles.img}>

            </View>
            
            <View style={styles.des}>
              <Text style={styles.h4}>Paracetamol 500mg</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="timeline"/> 9:00AM</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="calendar-today"/> Today</Text>
              <Text style={styles.h6}><MaterialCommunityIcons name="repeat" /> twice a day</Text>       
            </View>
          </View>

          <View  style={styles.view}>
            <Text style={[styles.h5,{color:'black'}]}>Tap to view / edit</Text>
            <MaterialCommunityIcons name="arrow-right-thick" size={28} />
          </View>
        </View>
      
      </View>
        {/* closing c3 */}

      </ScrollView>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  c1:{
    minHeight:250,
    width:'100%',
    padding:20,
    gap:10,
    alignItems:'center',
    justifyContent:'flex-start',
    borderBottomLeftRadius:80,
    borderBottomRightRadius:80,
    backgroundColor:'rgba(0, 102, 255, 0.9)',
  },
  h1:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    marginTop:"5%"
  },
  h3:{
    fontSize:20,
    color:'white',
    marginTop:10,
    textAlign:'center'
  },
  c2:{
    minHeight:130,
    width:'90%',
    position:'absolute',
    marginTop:"40%",
    elevation:5,
    zIndex:100,
    padding:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:15,
    backgroundColor:'rgba(255,255,255,10)',
  },
  c3:{
    minHeight:600,
    width:'100%',
    padding:10,
    marginTop:"15%",
    alignItems:'center',
    justifyContent:'space-evenly',
    borderTopRightRadius:80,
    borderTopLeftRadius:80,
    backgroundColor:'rgba(0, 102, 255, 0.7)',
  },
  c2_boxes:{
    minHeight:120,
    width:'32%',
    alignItems:'center',
    justifyContent:'space-evenly',
    padding:10,
    borderWidth:0.2,
    borderRadius:10,
  },
  h4:{
    fontSize:16,
    fontWeight:'bold'
  },
  s1:{
    minHeight:200,
    borderRadius:15,
    width:'90%',
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
    borderWidth:0.6,
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
  }


})