
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyBHibQ_-Ikl1sy1HcW3YfW1P-52kGIUWg0",
    authDomain: "tarefas-d0a57.firebaseapp.com",
    projectId: "tarefas-d0a57",
    storageBucket: "tarefas-d0a57.appspot.com",
    messagingSenderId: "142139044373",
    appId: "1:142139044373:web:8157d2aec2689dac54d41c"
  };

  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig)
  }

  export default firebase;