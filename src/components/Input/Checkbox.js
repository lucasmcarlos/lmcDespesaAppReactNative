import React, {useState} from 'react';
import { StyleSheet, Text } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CheckBoxInput = (props) => {

    let ativo = false;
    if(props.value == 1){
        ativo = true;
    }else{
        ativo = false;
    }    
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const onChange = (text) =>{
        setToggleCheckBox(text);
        props.onChange(text);
    }
    return (
        <>
            <Text style={styles.label}>{props.label}</Text>
            <CheckBox disabled={false} value={ativo} onValueChange={onChange} />
        </>
    )
}

export default CheckBoxInput

const styles = StyleSheet.create({
    textInputStyle:{
        borderWidth:1,
        height:40,        
        backgroundColor:"#B0C8D0",
        padding:5
    },
    label:{
        color:"#22627A",
        fontSize:18,
        padding:5,
    }
})