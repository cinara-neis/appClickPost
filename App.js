import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView
} from 'react-native';

import { SafeAreaViewOne, ButtonAdd, ViewTask, TextBtnAdd } from './styled.ts';

import Login from './src/components/Login';
import TaskList from './src/components/TaskList';

import firebase from './src/services/firebaseConnection';

export default function App() {
  const [user, setUser] = useState(null);

  const inputRef = useRef(null);
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState('')
  const [key, setKey] = useState('');


  useEffect(() => {

    function getUser() {

      if (!user) {
        return;
      }

      firebase.database().ref('tarefas').child(user).once('value', (snapshot) => {
        setTasks([]);

        snapshot?.forEach((childItem) => {
          let data = {
            key: childItem.key,
            nome: childItem.val().nome
          }

          setTasks(oldTasks => [...oldTasks, data])
        })

      })

    }


    getUser();

  }, [user])


  function handleAdd() {
    if (newTask === '') {
      return;
    }

    // Usuario quer editar uma tarefa.
    if (key !== '') {
      firebase.database().ref('tarefas').child(user).child(key).update({
        nome: newTask
      })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key === key)
          const taskClone = tasks;
          taskClone[taskIndex].nome = newTask

          setTasks([...taskClone])


        })

      Keyboard.dismiss();
      setNewTask('');
      setKey('');
      return;
    }

    let tarefas = firebase.database().ref('tarefas').child(user);
    let chave = tarefas.push().key;

    tarefas.child(chave).set({
      nome: newTask
    })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask
        };

        setTasks(oldTasks => [...oldTasks, data])

      })

    Keyboard.dismiss();
    setNewTask('');

  }

  function handleDelete(key) {
    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(() => {
        const findTasks = tasks.filter(item => item.key !== key)
        setTasks(findTasks)
      })
  }

  function handleEdit(data) {
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    setNewTask('');
    Keyboard.dismiss();
  }


  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
  }

  return (
    <SafeAreaViewOne>
      {key.length > 0 && (
        <View style={{ flexDirection: 'row', marginBottom: 8, }}>
          <Text style={{ marginLeft: 5, color: '#FF0000' }}>
            Você está editando uma tarefa!
          </Text>
          <TouchableOpacity onPress={cancelEdit}>
            <TextBtnAdd style={{ fontSize: 20, color: '#FF0000', marginLeft: 5, marginTop: -6 }}>....</TextBtnAdd>
          </TouchableOpacity>
        </View>
      )}

      <Text style={{ marginLeft: 5, marginTop: 20, color: '#141414', fontSize: 20 }}>Cadastre sua tarefa aqui: </Text>
      <ViewTask>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <ButtonAdd onPress={handleAdd}>
          <TextBtnAdd>+</TextBtnAdd>
        </ButtonAdd>
      </ViewTask>


      <FlatList
        data={tasks}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <TaskList data={item} deleteItem={handleDelete} editItem={handleEdit} />
        )}
      />
    </SafeAreaViewOne>
  );
}


const styles = StyleSheet.create({
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#141414',
    height: 45,
    color: '#141414'
  },
})