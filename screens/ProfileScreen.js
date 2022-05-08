
import { doc, getDoc } from 'firebase/firestore/lite';
import { React, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, SafeAreaView } from 'react-native'
import { Chip, Icon, Button } from 'react-native-elements';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import UserInterestName from '../components/UserInterestName';
import { useIsFocused } from "@react-navigation/native";


const ProfileScreen = ({ route, navigation }) => {


  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userInterest, setUserInterest] = useState([]);
  const [url, setUrl] = useState();
  //const [isVisible, setIsVisible] = useState(true);
  const placeholderUrl = 'https://images.unsplash.com/photo-1523626752472-b55a628f1acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80';
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getData()
    }
  }, [isFocused])

  // getting profile data
  const getData = async () => {
    const docRef = doc(db, 'user', profileOwner() ? auth.currentUser.uid : route.params.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserName(docSnap.data().userName ? docSnap.data().userName : '?');
      setUserDescription(docSnap.data().userDescription ? docSnap.data().userDescription : '?');
      setUserAge(docSnap.data().userAge ? docSnap.data().userAge : '?');
      setUserInterest(docSnap.data().interest ? docSnap.data().interest : []);
      setUrl(docSnap.data().pictureUrl ? docSnap.data().pictureUrl : placeholderUrl);
    } else {
      console.log('a true stranger');
    }
  }

  // both tabNav and stackNav include the ProfileScreen.
  // if accessed by tabnav, user is the profileOwner => uid provided by auth.currentUser.uid (no route).
  // if accessed by stackNav, 'route' provides uid for fetching the matching profile data.
  const profileOwner = () => {
    return route.params ? route.params.uid != auth.currentUser.uid ? false : true : true;
  }

  const getInterestData = async () => {
    const docRef = doc(db, 'interest');
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
  }

  // to display button in the right upper corner of the header (three dots)
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
          disabled={!profileOwner()}
          title='Edit'
          titleStyle={styles.colorBlue}
          type='solid'
          buttonStyle={{ backgroundColor: 'white', borderRadius: 20, marginRight: 10 }}
        />
      ),
    });
  }, [navigation]);



  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{ uri: url }}
          resizeMode="cover"
          imageStyle={{ opacity: 0.8 }}
          style={styles.profileImg}>
          <View style={styles.avatarOnEventImg}>
            <View>
              <Text style={styles.txtOnEventImg}>{userName} {userAge}</Text>

            </View>
          </View>
        </ImageBackground>
        <View style={styles.profileChips}>
          {
            userInterest.map((item, index) => {
              return <UserInterestName
                navigation={navigation}
                key={index}
                index={index}
                item={item} />

            })}
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.profileDescription}>ABOUT ME:</Text>
          <Text style={styles.profileDescription}>{userDescription}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default ProfileScreen;
