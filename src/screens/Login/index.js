import React, {useState} from 'react';
import { StyleSheet, Text, View,Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Input from '../../components/Input/Input';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import apiDespesas from '../../services/apiDespesas';

export default function Login(){

    const navigation = useNavigation(); 

    const [stateLogin, setStateLogin] = useState(""); 
    const [stateSenha, setStateSenha] = useState(""); 
    
    const logar = async() => {
        console.log('teste');

        apiDespesas.post("usuario/login", {
            "login":stateLogin,
            "senha":stateSenha   
        })
        .then( ({data}) => {
            console.log(data.usuario);

            AsyncStorage.multiSet([
                ['@lmcdespesas:nome', data.nome],
                ['@lmcdespesas:id', data.usuario.toString()]
            ])

            navigation.navigate('Home2');

        })
        .catch(error => {
            Alert.alert('Notificação', 'Falha na autenticação' );
        })


        

    }

    return (
        <>
            <ScrollView>
                <SafeAreaView style={styles.container}>
                    <Image style={styles.tinyLogo}  source={require('../../../assets/iconelmc.jpg')} />
                    <View style={styles.geral}>               
                        <Input label="Login" onChange={(text) => setStateLogin(text)} initialValue={""} />
                        <Input label="Senha" onChange={(text) => setStateSenha(text)} initialValue={""} />             
                        
                        <TouchableOpacity  style={styles.button}  onPress={() => logar() } > 
                            <Text style={styles.text}>Gravar</Text>    
                        </TouchableOpacity>




                        <View style={styles.boxNovaConta}>
                            <Text style={styles.novaConta}>Criar Conta</Text>
                        </View>

                    </View>
                </SafeAreaView>
            </ScrollView>
     </>
    )
}

const styles = StyleSheet.create({
 
    container:{
        width:"100%",        
        flex:1,
        justifyContent:"center",                
        alignItems:"center",
        backgroundColor:"#ffffff"        
    },
    geral:{
        width:"90%",    
        flex:1,
    },
    novaConta:{
        color:"#22627A",
        fontSize:16,
        fontWeight:'bold',                
    },
    boxNovaConta:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    tinyLogo: {
        width: 170,
        height: 170,
        margin:20,
        borderRadius:10
    },
    button: {
        alignItems: "center",
        backgroundColor: "#22627A",
        borderRadius: 10,
        padding: 10,
        marginTop:35,
        marginBottom:10

      },
    text:{
        color:"#ffffff",
        fontSize:18
    },
      
})