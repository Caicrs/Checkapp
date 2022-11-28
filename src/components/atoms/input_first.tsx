import styled from 'styled-components'
import {TextInput } from "react-native";
import { colors } from '../../assets/styles/colors';

interface Input {
    placeholder: string;
}

const InputFirst = (placeholder:any) => {
return(
<Input
placeholder="texto aqui"
placeholderTextColor="#2D2D2D"
/>
)
}

const Input = styled(TextInput)`
width:85%;
height: 40px;
margin: 12px;
border-radius: 8px;
padding: 20px 10px 20px 10px;
color:red;
backgroundColor: ${colors.primaryTextColor};
`;

export default InputFirst;