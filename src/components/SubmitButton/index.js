import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native'


const SubmitButton = (props) => {

    const acao = (text) =>{
        console.log('dentro do acao ');
        props.onPress(text); 
    }
    
    return (
        <>
        <TouchableOpacity  style={styles.button} onPress={acao} > 
            <Text style={styles.text}>Gravar</Text>    
        </TouchableOpacity>
        </>
    )
}

export default SubmitButton;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#22627A",
        borderRadius: 10,
        padding: 10,
        marginTop:12

      },
    text:{
        color:"#ffffff",
        fontSize:18
    }

})