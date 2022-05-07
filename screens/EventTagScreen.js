import { View, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import { doc, setDoc, getDoc, collection, getDocs, query } from 'firebase/firestore/lite';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import { React, useState, useEffect } from 'react';
import MultiSelect from 'react-native-multiple-select';


const EventTagScreen = (props) => {

    const navigation = useNavigation();

    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [eventTags, setEventTags] = useState([]);


    // Calls function getData every time the page reloads
    useEffect(() => {
        getTags();
        getData();
    }, []);

    function onSelectedTagsChange(selectedTags) {
        // Set Selected Tags
        setSelectedTags(selectedTags);
    }

    const getData = async () => {
        const docRef = doc(db, 'event', props.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setEventTags(docSnap.data().tags)
            setSelectedTags(docSnap.data().tags)
        } else {
            console.log('a true stranger');
        }
    }


    // merge selected tags under event object in firestore 
    const saveTags = async (url) => {
        const eventRef = doc(db, 'event', props.id)
        await setDoc(eventRef, {
            tags: selectedTags
        }, { merge: true })
            .then(navigation.goBack('Edit event'));
    }

    // Gets all of the data stored in collection 'interest'
    const getTags = async () => {
        let tempTagList = [];
        let tempTag = {};
        try {
            const colRef = query(collection(db, 'interest'));
            const querySnapshot = await getDocs(colRef);
            querySnapshot.forEach((doc) => {
                tempTag = doc.data();
                tempTag['id'] = doc.id;
                tempTagList.push(tempTag);
            });
            console.log(tempTagList)
            setTags(tempTagList);

        } catch (e) {
            console.error("Error: ", e);
        }
    }


    return (
        <SafeAreaView>
            <View>
                <MultiSelect
                    hideTags
                    items={tags}
                    uniqueKey="id"
                    onSelectedTagsChange={onSelectedTagsChange}
                    selectedTags={selectedTags}
                    selectText="Choose tags"
                    onChangeInput={(text) => console.log(text)}
                    tagRemoveIconColor="CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedTagTextColor="#CCC"
                    selectedTagIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="tagName"
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