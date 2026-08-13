import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from "react-native-safe-area-context";
export  default function TabletLayout() {

const[category, setCategory] = useState(null);
const[compartement, setCompartement] = useState(null);  
const[frequency,setFrequcnecy]=useState(null);

const [date, setDate] = useState(new Date());//start date
const [showDatePicker, setShowDatePicker] = useState(false);//  date shower

const[enddate,setEndDate]=useState(new Date());//end date
const[showEndDatePicker,setShowEndDatePicker]=useState(false);//end date shower

const[time ,setTime]=useState(new Date());
const[showTimePicker,setShowTimePicker]=useState(false);

//category
const  categories=[
  {label:  "Tablet",value: 'tablet'},
  {label:  "Capsule",value:  'capsule'},
  
]
// start date picker
const onChangeDate = (event, selectedDate) => {
  setShowDatePicker(false);

  if (selectedDate) {
    setDate(selectedDate);
  }
};

//time picker
const  onChangeTime=(event, selectedTime) => {
  setShowTimePicker(false);
  if (selectedTime) {
    setTime(selectedTime);
  }
}

//end date picker
const onChangeEndDate=(event,selectedEndDate)=>{
  setShowEndDatePicker(false);
  if(selectedEndDate){
    setEndDate(selectedEndDate);
  }
}


const frequnecies=[
  {label:'Once a Day', value:'Once a Day'},
  {label:'Twice a Day', value:'Twice a Day'},
  {label:'Three Times a Day', value:'Three Times a Day'},
  {label:'Every 6 Hours', value:'TEvery 6 Hours'},
  {label:'Every 8 Hours', value:'TEvery 8 Hours'},
  {label:'Every 12 Hours', value:'TEvery 12 Hours'},
]


  return(
  <ImageBackground source={require('../assets/images/addTablet.png')} style={{flex:1}}>
    <SafeAreaView  style={{flex:1}}>
      <ScrollView style={{flex:1}} contentContainerStyle={{padding:10,justifyContent:'space-evenly',alignItems:'center',paddingBottom:150}}>
        
        {/* container */}
        <View style={styles.container}>

        {/* tablet name */}
        <View style={styles.c1}>

            <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="medical-services"  color={"white"} size={28} />
              </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
   
    
          <View  style={styles.text}>
            <Text style={styles.h3}>Tablet Name</Text>
            <TextInput   style={styles.input} placeholder="e.g , Paracetamol 500mg"/>
          </View>
        </View>
        {/* closing c1 */}

          {/* category */}
         <View style={styles.c1}>

          <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="category"  color={"white"} size={28} />
              </View>  
              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>

          <View  style={styles.text}>
            <Text style={styles.h3}>Category</Text>
            <Dropdown  data={categories} labelField="label" valueField="value"  placeholder="select medicine  category"  style={styles.dropdowns} value={category} selectedTextStyle={styles.droptext} onChange={item =>{setCategory(item.value)}} />
          </View>
        </View>
        {/* closing c1 category */}




      {/* Frequency */}
         <View style={styles.c1}>

          <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="repeat"  color={"white"} size={28} />
              </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
   
          <View  style={styles.text}>
            <Text style={styles.h3}>Frequency</Text>
            <Dropdown  data={frequnecies} labelField="label" valueField="value"  placeholder="select Frequency"  style={styles.dropdowns} value={frequency} selectedTextStyle={styles.droptext} onChange={item =>{setFrequcnecy(item.value)}} />
          </View>
        </View>
        {/* closing c1  Frequency */}

          {/* Date picker  */}
         <View style={styles.c1}>

        <View style={styles.icon}>
          <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="date-range"  color={"white"} size={28} />
              </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
   
          <View  style={styles.text}>
            <Text style={styles.h3}>Start Date</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
              <Text>{date.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showDatePicker && (
          <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}/>
          )}
        
        {/* closing Date picker */}

        {/* Time picker  */}
         <View style={styles.c1}>
         <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="timeline"  color={"white"} size={28} />
          </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
    
          <View  style={styles.text}>
            <Text style={styles.h3}>Time</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
              <Text>{time.toLocaleTimeString([],{
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
              })}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showTimePicker && (
          <DateTimePicker
          value={time}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={onChangeTime}/>
          )}
        
        {/* closing Time picker */}

          {/* Date picker  */}
         <View style={styles.c1}>

          <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="date-range"  color={"white"} size={28} />
          </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
       
          
          <View  style={styles.text}>
            <Text style={styles.h3}>End Date</Text>
            <TouchableOpacity style={styles.input} onPress={() => setShowEndDatePicker(true)}>
              <Text>{enddate.toDateString()}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showEndDatePicker && (
          <DateTimePicker
          value={enddate}
          mode="date"
          display="default"
          onChange={onChangeEndDate}/>
          )}
        
        {/* closing end Date picker */}

        {/* notes */}
        <View style={styles.c1}>
            <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="notes"  color={"white"} size={28} />
          </View> 

              <View  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </View>
          </View>   
    
        
          <View  style={styles.text}>
            <Text style={styles.h3}>Notes (optional)</Text>
            <TextInput   style={styles.input} placeholder="Add any additional notes"/>
          </View>
        </View>
        {/* closing notes */}


        </View>
        {/* closing container */}

        <TouchableOpacity  style={styles.btn}>
          <Text style={[styles.h3,{color:'white',fontSize:22}]}><MaterialIcons  name="verified" size={28}/> Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  </ImageBackground>    
  )

}
const styles=StyleSheet.create({
  
  container:{
    minHeight:1000,
    width:'100%',
    padding:10,
    paddingVertical:30,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'space-evenly',
    marginTop:'62%',
    backgroundColor:'rgba(255,255,255,0.6)'
  },
  c1:{
    minHeight:80,
    width:'98%',
    alignItems:'center',
    justifyContent:'space-evenly',
    borderRadius:11,
    gap:10,
    padding:10,
    backgroundColor:'rgba(255,255,255,0.3)',
    borderWidth:0.1,
    flexDirection:'row',
  },
  icon:{
    padding:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    minHeight:60,
    width:'98%',
    borderRadius:10,
    borderWidth:0.5,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingHorizontal:15
  },
  text:{
    minHeight:100,
    width:'85%',
    padding:5,
    justifyContent:'space-evenly',
    alignItems:'flex-start'
  },
  h3:{
    fontWeight:'bold',
    fontSize:15
  },
  dropdowns:{
    minHeight:60,
    width:'98%',
    borderRadius:10,
    borderWidth:0.5,
    paddingHorizontal:15
  },
  droptext:{
    fontSize:15,
    fontWeight:'bold'
  },
  btn:{
    minHeight:80,
    width:'80%',
    marginTop:'10%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'rgba(26, 123, 202, 0.7)'
  }

})