import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { React, useState, useEffect } from 'react';
import { storage, auth, db } from '../firebase';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import styles from '../AppStyle';
import { setISODay } from 'date-fns';

const EventPicture = () => {
  // muutoksia

  const [progress, setProgress] = useState('');
  const [url, setUrl] = useState(null);
  const [id, setId] = useState('');

  useEffect(() => {
    getCurrentPicture();

    // check if permission is granted
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  // pick picture from phone
  const pickPicture = async () => {
    setData();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      uploadPicture(bytes);
    }
  }

  // upload picture to cloud storage -- EVENTID /images/ jälkeen
  const uploadPicture = (image) => {
    if (!image) return;
    const storageRef = ref(storage, `/images/${id}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // show picture upload progress in %
    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    },
      (error) => {
        console.error(error)
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData(downloadURL)
        });
      })
  }

  // merge picture url under event object in firestore  == EVENTID
  const setData = async (url) => {
    const ref = await addDoc(collection(db, 'event', id), {
      pictureUrl: url
    }, { merge: true }
    )
      .then(setUrl(url))
    console.log(ref.id);
    setId(ref.id)
  }

  // get and show the picture from the event object -- EVENTID
  const getCurrentPicture = async () => {
    const docRef = doc(db, 'event', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUrl(docSnap.data().pictureUrl);
    }
  }

  return (
    <View>
      <Image style={styles.image} source={{ uri: url }} />
      <Text>{progress}%</Text>
      <View style={styles.centerContainer}>
        <Button buttonStyle={styles.basicButton} titleStyle={styles.basicTitle} title='Cover Image' onPress={pickPicture} />
      </View>
    </View>
  )
}

export default EventPicture
