import { StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { React, useState, useEffect } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';

const Picture = () => {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      uploadImage(bytes);
    }
  }
  
  const uploadImage = (image) => {

    if (!image) return;
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on('state_changed', (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      setProgress(prog);
    }, (error) => console.log(error)),
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
      .then((url) => console.log(url));
    };
  };

  return (
      <View>
          <Text>Image uploaded: {progress} %</Text>
          <Button title='Pick a photo' onPress={pickImage}/>
      </View>
  )
}

export default Picture

const styles = StyleSheet.create({})