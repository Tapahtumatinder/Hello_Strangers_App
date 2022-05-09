import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { View, Text } from 'react-native';
import { Chip } from "react-native-elements";
import styles from "../AppStyle";

const OurTags = (props) => {
    const { index, item } = props;
    const [data, setData] = useState();

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const docRef = doc(db, 'interest', item);
        const docSnap = await getDoc(docRef);
        setData(docSnap.data().interestName)
    }

    return (
        <View>
            <Chip title={data}
                titleStyle={styles.cardText}
                type='flat'
                buttonStyle={styles.cardChip}
                icon={{
                    name: 'checkmark-circle',
                    type: 'ionicon',
                    size: 15,
                    color: 'white',
                }}
            />
        </View>

    )
}
export default OurTags;