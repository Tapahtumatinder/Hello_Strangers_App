import { React, useState, useLayoutEffect } from 'react';
import { auth, db } from '../firebase';
import { doc } from "firebase/firestore/lite";
import { View, Text } from 'react-native';

import styles from '../AppStyle';

const ProfileDetailsScreen = ({ route, navigation }) => {
    const { uid } = route.params;

    return (
        <View>
            <Text>{ uid }</Text>
        </View>
    )

}
export default ProfileDetailsScreen;