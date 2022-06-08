import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { TextBtnAdd } from '../../../styled';
import { ButtonRemove } from './styled';

export default function TaskList({ data, deleteItem, editItem }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ButtonRemove onPress={() => deleteItem(data.key)}>
          <TextBtnAdd>X</TextBtnAdd>
        </ButtonRemove>
        <View style={{ padding: 10 }}>
          <TouchableWithoutFeedback onPress={() => editItem(data)}>
            <Text style={{ color: "#FFF", padding: 5 }}>{data.nome}</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#141414',
    alignItems: 'center',
    marginBottom: 5,
    padding: 5,
    borderRadius: 4
  }
})