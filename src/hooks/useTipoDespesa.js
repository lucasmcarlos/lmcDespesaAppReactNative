import apiDespesas from '../services/apiDespesas';
import {useState, useEffect} from 'react';

export const useTipoDespesa=()=>{
    
    const [tiposDespesa, setTiposDespesa] = useState(null);

    useEffect(() =>{
        apiDespesas.get("/tipodespesa/listar").then( response =>{
            setTiposDespesa(response.data)
        })
    },[])

    console.info('hooks tipo despesa');    
    console.info(tiposDespesa);
    
    return{dadosTipos:tiposDespesa};

}