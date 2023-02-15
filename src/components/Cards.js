import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import acmin from '../images/ac-min.png'
import plumberingmin from '../images/plumbering-min.png'


export const Cards = ({data}) => {
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image
                    style={styles.images}
                    source={acmin}
                />
                <Text style={styles.text}>{data.primary_service.service_name.split(" -")[0].charAt(0) + data.primary_service.service_name.split(" -")[0].slice(1).toLowerCase()}</Text>

            </View>
            <View style={styles.box2} >
                <Text>No. of Tickets available:</Text>
                <View style={styles.alltext}>
                    <Text  >{data.no_of_tickets_available}</Text>
                </View>
            </View>
            <View style={styles.box2} >
                <Text>No. of Pending Tickets:</Text>
                <View style={styles.alltext}>
                    <Text  >{data.no_of_pending_tickets}</Text>
                </View>
            </View>
            <View style={styles.box2} >
                <Text>No. of Technicians:</Text>
                <View style={styles.alltext}>
                    <Text  >{data.no_of_technicians}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebeb',
        padding:15,
        marginHorizontal:20,
        marginBottom:10
        

    },
    box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems:"flex-start",
        width: "90%",
        marginBottom: 8
    },
    box2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    alltext: {
        color: 'black'
    },
    images: {
        height: 40,
        width: 40
    },
    text: {
        paddingLeft: 20,
        paddingTop: 10,
        fontWeight: 'bold',
    }
})