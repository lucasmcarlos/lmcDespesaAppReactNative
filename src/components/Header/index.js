import React, { useState }from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const Header  = (props) =>{

    const [loading, setLoading] = useState(false);

    const title = (props.labelButton) ? props.labelButton : "botao";

    const onAdd = (text) =>{
        console.log('dentro do onAdd ');
        props.onPress(text); 
    }

    return (
        console.log(typeof props.botao),
        <View style={styles.header}>
            <Text style={styles.headerText}>{props.label}</Text>         
            {typeof props.botao !== 'undefined' ? <Button title={title} onPress={onAdd} > </Button> : null}
        </View>
    );
}

export default  Header;
const styles = StyleSheet.create({
    header:{
        backgroundColor:"#ffffff",
        color:"#000000",        
        width:"100%",
        padding:10,
        alignItems:"center",
        marginBottom:5,        
        borderColor:"#000000",        
        borderBottomWidth:1,
        flexDirection:'row'
    },
    headerText:{
        fontSize:20,
        color:"#22627A",
        width:"80%",
        
    }
});