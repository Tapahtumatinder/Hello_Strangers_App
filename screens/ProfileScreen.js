
import { doc, getDoc } from 'firebase/firestore/lite';
import { React, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, SafeAreaView, Button} from 'react-native'
import { Chip, Icon } from 'react-native-elements';
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
    if(isFocused){ 
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

// both tabNav and stackNav include the ProfileScreen
// if accessed by stackNav the 'route' option is included
// only profile owner can access the view by tabNav
// by stackNav the user might or mignt not be the profileOwner
const profileOwner = () => {
  return route.params ? route.params.uid != auth.currentUser.uid ? false : true : true;
}

const getInterestData = async () =>{
    const docRef= doc(db,'interest');
    const docSnap =await getDoc(docRef);
    const data= docSnap.data();
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
              titleStyle={{ color: 'black' }}
              type='solid'
              buttonStyle={{ backgroundColor: 'white', borderRadius: 20 }}
              icon={
                  <Icon
                      name='ellipsis-vertical'
                      type='ionicon'
                      size={25}
                      color="black" />}
              iconRight />
      ),
  });
}, [navigation]);



  return  (
    <SafeAreaView style={styles.mainContainer}>
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
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
            userInterest.map( (item, index) => {
              return <UserInterestName
              navigation={navigation}
              key={index}
              index={index}
              item={item}/>
             
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