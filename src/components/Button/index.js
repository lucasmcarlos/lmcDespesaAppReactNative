import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Button } from './styles';

export default function NewButton(){

    return (
        <Button>
            <FontAwesome name='dollar' size={28} color="#fff" />
        </Button>
    )

}