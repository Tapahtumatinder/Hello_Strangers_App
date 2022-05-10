import { React, useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore/lite";
import { View } from 'react-native';
import { Chip } from "react-native-elements";
import styles from "../AppStyle";

const OurTags = (props) => {
    const { index, item, whatStyle } = props;
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
            {whatStyle == 'cards' ?
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
                /> :
                <Chip title={data}
                    titleStyle={{ color: 'black' }}
                    type='outline'
                    buttonStyle={{ backgroundColor: '#D6D6D6', borderColor: 'white' }}
                    icon={{
                        name: 'checkmark-circle',
                        type: 'ionicon',
                        size: 20,
                        color: 'black',
                    }}
                    containerStyle={{ marginVertical: 8 }}
                />}
        </View>

    )
}
export default OurTags;