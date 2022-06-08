import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";


export const SafeAreaViewOne = styled(SafeAreaView)`
flex:1;
padding-top:30px;
padding-horizontal:5px;
background-color:#f2f6fc;
height:100%;
`;

export const ViewTask = styled(View)`
flex-direction: row;
margin-top:25px;
margin-bottom:10px;
height:auto;
`;

export const ButtonAdd = styled(TouchableOpacity)`
background-color: #141414;
height:45px;
align-items: center;
justify-content: center;
margin-left: 5px;
padding-horizontal:14px;
border-radius:4px;
`;

export const TextBtnAdd = styled(Text)`
color: #fff;
font-size:22px;
`;
