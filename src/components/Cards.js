import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import acmin from '../images/ac-min.png';
import plumberingmin from '../images/plumbering-min.png';
import { COLORS } from '../utils/constants';
import axios from 'axios';
import acd from '../images/acd.jpeg'
import plumbingd from '../images/plumbingd.jpeg'
import carpentred from '../images/carpentred.jpeg'
import hospatality from '../images/hospatality-min.png'
// import cookingd from '../images/cookingd.png'
// import cleaningmin from '../images/cleaning-min.png'
import homed from '../images/homed.jpeg'
import beautyd from '../images/beautyd-min.jpeg'
import electriciand from '../images/electriciand-min.jpeg'
import kitchend from '../images/kitchend.jpeg'

export const Cards = ({ data, _id }) => {
    const [availableServices, setAvailableServices] = useState();

    useEffect(() => {
        const fetchAvailableOpportunity = async () => {
            const res = await axios.get('https://api.onit.services/technicianApp/get-opportunity-in-your-area');
            setAvailableServices(res?.data?.data?.totalData);
            console.log("we see", JSON.stringify(res.data.data.totalData[0]))
        };
        fetchAvailableOpportunity();
        console.log("DATA", availableServices)
    }, []);
    let text = data.primary_service.service_name.split(" -")[0].charAt(0) + data.primary_service.service_name.split(" -")[0].slice(1).toLowerCase()
    console.log("Sohail", text)
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image style={styles.images}
                    // source={require('../images/electronics-min.png')}
                    source={
                        text == 'Plumbing' ?
                            plumbingd :
                            text == 'Home appliance' ?
                                homed :
                                text == 'Hospitality services' ?
                                    hospatality :
                                    text == 'Plumbing' ?
                                        plumbingd :
                                        text == 'Beauty and personal care' ?
                                            beautyd :
                                            text == 'Electrician' ?
                                                electriciand :
                                                text == 'Kitchen appliance' ?
                                                    kitchend :
                                                    text == 'Carpenter' ?
                                                        carpentred :
                                                        acd}
                />
                <Text style={styles.text}>
                    {data.primary_service.service_name.split(' -')[0].charAt(0) +
                        data.primary_service.service_name
                            .split(' -')[0]
                            .slice(1)
                            .toLowerCase()}
                </Text>
            </View>
            <View style={styles.box2}>
                <Text style={{ color: COLORS.BLACK }}>No. of Tickets available:</Text>
                <View style={styles.alltext}>
                    <Text style={{ color: COLORS.BLACK }}>
                        {data.no_of_tickets_available}
                    </Text>
                </View>
            </View>
            <View style={styles.box2}>
                <Text style={{ color: COLORS.BLACK }}>No. of Pending Tickets:</Text>
                <View style={styles.alltext}>
                    <Text style={{ color: COLORS.BLACK }}>
                        {data.no_of_pending_tickets}
                    </Text>
                </View>
            </View>
            <View style={styles.box2}>
                <Text style={{ color: COLORS.BLACK }}>No. of Technicians:</Text>
                <View style={styles.alltext}>
                    <Text style={{ color: COLORS.BLACK }}>{data.no_of_technicians}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebeb',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 10,
    },
    box: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '90%',
        marginBottom: 8,
    },
    box2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    alltext: {
        color: 'black',
    },
    images: {
        height: 40,
        width: 40,
    },
    text: {
        paddingLeft: 20,
        paddingTop: 10,
        fontWeight: 'bold',
        color: COLORS.BLACK
    },
});
