import { Text } from "react-native-elements";
import { View, TextInput } from "react-native";
import { useState } from "react";
import styles from "../AppStyle";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";
import { auth, db } from '../firebase'
import { Button } from "react-native-elements";
import { deleteDoc, doc } from "@firebase/firestore";


const DeleteAccountScreen=({navigation})=>{

const [password, setPassword]= useState(''); 
const auth = getAuth()
const user= auth.currentUser;
const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    password
)
const result = async () => {
    await reauthenticateWithCredential(auth.currentUser,credential)
    deleteData()
    deleteUser(user).then(()=> {
        console.log("deleted")
    }).catch((error) => {
        console.log("joku meni pieleen")
    })

    .catch(error => alert(error.message))
}
// User successfully reauthenticated. New ID tokens should be valid.
const deleteData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    await  deleteDoc(doc(db,"user", auth.currentUser.uid));
    } else {
      console.log('a true stranger');
    }
  }


    return(
        <View>
<Text>If you are sure you want to delete your account, give your password</Text>
        <TextInput placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style= {styles.input}
                    secureTextEntry
                    />
                <Button onPress= {result} title='Delete'/>
</View>
    )
}
export default DeleteAccountScreen;