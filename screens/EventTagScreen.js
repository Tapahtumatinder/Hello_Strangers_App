import { View, SafeAreaView, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import { doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import { React, useState, useEffect } from 'react';
import MultiSelect from 'react-native-multiple-select';


const EventTagScreen = ({ route, navigation }) => {
    const { eventId } = route.params;
    const [tags, setTags] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [eventTags, setEventTags] = useState([]);

    // Calls function getData every time the page reloads
    useEffect(() => {
        getInterest();
        getData();
        console.log(eventId);
    }, []);

    // Gets already stored tags in collection 'event' that has the same id with the event being changed.
    const getData = async () => {
        const docRef = doc(db, 'event', eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setEventTags(docSnap.data().ourTags)
            setSelectedItems(docSnap.data().ourTags)
        } else {
            console.log('Error in getting data');
        }
    }


    function onSelectedItemsChange(selectedItems) {
        // Set Selected Items
        setSelectedItems(selectedItems);
    }


    // merge selected tags under event object in firestore 
    const saveTags = async (url) => {
        const ref = doc(db, 'event', eventId);
        await setDoc(ref, {
            ourTags: selectedItems
        }, { merge: true })
            .then(navigation.goBack());
    }

    // Gets all of the data stored in collection 'interest'
    const getInterest = async () => {
        let tempInterestList = [];
        let tempInterest = {};
        try {
            const colRef = query(collection(db, 'interest'));
            const querySnapshot = await getDocs(colRef);
            querySnapshot.forEach((doc) => {
                tempInterest = doc.data();
                tempInterest['id'] = doc.id;
                tempInterestList.push(tempInterest);
            });
            setTags(tempInterestList)

        } catch (e) {
            console.error("Error: ", e);
        }

    }


    return (
        <SafeAreaView>
            <View>
                <MultiSelect
                    fixedHeight={true}
                    styleSelectorContainer={{ height: '91%' }}
                    hideTags
                    items={tags}
                    uniqueKey="id"
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Choose interests"
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="interestName"
                    searchInputStyle={{ color: '#CCC' }}
                    hideSubmitButton={true}

                />
                <View style={{ alignItems: 'center' }}>
                    <Button buttonStyle={styles.basicButton} title='SAVE' titleStyle={styles.basicTitle} onPress={saveTags} />
                </View>
            </View>
        </SafeAreaView>
    );
}


export default EventTagScreen;