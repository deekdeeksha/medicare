import { StyleSheet, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
type param={
    title:string,
    valueStr:string,
    maxValue:number,
    minValue:number,
    minTrackTintCol:string,
    maxTrackTintCol:string,
    step:number,
    disabled:boolean,
    thumbTintCol:string,
    sc1:string,
    sc2:string,
    sc3:string,
    sc4:string,
    sc5:string,
    value:number,
    onChangeValue:(value: number) => void;
}
export default function Sliders({title,valueStr,maxValue,minValue,minTrackTintCol,maxTrackTintCol,step,disabled,thumbTintCol,sc1,sc2,sc3,sc4,sc5,value,onChangeValue}:param){
    return(
         <View style={styles.boxes}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.value}>{valueStr}</Text>
                    </View>
        
                    <Slider
                    style={{width:"100%",height:45}}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={step}
                    value={value}
                    minimumTrackTintColor={minTrackTintCol}
                    maximumTrackTintColor={maxTrackTintCol}
                    thumbTintColor={thumbTintCol}
                    disabled={disabled}
                    onValueChange={onChangeValue}
                    />
                     
                    <View style={styles.scale}>
                    <Text style={styles.muted}>{sc1}</Text>
                    <Text style={styles.muted}>{sc2}</Text>
                    <Text style={styles.muted}>{sc3}</Text>
                    <Text style={styles.muted}>{sc4}</Text>
                    <Text style={styles.muted}>{sc5}</Text>
                    </View> 
                </View>
    )
}

const styles=StyleSheet.create({
    boxes:{
        minHeight:120,
        width:'100%',
        borderRadius:10,
        borderWidth:0.2,
        marginBottom:30,
        padding:5
    },

    header:{
        flexDirection:"row",
        alignItems:"center",
        padding:2,
        paddingHorizontal:3,
        justifyContent:"space-between",
    },
    
    title:{
        fontSize:16,
        fontWeight:"bold",
    },

    value:{
        fontSize:14,
        color:'grey'
    },
    scale:{
        flexDirection:"row",
        justifyContent:'space-between'
    },
    muted:{
        fontSize:14,
        color:'gray'
    }
})
   