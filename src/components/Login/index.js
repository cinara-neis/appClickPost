import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import firebase from '../../services/firebaseConnection';
import { SafeAreaViewLogin, TextTouch, TextInputEP, TextBtn, TextFooter } from './styled';


export default function Login({ changeStatus }) {
  const [type, setType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleLogin() {
    if (type === 'login') {
      //aqui fazemos o login

      const user = firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Ops parece que deu algum erro')
        })
    } else {
      //aqui cadastramos o usuario
      const user = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          changeStatus(user.user.uid)
        })
        .catch((err) => {
          console.log(err);
          alert('Ops parece que algo está errado!')
          return;
        })
    }
  }

  return (
    <SafeAreaViewLogin >
      <ScrollView>
        <View >
          <Text style={{ fontSize: 25, width: 200, textAlign: 'center', marginLeft: 80, marginBottom: 30, color: '#141414' }}>Bem Vindos ao ClickPost!!!</Text>
          <Image
            style={{ height: 150, width: 150, borderRadius: 80, marginLeft: 110, marginBottom: 30 }}
            source={{
              uri: 'https://www.clickgratis.com.br/blog-clickgratis/wp-content/uploads/2011/10/Smilinguido.jpg',
            }} />
        </View>
        <Text style={{ marginBottom: 5, color: '#141414' }}>Insira seu Email</Text>
        <TextInput
          placeholder='Seu email'
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={{ marginBottom: 5, color: '#141414' }}>Insira sua Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="*********"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={[styles.handleLogin, { backgroundColor: type === 'login' ? '#3ea6f2' : '#141414' }]}
          onPress={handleLogin}
        >
          <TextBtn >
            {type === 'login' ? 'Acessar' : 'Cadastrar'}
          </TextBtn>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setType(type => type === 'login' ? 'cadastrar' : 'login')}>
          <TextTouch >
            {type === 'login' ? 'Criar uma conta' : 'Já possuo uma conta'}
          </TextTouch>
        </TouchableOpacity>
        <TextFooter>Desenvolvido por @Cinara Neis</TextFooter>
      </ScrollView>
    </SafeAreaViewLogin>
  );
}

const styles = StyleSheet.create({
  handleLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 10
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    height: 45,
    padding: 10,
    borderWidth: 1,
    borderColor: '#141414',
    color: '#141414',
  }
})
