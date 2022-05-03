import { doc, getDoc } from 'firebase/firestore/lite';
import { React, useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, SafeAreaView, Button} from 'react-native'
import { Chip, Icon } from 'react-native-elements';
import { auth, db } from '../firebase';
import styles from '../AppStyle';
import UserInterestName from '../components/UserInterestName';


const ProfileScreen = ({ route, navigation }) => {


  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userInterest, setUserInterest] = useState([]);
  const [url, setUrl] = useState();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    getData()
  }, [])

// getting profile data
  const getData = async () => {
    const docRef = doc(db, 'user', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUserName(docSnap.data().userName);
      setUserDescription(docSnap.data().userDescription);
      setUserAge(docSnap.data().userAge);
      setUserInterest(docSnap.data().interest);
      setUrl(docSnap.data().pictureUrl);
    } else {
      console.log('a true stranger');
    }
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
              onPress={() => setIsVisible(true)}
              title=''
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

    