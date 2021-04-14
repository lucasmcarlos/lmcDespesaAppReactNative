import React from 'react'; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';


import { NavigationContainer } from '@react-navigation/native';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import FeatherIcons from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { StatusBar, View, Button, Alert } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ButtonDollar from './components/Button';
import HomeScreen from './screens/Home';
import TipoDespesa from './screens/TipoDespesa';
import Receitas from './screens/Receita';
import ReceitaListar from './screens/Receita/listar';
import Despesas from './screens/Despesas'
import Grafico from './screens/Grafico';
import Login from './screens/Login';

import { Text } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); 

function tabs(){
    return ( 
        <> 
            <Tab.Navigator
                tabBarOptions = {{
                            style:{
                                backgroundColor:'#ffffff',
                                borderTopColor:'rgba(255,255,255, 03)'
                            },
                            labelStyle: {
                                fontSize: 13,
                            },
                                inactiveTintColor: '#B0C8D0',
                                activeTintColor:'#2E6F83',                            
                            }} >
                <Tab.Screen 
                    name="TipoDespesa" 
                    component={TipoDespesa}
                    options={{
                        title:'Tipos',                        
                        tabBarIcon: ({size, color }) => (
                            <AntDesign name='tags' size={size} color={color} />
                        )
                    }}                
                />
                <Tab.Screen name="Receitas" component={ReceitaListar}
                    options={{
                        title:'Receitas',
                        tabBarIcon: ({size, color }) => (
                            <AntDesign name='plussquare' size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen name="Home2" component={HomeScreen}
                    options={{
                        title:'',
                        tabBarIcon: ({size, color }) => (
                            <ButtonDollar />
                        )
                    }}
                />
                <Tab.Screen name="Despesas" component={Despesas}
                    options={{
                        title:'Despesas',
                        tabBarIcon: ({size, color }) => (
                            <AntDesign name='minussquare' size={size} color={color} />
                        )
                    }}
                />
                <Tab.Screen name="Grafico" component={Login}
                    options={{
                        title:'Grafico',
                        tabBarVisible:false,
                        tabBarIcon: ({size, color }) => (
                            <AntDesign name='piechart' size={size} color={color} />
                        )
                    }}
                />
            </Tab.Navigator>
        </>
    )
}


export default function Navigation(){
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                                headerShown: false
                            }}>
                <Stack.Screen name="Home" component={tabs} />
                <Stack.Screen name="ReceitaNovo" component={Receitas} />
                <Stack.Screen name="Receita" component={ReceitaListar} />
            </Stack.Navigator>            
            <StatusBar animated={true} backgroundColor="#22627A" />             
        </NavigationContainer>
    )
}