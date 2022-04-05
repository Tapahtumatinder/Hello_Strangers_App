import { Text } from "react-native-elements";
import { View, TextInput } from "react-native";
import { useState } from "react";
import styles from "../AppStyle";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { auth, db } from '../firebase'
import { Button } from "react-native-elements";
import { deleteDoc, doc } from "@firebase/firestore";
import { collection } from "@firebase/firestore";
import { Firestore } from "@firebase/firestore";
import { DocumentReference } from "@firebase/firestore";
import { getFirestore } from 'firebase/firestore'


const DeleteAccountScreen=({navigation})=>{
const db= getFirestore();
const colRef= collection(db,'user');
const [password, setPassword]= useState(''); 
const auth = getAuth();
const docRef= doc(db,'user', auth.currentUser.uid)
const user= auth.currentUser;


const credential = EmailAuthProvider.credential(auth.currentUser.email,password);
const result = async () => {
    await reauthenticateWithCredential(auth.currentUser,credential);
    deleteDoc(docRef)
    .then(()=>{
        console.log('wörkkii')
    deleteUser(user).then(()=> {
        console.log("deleted")
        //todo: redirect to login/registerscreen
        
    }).catch(error => alert(error.message))

}).catch(error => alert(error.message))
}
// User successfully reauthenticated. New ID tokens should be valid.





    return(
        <View>
            <Text style={{marginTop:40, textAlign:'center'}}>To delete your account, give your password</Text>
                <View style= {{alignItems:'center', paddingTop:20, paddingBottom:20}}><TextInput 
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style= {styles.input}
                    secureTextEntry
                    />
                    
                <Button onPress= {result} title='Delete' style={{width: 100, paddingTop:20}}/>
                </View>
        </View>
    )
}

export default DeleteAccountScreen;