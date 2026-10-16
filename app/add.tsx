import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from "react-native-safe-area-context";
import { saveMedicine } from "../config/medicineStorage";
export  default function TabletLayout() {

const [medicineName, setMedicineName] = useState("");
const [notes, setNotes] = useState("");
const {slot,color}=useLocalSearchParams();
//need to add text to speech  for  all the info


const[category, setCategory] = useState(null);
const[compartement, setCompartement] = useState("");
const[C_color,setC_color]=useState("");  
const[frequency,setFrequcnecy]=useState(null);

const [date, setDate] = useState(new Date());//start date
const [showDatePicker, setShowDatePicker] = useState(false);//  date shower

const[enddate,setEndDate]=useState(new Date());//end date
const[showEndDatePicker,setShowEndDatePicker]=useState(false);//end date shower

const[time ,setTime]=useState(new Date());
const[showTimePicker,setShowTimePicker]=useState(false);

const handleSave = async () => {
  if (
    !medicineName.trim() ||
    !category ||
    !frequency ||
    !compartement
  ) {
    Alert.alert("Missing details", "Please enter the medicine name, category, frequency, and slot.");
    return;
  }

  if (
    date > enddate ||
    date.toDateString() === "" 
  ) {
    Alert.alert("Invalid dates", "Please check your start and end dates.");
    return;
  }

  try {
    const medicine = {
      id: `${compartement}_${Date.now()}`,
      name: medicineName.trim(),
      category: category,
      slot: String(compartement),
      slotColor: String(C_color || "#195FDB"),
      frequency: frequency,
      startDate: date.toISOString(),
      endDate: enddate.toISOString(),
      time: `${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`,
      notes: notes.trim(),
    };

    await saveMedicine(medicine);

    Alert.alert(
      "Success",
      `${medicineName} schedule saved successfully.`
    );
  } catch (error) {
    console.error("Error saving medicine:", error);
    Alert.alert("Error", "Could not save the medicine schedule.");
  }
};//save function

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

useEffect(()=>{
 const loadData=async()=>{
  try{
    if(slot){
      setCompartement(slot);
      setC_color(color);
    }
  }
  catch(error){
    console.log("Error loading data:",error);
  }
}
  loadData();
},[])

const frequnecies=[
  {label:'Once a Day', value:'Once a Day'},
  {label:'Twice a Day', value:'Twice a Day'},
  {label:'Three Times a Day', value:'Three Times a Day'},
  {label:'Every 6 Hours', value:'TEvery 6 Hours'},
  {label:'Every 8 Hours', value:'TEvery 8 Hours'},
  {label:'Every 12 Hours', value:'TEvery 12 Hours'},
]



  const showInfo=(field:string)=>{
        if(field==="name"){
          Alert.alert("Medicine Name", "Enter the name of the medicine you want to add in the dispenser")
        }
        else if(field==="category"){
          Alert.alert("Category", "Select the category of the medicine whether it is a tablet or capsule you want to add in the dispenser")
        }
        else if(field==="frequency"){
          Alert.alert("Frequency", "Select the frequency of the medicine you want to add in the dispenser")
        }
        else if(field==="startdate"){
          Alert.alert("Repetation", "Select the start date from when you want to repeat the medicine")
        }
        else if(field==="enddate"){
          Alert.alert("Repetation End Date","Select the end date of the medicine till which date u need it repeated")
        }
        else if(field==="time"){
          Alert.alert("Time", "Select the time when you want to take the medicine")
        }
        else if(field==="notes"){
          Alert.alert("Notes", "Add any additional notes about the medicine")
        }
        else if(field==="compartement"){
          Alert.alert("Slot Number", "This is the slot number of the dispenser where you want to add the medicine")
        }

  }


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

              <TouchableOpacity  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}} onPress={()=>{showInfo("name")}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
          </View>   
   
    
          <View  style={styles.text}>
            <Text style={styles.h3}>Tablet Name</Text>
            <TextInput   style={styles.input} placeholder="e.g , Paracetamol 500mg"
            value={medicineName}
            onChangeText={setMedicineName}/>
          </View>
        </View>
        {/* closing c1 */}

          {/* category */}
         <View style={styles.c1}>

          <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="category"  color={"white"} size={28} />
              </View>  
              <TouchableOpacity  onPress={()=>{showInfo("category")}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={()=>{showInfo('frequency')}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={()=>{showInfo('start-date')}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={()=>{showInfo('time')}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={()=>{showInfo('enddate')}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
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

              <TouchableOpacity onPress={()=>{showInfo('notes')}} style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
          </View>   
    
        
          <View  style={styles.text}>
            <Text style={styles.h3}>Notes (optional)</Text>
            <TextInput   style={styles.input} placeholder="Add any additional notes"
            value={notes}
            onChangeText={setNotes}/>
          </View>
        </View>
        {/* closing notes */}

          <View style={styles.c1}>

            <View style={styles.icon}>
              <View style={{backgroundColor:'rgba(52, 132, 223, 0.74)',flexDirection:'row',alignItems:'center',justifyContent:'center',padding:5,borderRadius:10}}>
                  <MaterialIcons name="add-box"  color={"white"} size={28} />
              </View> 

              <TouchableOpacity  style={{backgroundColor:'green',borderRadius:10,padding:5,marginTop:5,borderWidth:0.2,alignItems:'center',justifyContent:'center'}} onPress={()=>{showInfo("compartement")}}>
                  <MaterialIcons name="info" size={28} color={"white"}/>
              </TouchableOpacity>
          </View>   
   
    
          <View  style={styles.text}>
            <Text style={styles.h3}>Slot Number</Text>
            <TextInput readOnly value={compartement}  style={[styles.input,{backgroundColor:C_color}]} placeholder="e.g , 1"/>
          </View>
        </View>


        </View>
        {/* closing container */}

        <TouchableOpacity  style={styles.btn} onPress={handleSave}>
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