import { View, Card, TextInput, Text, Pressable, Platform, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { Button, ListItem, ButtonGroup } from 'react-native-elements';
import { doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import { React, useState, useEffect } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { render } from 'react-dom';


const InterestScreen = ({ navigation }) => {

    const [interests, setInterests] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
   
  // Calls function getData every time the page reloads
  useEffect(() => {
    getInterest();
    getData();
  }, []);


    function onSelectedItemsChange(selectedItems) {
    // Set Selected Items
    setSelectedItems(selectedItems);
  }

   // Gets already stored interests in collection 'user' that has the same id with the logged in user
   const getData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserInterests(docSnap.data().interest)
      setSelectedItems(docSnap.data().interest)
    } else {
      console.log('a true stranger');
    }
  }


  // merge selected interests under user object in firestore 
  const saveInterest = async (url) => {
    const ref = doc(db, 'user', auth.currentUser.uid);
    await setDoc(ref, { 
      interest: selectedItems }, { merge: true })
      .then (navigation.goBack('EditProfile'));
  }

  // Gets all of the data stored in collection 'interest'
  const getInterest = async () => {
      let tempInterestList = [];
      let tempInterest = {};
      try {
        const colRef= query(collection(db,'interest'));
        const querySnapshot = await getDocs(colRef);
        querySnapshot.forEach((doc) => {
            tempInterest = doc.data();
            tempInterest['id'] = doc.id;
            tempInterestList.push(tempInterest);
            }); 
        console.log(tempInterestList)
        setInterests(tempInterestList);
        
} catch (e) {
    console.error("Error: ", e);
}
}
 

return (
  <SafeAreaView>
      <View>
     <MultiSelect
     hideTags
     items={interests}
     uniqueKey="id"
     onSelectedItemsChange={onSelectedItemsChange}
     selectedItems={selectedItems}
     selectText="Choose interests"
     onChangeInput={(text)=> console.log(text)}
     tagRemoveIconColor="CCC"
     tagBorderColor="#CCC"
     tagTextColor="#CCC"
     selectedItemTextColor="#CCC"
     selectedItemIconColor="#CCC"
     itemTextColor="#000"
          displayKey="interestName"
          searchInputStyle={{color: '#CCC'}}
          hideSubmitButton={true}
        />
      <View style={{ alignItems: 'center' }}>
         <Button buttonStyle={styles.basicButton}  title='SAVE' titleStyle={styles.basicTitle} onPress={saveInterest} />
      </View> 
  </View>
   </SafeAreaView>
);
}


export default InterestScreen;



