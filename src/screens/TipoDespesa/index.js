import React, {useState, useEffect} from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView, Alert,  } from 'react-native'
import Input from '../../components/Input/Input';
import CheckBoxInput from '../../components/Input/Checkbox';

import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header/index';
import SubmitButton from "../../components/SubmitButton/index";

import Icon from 'react-native-vector-icons/FontAwesome';

import { ListItem } from 'react-native-elements'

//hooks
import { useTipoDespesa } from "../../hooks/useTipoDespesa";

import apiDespesas from '../../services/apiDespesas';

export default function TipoDespesa(){

    const [stateDescricao, setStateDescricao] = useState("");   
    const [stateAtivo, setStateAtivo] = useState(false);
    const [stateTipoDespesaId, setTipoDespesaId] = useState(null);

    const {dadosTipos} = useTipoDespesa();

    //const usuario = 2; 

    const gravar = async () => {
        console.log('dentro do gravar'); 
        console.log(stateDescricao);
        console.log(stateAtivo);  
        console.log(stateTipoDespesaId);

        if(stateTipoDespesaId != null){
            console.log('alterar')

            apiDespesas.put(`tipodespesa/update/${stateTipoDespesaId}`, {
                "descricao":stateDescricao,
                "ativo":stateAtivo            
            })
            .then( ({data}) => {
                        console.log(data);            
                    }            
            ).catch((error) => {
                console.log("error "+error);
            })
        }else{
            console.log('gravar')

            const usuario = await AsyncStorage.getItem('@lmcdespesas:id');

            apiDespesas.post("tipodespesa/novo", {
                "descricao":stateDescricao,
                "usuario_id":usuario,
                "ativo":stateAtivo            
            })
            .then( ({data}) => console.log(data) )
            .catch((error) => {
                console.log("error "+error);
            })
        }
    }

    const editar = (tipoId) => {
        console.log('editar ' + tipoId);
        apiDespesas.get(`tipodespesa/exibir/${tipoId}`)
        .then( ({data}) => { 
            console.log(data);
            setStateDescricao(data.descricao);
            setStateAtivo(data.ativo);
            setTipoDespesaId(data.tipodespesa);               
            }                
        );             
    }

    const confirmarExclusao = () =>{
        console.log('confirmarExclusao')
        Alert.alert("Confirmação", "Deseja excluir o usuário?", [
            {
                text:"Sim",
                onPress() {
                    console.log('excluir')
                }
            },
            {
                text:"Não",                
            }
        ])
    }

    return (        
        <>
            <ScrollView style={styles.scroll}>
            <Header label={"Tipo Despesas"} />
                <SafeAreaView style={styles.container}> 

                    <View style={styles.geral}>               
                        <Input label="Descrição" onChange={(text) => setStateDescricao(text)} initialValue={""} value={stateDescricao} />
                        <CheckBoxInput label={'Ativos'}  value={stateAtivo} onChange={(text) => setStateAtivo(text)} />

                        <TouchableOpacity  style={styles.button}  onPress={() => gravar() } > 
                            <Text style={styles.text}>Gravar</Text>    
                        </TouchableOpacity>
                    </View>             
                </SafeAreaView>                
            </ScrollView> 
            
            <SafeAreaView style={styles.lista}>
            <Text style={styles.tituloLista}>Listagem</Text>
                <FlatList 
                    data={dadosTipos}
                    keyExtractor={(item) =>item.tipodespesa}
                    renderItem={({item}) =>  (                        
                        <ListItem bottomDivider >                        
                            <ListItem.Content>
                            <ListItem.Title>{item.descricao}</ListItem.Title>                          
                            </ListItem.Content>
                            <View style={styles.acoes}>
                                <Icon style={styles.icons} name='pencil' size={20} color='orange'  onPress={() => editar(item.tipodespesa) } />
                                <Icon  name='trash' size={20} color='red'  onPress={() => confirmarExclusao() } />
                            </View>
                        </ListItem>
                    )}
                />                        
            </SafeAreaView> 
            
        </>
    )
}
const styles = StyleSheet.create({ 
    scroll:{
        backgroundColor:"#ffffff",
    },
    container:{
        width:"100%",        
        flex:2,
        justifyContent:"center",                
        alignItems:"center",
        backgroundColor:"#fff",
    },
    geral:{
        width:"90%",    
        flex:1,
    },
    lista:{
        width:'100%',        
        flex:2
    },
    tituloLista:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        borderBottomWidth:1,
        borderColor:'#000',
    },
    itemLista:{
        margin:7
    },
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