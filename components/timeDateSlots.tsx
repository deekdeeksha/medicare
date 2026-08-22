import { StyleSheet, Text, View } from "react-native";
import Iconboxes from "./iconBox";

type timeDateProps={
    date:string,
    time:string,
}

export default function Time({ date, time }:timeDateProps)  {

    return(
            <View style={styles.date_time}>
                
                <View style={styles.date}>
                  <Iconboxes
                   icons="calendar"
                   size={28}
                   iconColor="rgb(10, 123, 216)"
                   bgColor="rgba(174, 241, 241, 0.2)"
                  />
                  <View style={styles.dateText}>
                    <Text  style={styles.h3}>Today's Date</Text>
                    <Text  style={styles.h2}>{date}</Text>
                  </View>
                </View>
        
                <View style={styles.time}>
                  <Iconboxes
                   icons="timelapse"
                   size={28}
                   iconColor="rgb(10, 123, 216)"
                       bgColor="rgba(174, 241, 241, 0.2)"
                  />
                  <View style={styles.dateText}>
                    <Text  style={styles.h3}>Current Time</Text>
                    <Text  style={styles.h2}>{time}</Text>
                  </View>
                </View>
        
                
        </View>

    )
}

const styles=StyleSheet.create({
    date_time:{
    minHeight:130,
    width:"100%",
    padding:10,
    gap:10,
    flexDirection:'row',
    borderRadius:10
  },
  date:{
    minHeight:100,
    width:"48%",
    padding:5,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderWidth:0.2,
    borderRadius:10,
    elevation:10,
    borderColor:'gray',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
  },
  time:{
    minHeight:100,
    width:"48%",
    padding:5,
    backgroundColor:'rgba(255,255,255,0.9)',
    elevation:10,
    borderWidth:0.2,
    borderRadius:10,
    borderColor:'gray',
    alignItems:'center',
    justifyContent:'space-evenly',
    flexDirection:'row',
  },
  dateText:{
    minHeight:100,
    width:"60%",
    padding:5,
    alignItems:'flex-start',
    gap:10,
    justifyContent:'center',
  },
  h3:{
    fontSize:14,
    fontWeight:800,
    color:'gray'
  },
  h2:{
    fontSize:16,
    fontWeight:'bold',
  }
}
)