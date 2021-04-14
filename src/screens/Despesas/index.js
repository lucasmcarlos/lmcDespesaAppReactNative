import React, {useState, useCallback} from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/index';
import SubmitButton from "../../components/SubmitButton/index";
import AsyncStorage from '@react-native-community/async-storage';
//import { useTipoDespesa } from "../../hooks/useTipoDespesa";
import { useFocusEffect } from '@react-navigation/core';
import apiDespesas from '../../services/apiDespesas';
import {Picker} from '@react-native-community/picker';
import { ScrollView } from 'react-native-gesture-handler';

export default function Despesas(){

    //const {dadosTipos} = useTipoDespesa();
    const [stateDescricao, setStateDescricao] = useState(""); 
    const [stateValor, setStateValor] = useState(""); 
    const [stateDespesaId, setStateDespesaId] = useState(""); 

    const [tipoDespesa, setTipoDespesa] = useState('');
    const [stateTipos, setStateTipos] = useState([]);

    const getTiposDespesas = () => { 
        console.log('buscar despesas'); 

        apiDespesas.get('/tipodespesa/listar').then(response => {
            console.log(response.data);
            setStateTipos(response.data);
        }).catch(error => {
            console.log(error);
        });

    }

    const gravar = async () => {
        const usuario = await AsyncStorage.getItem('@lmcdespesas:id');

        console.log({
            "descricao":stateDescricao,
            "usuario_id":usuario,
            "tipo_lancamento":tipoDespesa,
            "receita_id":null,
            "valor":stateValor,
            "debito_credito":"D"
        });

        apiDespesas.post(`/lancamento/novo`, {
            "descricao":stateDescricao,
            "usuario_id":usuario,
            "tipo_lancamento":tipoDespesa,
            "receita_id":null,
            "valor":stateValor,
            "debito_credito":"D"
        })
        .then( ({data}) => { 
            console.log(data);
            if(data.lancamento > 0){
                Alert.alert('Mensagem', "Despesa cadastrada com sucesso.");
                setStateValor('');
                setStateDescricao('');
            }else{
                Alert.alert('Atenção', "Falha ao atualizar despesa");
            }
        
        })
        .catch((error) => {
            console.log("error "+error);
        })
    }

    useFocusEffect(
        useCallback( () => {  
            console.log('aqui despesas');
            getTiposDespesas(); 

        },[])
    );
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
            <View style={styles.geral}>            
            <Header label={"Novas Despesas"} />   
                <Input label="Descrição" onChange={(text) => setStateDescricao(text)} initialValue={""} value={stateDescricao} />
                <Input label="Valor" onChange={(text) => setStateValor(text)} initialValue={""}  value={stateValor}/>
                <Text style={styles.label}>Tipo Despesas</Text>
                <Picker style={styles.card} selectedValue={tipoDespesa} onValueChange={(value) => setTipoDespesa(value)} >
                    {
                        stateTipos.map(item => {
                            if (item.descricao !== undefined) {
                                //console.log(item.descricao)
                                return (<Picker.Item label={item.descricao} value={item.tipodespesa} key={item.tipodespesa}/>) 
                            }                                
                        })
                    }                
                </Picker>
                <SubmitButton onPress={() => gravar()}></SubmitButton>
            </View>
        </SafeAreaView>
     </ScrollView>
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
    label:{
        color:"#22627A",
        fontSize:18,
        padding:5,
    },
    card:{
        height:40,
        width: "100%",
        backgroundColor:"#B0C8D0",        
        marginBottom: 15,
        borderRadius: 10,
        
      },
})