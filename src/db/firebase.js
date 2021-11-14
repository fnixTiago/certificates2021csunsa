
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database'

var firebaseConfig = {
    apiKey: "AIzaSyB2SHvywdtGdW0RkIBMmlORjcRnsDE6nbA",
    authDomain: "csunsa-test.firebaseapp.com",
    databaseURL: "https://csunsa-test-default-rtdb.firebaseio.com",
    projectId: "csunsa-test",
    storageBucket: "csunsa-test.appspot.com",
    messagingSenderId: "942226968576",
    appId: "1:942226968576:web:d9ab7a81014b71616088e5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const database = firebase.database();
export { auth,database }

// export default fire;
// // cambio de pruebagit status
// export const auth = firebase.auth();
