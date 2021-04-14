import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/core';

import apiDespesas from '../../services/apiDespesas';
import Navigation from '../../Navigation';


export default function HomeScreen({navigation}){

    const [nomelog, setNomeLogado] = useState('');    
    const [stateDespesa, setStateDespesa] = useState('');
    const [stateSaldo, setStateSaldo] = useState('');

   const pegarNome = async () => {
        const nomeLogado = await AsyncStorage.getItem('@lmcdespesas:nome'); 
        setNomeLogado(nomeLogado);
    }   


    const getDespesas = async() => {
        console.log('getReceitas');

        const usuario = await AsyncStorage.getItem('@lmcdespesas:id');

        apiDespesas.get(`lancamento/detalhes/usuario/8/mes/04/ano/2021/tipo/D`).then(response => {
            console.log(response.data);
            setStateDespesa(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    const getSaldo = async() => {
        console.log('getSaldo');

        const usuario = await AsyncStorage.getItem('@lmcdespesas:id');

        apiDespesas.get(`lancamento/saldo/usuario/8/mes/04/ano/2021`).then(response => {
            console.log(response.data.saldo);
            setStateSaldo(response.data.saldo.toFixed(2));
        }).catch(error => {
            console.log(error);
        });
    }

    useFocusEffect(
        useCallback( () => {
            pegarNome();
            getDespesas();
            getSaldo();
            console.log('aquiiii');
        },[])
    );

    return (        

        <View style={styles.container}>

            <Text>Usuário logado: {nomelog}</Text>
            <View style={styles.saldoArea}>
                <Text style={styles.TextSaldo}>Saldo</Text>
                <Text style={styles.TextValor}>R$ {stateSaldo}</Text>
            </View>
            <View>
                <Text style={styles.textmes} >Abril/2021</Text>
            </View>

            <FlatList 
                data={stateDespesa}
                keyExtractor={(item) =>item.tipodespesa}
                renderItem={({item}) =>  (  
                    <> 
                        <View style={styles.card}>
                            <Text style={styles.tipo}>{item.tipo}</Text>                
                            <View style={styles.info}>
                                <Text style={styles.descricao}>{item.descricao}</Text>
                                <Text style={styles.valor}>R$ {item.valor} </Text>
                            </View>
                        </View>
                    </>
                    
                )}
            />
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        
        alignItems:'center',
    },
    saldoArea:{
        width:'95%',
        backgroundColor:'#22627A',        
        height:100,
        marginTop:10,
        padding:10, 
        borderRadius:10       
    },
    TextSaldo:{
        color:"#ffffff",
        fontSize:20,
        paddingLeft:15
    },
    TextValor:{
        color:"#ffffff",
        fontSize:26,        
        textAlign:'center',
    },
    card:{
        width:'95%',
        borderWidth:1,
        borderColor:"#000000",
        marginTop:10,
        marginLeft:7,
        borderRadius:10,
        padding:7
    },
    tipo:{
        fontWeight:'bold',
        marginBottom:5
    },
    descricao:{
        textAlign:'left',        
        width:'70%',
    },
    valor:{
        textAlign:'right',        
        width:'30%',
    },
    info:{
        flexDirection:'row'
    },
    textmes:{
        fontSize:18,
        fontWeight:'bold',
        marginTop:15,
        textAlign:'center',
    }


});