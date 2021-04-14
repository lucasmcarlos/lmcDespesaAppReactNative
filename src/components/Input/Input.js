import React, {useState} from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const Input = (props) => {
    const [stateValor, setStateValor] = useState(props.initialValue);
    
    const onChange = (text) =>{
        setStateValor(text);
        props.onChange(text);
    }
    
    return (
        <>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={styles.textInputStyle} value={props.value} onChangeText={onChange} />
        </>
    )
}

export default Input

const styles = StyleSheet.create({
    textInputStyle:{        
        height:40,
        width:"100%",
        backgroundColor:"#B0C8D0",
        padding:7,
        borderRadius: 10,
        marginBottom:5,
    },
    label:{
        color:"#22627A",
        fontSize:18,
        padding:5,

    }


})