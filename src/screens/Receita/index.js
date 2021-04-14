import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert } from 'react-native';
import Input from '../../components/Input/Input';
import CheckBoxInput from '../../components/Input/Checkbox';
import Header from '../../components/Header/index';
import SubmitButton from "../../components/SubmitButton/index";
import { useFocusEffect } from '@react-navigation/core';

import apiDespesas from '../../services/apiDespesas';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';


export default function Receita({navigation, route}){

    //const navigation = useNavigation(); 
    const [stateDescricao, setStateDescricao] = useState(""); 
    const [stateValor, setStateValor] = useState(""); 
    const [stateReceitaId, setReceitaId] = useState('');

    const gravar = async    (lancamento) => {
        console.log('getReceitas');
        console.log(stateDescricao);
        console.log(stateValor);

        const usuario = await AsyncStorage.getItem('@lmcdespesas:id');
    
        if(lancamento > 0){

            apiDespesas.put(`lancamento/update/${lancamento}`, {
                "descricao":stateDescricao,
                "usuario_id":usuario,
                "valor":stateValor,
                "debito_credito":"C"
            })
            .then( ({data}) => { 
                console.log(data);
                if(data.lancamento > 0){
                    Alert.alert('Mensagem', "Receita atualizada com sucesso.");
                    setStateValor('');
                    setStateDescricao('');
                }else{
                    Alert.alert('Atenção', "Falha ao atualizar receita");
                }
            
            })
            .catch((error) => {
                console.log("error "+error);
            })      

        }else{

            apiDespesas.post("lancamento/novo", {
                "descricao":stateDescricao,
                "usuario_id":usuario,
                "valor":stateValor,
                "debito_credito":"C"
            })
            .then( ({data}) => { 
                console.log(data);
                if(data.lancamento > 0){
                    Alert.alert('Mensagem', "Receita cadastrado com sucesso.");
                    setStateValor('');
                    setStateDescricao('');
                }else{
                    Alert.alert('Atenção', "Falha ao cadastrar receita");
                }
            
            })
            .catch((error) => {
                console.log("error "+error);
            })        
        }
    } 

    const buscaReceita = (lancamento) => {
        console.log('dentro do buscar receita'); 

        apiDespesas.get(`lancamento/exibir/${lancamento}`).then(response => {
            console.log(response.data);

            setStateDescricao(response.data.descricao);
            setStateValor(response.data.valor);
            
        }).catch(error => {
            console.log(error);
        });
    }

    useFocusEffect(
        useCallback( () => {        

            console.log(route);
            
            console.log(route.params?.lancamento);

            if(route.params != undefined){
                setReceitaId(route.params.lancamento);
                buscaReceita(route.params.lancamento);
            }else{
                setStateDescricao('');
                setStateValor('');
                setReceitaId('');

                console.log('aquiiii '+stateReceitaId);
            }            
            console.log('aquiiii '+stateReceitaId);
        },[])
    );

    const listar = () =>{
        console.log('listar');

        navigation.navigate('Receitas');
    }
    

    return (
        <>
        <ScrollView>
            <SafeAreaView style={styles.container}>  
                    <View style={styles.geral}>               
                    <Header label={"Novas Receitas"} />
                        <Input label="Descrição" onChange={(text) => setStateDescricao(text)} initialValue={""} value={stateDescricao}/>
                        <Input label="Valor" onChange={(text) => setStateValor(text)} initialValue={""} value={stateValor}/>
                        <SubmitButton onPress={() => gravar(stateReceitaId)}></SubmitButton>
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

    }
})