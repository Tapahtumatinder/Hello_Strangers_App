import { View, FlatList, TextInput, Text, Platform, SafeAreaView, TouchableOpacity } from 'react-native'
import { Button, ListItem, ButtonGroup } from 'react-native-elements';
import { doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import { React, useState, useEffect } from 'react';

const InterestScreen = ({ navigation }) => {

    const [interests, setInterests] = useState([]);
 //   const [buttons, setButtons] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    
  // Calls function getData every time the page reloads
  useEffect(() => {
    getInterest();
  }, []);

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
//        setButton(tempInterestList); - ei ehkä tarvita
} catch (e) {
    console.error("Error: ", e);
}
}
 
// sets the button texts - tätä ei nyt ehkä tarvita
// const setButton = (tempInterestList) => {
//   let tempButton = [];
//   tempButton = tempInterestList.map (interest =>
//    interest.interestName
//    )
//    setButtons(tempButton);
//    console.log(tempButton)
//}

// to list and save seledted interest to profile -- kesken
const listSelectedInterests = (selectedId) => {
    console.log(selectedId + " on valittu")

}

// change the color of the selected item based on selected id
const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "rgba(128, 128, 128, 0.4)" : "#FFFFFF";
    listSelectedInterests(selectedId)
    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }} 
      />
    );
  };

  // one item on a interest list rendered in flatlist
  const Item = ({ item, onPress, backgroundColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.basicTitle]}>{item.interestName}</Text>
    </TouchableOpacity>
  );

return (
    <View style={styles.mainContainer}>
    <View style={styles.listContainer}>
        <Text style={{margin:20, textAlign:'center', fontSize: 22, fontWeight: "bold"}}> Choose your interests</Text>
     <View style={styles.flatListContainer}>
       <FlatList
            horizontal={false}
            numColumns
            data={interests} // interests from the database
            renderItem={renderItem} // which item we render
            keyExtractor={(item) => item.id.toString()}
            extraData={selectedId}
             />
     </View>
    </View>
    </View>
)
}
export default InterestScreen;