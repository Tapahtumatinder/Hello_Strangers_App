import { doc, getDoc } from 'firebase/firestore/lite';
import { React, useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, SafeAreaView} from 'react-native'
import { Chip } from 'react-native-elements';
import { auth, db } from '../firebase';
import styles from '../AppStyle';


const ProfileScreen = ({ navigation }) => {


  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userInterest, setUserInterest] = useState([]);
  const [url, setUrl] = useState();

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

    
}
  return  (
    <SafeAreaView style={styles.mainContainer}>
    <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}>
          <ImageBackground
                    source={{ uri: url }}
                    resizeMode="cover"
                    imageStyle={{ opacity: 0.8 }}
                    style={styles.eventImg}>
          <View style={styles.avatarOnEventImg}>
                        <View>
                            <Text style={styles.txtOnEventImg}>{userName} {userAge}</Text>
                            
                        </View>
                    </View>
          </ImageBackground>
          <View style={styles.profileChips}>
            {
            items.map( (item, index) => (
                    <Chip
                        key={index}
                        title={item.name}
                        titleStyle={{ color: 'black' }}
                        type='outline'
                        buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                        containerStyle={{ marginVertical: 6 }} />
            ))
            }
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

    const items = [
      {
      id: '92iijs7yta',
      name: 'Boardgames'
    }, {
      id: 'a0s0a8ssbsd',
      name: 'Museums'
    }, {
      id: '16hbajsabsd',
      name: 'Art'
    }, {
      id: 'nahs75a5sg',
      name: 'Outdoors'
    }, {
      id: '667atsas',
      name: 'Wine'
    }, {
      id: '92iijs7yva',
      name: 'Padel'
    },  {
      id: '92iijs7ysa',
      name: 'Travel'
    }, 
  ];