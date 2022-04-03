import { StyleSheet, Text, View, Image } from 'react-native';
import { React, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { storage, auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const Picture = forwardRef((props, i) => {
  // muutoksia

  const [progress, setProgress] = useState('');
  const [url, setUrl] = useState(null);
  const { collection } = props;

  useImperativeHandle(i, () => ({
    method: () => {
      pickPicture();
    },
  }));

  useEffect(() => {
    getCurrentPicture ();

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
  
  // upload picture to cloud storage
  const uploadPicture = (image) => {
    if (!image) return;
    const storageRef = ref(storage, `/images/${auth.currentUser.uid}`);
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

  // merge picture url under user object in firestore 
    const setData = async (url) => {
      const ref = doc(db, collection, auth.currentUser.uid);
      await setDoc(ref, { pictureUrl: url }, { merge: true })
      .then(setUrl(url))
  }

  // 
  const getCurrentPicture = async () => {
    const docRef = doc(db, collection, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUrl(docSnap.data().pictureUrl);
    }
  }

  return (
      <View>
          <Image style={styles.image} source={{ uri: url }}/>
          <Text>{progress}%</Text>
      </View>
  )
})

export default Picture

const styles = StyleSheet.create({
  image: {
    width: 375,
    height: 375,
    backgroundColor: '#ddd'
  }
})