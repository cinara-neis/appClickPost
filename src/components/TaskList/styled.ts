import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

export const ViewList = styled(View)`
flex:1;
flex-direction: column;
background:#121212;
align-items:center;
margin-bottom:20px;
padding:10px;
border-radius:4px;
`;

export const TextOne = styled(Text)`
color: #fff;
padding-left: 30px;
`;

export const ButtonRemove = styled(TouchableOpacity)`
background-color: #141414;
border: 1px solid #fff;
height:45px;
justify-content: center;
margin-left: 5px;
padding:5px;
border-radius:4px;
`;
