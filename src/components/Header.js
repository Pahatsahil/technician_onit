import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableNativeFeedback,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export const Header = () => {
    const { accessToken, isAuthorized, userData, profileImageUrl } = useSelector((state) => state.auth);
    return (
        <SafeAreaView>  
            <StatusBar
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />
            <View style={styles.header}>
                <Image
                    style={styles.profile}
                    source={{uri : profileImageUrl}}
                />
                <View style={[styles.padding, { flexDirection:'column' }]}>
                    <Text
                        style={{
                            fontFamily: 'poppins-semibold',
                            color: '#8ed1fc',
                            fontSize: 14,
                        }}>
                        {userData.userDetails?.personal_details?.name}
                    </Text>
                    <Text
                        style={{
                            fontFamily: 'poppins-regular',
                            color: '#f78da7',
                            fontSize: 10,
                            width:100
                        }}>
                        {userData.userDetails?.personal_details?.phone?.country_code}
                        {" " + userData.userDetails?.personal_details?.phone?.mobile_number}
                    </Text>
                </View>
                <View
                    style={{
                        width: '40%',
                        alignItems: 'flex-end',
                    }}>

                </View>
                {/* <View style={{ paddingHorizontal: 10 }}>
                    <Image
                        style={{ height: 24, width: 24 }}
                        source={require('../images/notification-min.png')}
                    />
                </View> */}

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    header: {
    paddingTop:8,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal:"37%"
    },

    profile: {
        width: 42,
        height: 42,
        borderRadius:40
    },
    padding: {
        marginHorizontal: 10,
    },
    box: {
        marginTop: 5,
        backgroundColor: '#ffd800',
        alignItems: 'center',

    },
    text: {
        fontFamily: 'poppins-semibold',
        fontSize: 12,
        color: '#000',
        paddingVertical: 5,
    }


});
