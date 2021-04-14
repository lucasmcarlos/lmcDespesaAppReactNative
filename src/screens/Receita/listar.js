import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Alert, Button } from 'react-native';
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

export default function ReceitaListar(){

    const navigation = useNavigation();
    const [listaReceitas, setListaReceita] = useState("");

    const confirmarExclusao = (id) =>{
        console.log('confirmarExclusao '+ id)
        Alert.alert("Confirmação", "Deseja excluir o usuário?", [
            {
                text:"Sim",
                onPress() {
                    apiDespesas.delete(`lancamento/destroy/${id}`).then(response => {
                        getReceitas();                        
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            {
                text:"Não",                
            }
        ])
    }

    const editar = async(id) => {
        console.log('enviando '+id);
        navigation.navigate('ReceitaNovo', {lancamento: id});
    }

    const getReceitas = async() => {
        console.log('getReceitas');

        const usuario = await AsyncStorage.getItem('@lmcdespesas:id');

        apiDespesas.get('receita/listar/usuario/8/mes/04/ano/2021').then(response => {

            setListaReceita(response.data.receitas);
        }).catch(error => {
            console.log(error);
        });
    }

    useFocusEffect(
        useCallback( () => {            
            getReceitas();
        },[])
    );

    const novo = () =>{        
        navigation.navigate('ReceitaNovo');
    }
    
    return (
        <>
        <Header label={"Receitas"} botao={true} labelButton={'Novo'} onPress={() => novo() }/>
        <SafeAreaView style={styles.lista}>
                <FlatList 
                    data={listaReceitas}
                    keyExtractor={(item) =>item.tipodespesa}
                    renderItem={({item}) =>  (                        
                        <ListItem bottomDivider keyExtractor={item.lancamento}>                        
                            <ListItem.Content>
                            <ListItem.Title>{item.descricao}</ListItem.Title>                          
                            <ListItem.Subtitle>R$ {item.valor}</ListItem.Subtitle>   
                            </ListItem.Content>
                            <View style={styles.acoes}>
                                <Icon style={styles.icons} name='pencil' size={20} color='orange'  onPress={() => editar(item.lancamento) } />
                                <Icon  name='trash' size={20} color='red'  onPress={() => confirmarExclusao(item.lancamento) } />
                            </View>
                        </ListItem>
                    )}
                />                        
        </SafeAreaView>

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
    ListItem:{
        color:'red'
    },
    acoes:{
        flexDirection:'row'        
    },
    icons:{
        marginRight:15

    }
})