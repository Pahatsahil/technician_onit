import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableNativeFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CompletedRequestBox() {
    // return (
    //     <SafeAreaView style={{flex:1}}>
    //         <View style={styles.requests}>
    //             {/* request box upper layer */}
    //             <View style={styles.booking}>
    //                 <View
    //                     style={{
    //                         height: 40,
    //                         borderBottomWidth: 1,
    //                         borderColor: '#e9e9e9',
    //                         flexDirection: 'row',
    //                     }}>
    //                     <View
    //                         style={{
    //                             width: '65%',
    //                             borderTopStartRadius: 10,
    //                             flexDirection: 'row',
    //                             alignItems: 'center',
    //                             justifyContent: 'space-evenly',
    //                             flexShrink: 1
    //                         }}>
    //                         <Image
    //                             style={{ width: 22, height: 22 }}
    //                             source={require('../images/water-tap.png')}
    //                         />
    //                         {/* left side box of new request */}
    //                         <Text
    //                             style={{
    //                                 color: '#1D4831',
    //                                 fontFamily: 'poppins-regular',
    //                                 fontSize: 15,
    //                             }}>
    //                             Booking ID :{' '}
    //                             <Text
    //                                 style={{
    //                                     color: '#1D4831',
    //                                     fontFamily: 'poppins-semibold',
    //                                     fontSize: 15,
    //                                 }}>
    //                                 AA1585
    //                             </Text>
    //                         </Text>
    //                     </View>
    //                     {/* right right box of new request */}
    //                     <View
    //                         style={{
    //                             width: '35%',
    //                             backgroundColor: '#e9e9e9',
    //                             borderColor: '#e9e9e9',
    //                             borderTopEndRadius: 10,
    //                             alignItems: 'center',
    //                             justifyContent: 'center',
    //                             padding: 2,

    //                         }}>
    //                         <View style={{ flexDirection: 'row' }}>
    //                             <Image
    //                                 style={styles.smlimage}
    //                                 source={require('../images/date.png')}
    //                             />
    //                             <Text style={styles.smltext}> 10th March 2022</Text>
    //                         </View>
    //                         <View style={{ flexDirection: 'row' }}>
    //                             <Image
    //                                 style={styles.smlimage}
    //                                 source={require('../images/time.png')}
    //                             />
    //                             <Text style={styles.smltext}> 09:00 - 11:00 am</Text>
    //                         </View>
    //                     </View>
    //                 </View>
    //                 <View
    //                     style={{
    //                         height: 50,
    //                         flexDirection: 'row',
    //                     }}>
    //                     <View style={{ flex: 1, paddingLeft: 10, paddingVertical: 5 }}>
    //                         <View
    //                             style={{
    //                                 flexDirection: 'row',
    //                             }}>
    //                             <Image
    //                                 style={styles.smlimage}
    //                                 source={require('../images/warning.png')}
    //                             />
    //                             <Text style={[styles.smltext, { marginHorizontal: 8 }]}>
    //                                 Problem:
    //                             </Text>
    //                         </View>
    //                         <Text
    //                             style={{
    //                                 fontFamily: 'poppins-medium',
    //                                 fontSize: 13,
    //                                 color: '#1D4831',
    //                             }}>
    //                             Tap Leaking and sink problem
    //                         </Text>
    //                     </View>
    //                     <View style={{ flex: 0.6 }}>
    //                         <Text
    //                             style={{
    //                                 alignSelf: 'center',
    //                                 marginTop: 5,
    //                                 fontFamily: 'poppins-regular',
    //                                 fontSize: 14,
    //                                 color: '#45d162',
    //                             }}>
    //                             Paid
    //                         </Text>
    //                         <Text
    //                             style={{
    //                                 fontSize: 16,
    //                                 fontFamily: 'poppins-medium',
    //                                 color: '#1D4831',
    //                                 alignSelf: 'center',
    //                             }}>
    //                             ₹ 200
    //                         </Text>
    //                     </View>
    //                 </View>
    //                 <View
    //                     style={{
    //                         height: 50,
    //                         borderColor: '#e9e9e9',
    //                         flexDirection: 'row',
    //                     }}>
    //                     <View
    //                         style={{
    //                             flexDirection: 'row',
    //                             marginLeft: 10,
    //                             justifyContent: 'center',
    //                             alignItems: 'center',
    //                         }}>
    //                         <Image
    //                             style={[styles.smlimage]}
    //                             source={require('../images/location.png')}
    //                         />
    //                         <Text style={[styles.smltext, { marginLeft: 8, color: '#32acff' }]}>
    //                             Basvanagudi, Delhi, 560004
    //                         </Text>
    //                         <View
    //                             style={{
    //                                 backgroundColor: '#d2f4da',
    //                                 padding: 2,
    //                                 paddingHorizontal: 10,
    //                                 marginLeft: 50,
    //                                 borderRadius: 4,
    //                             }}>
    //                             <Text
    //                                 style={{
    //                                     fontFamily: 'poppins-medium',
    //                                     color: '#35cd55',
    //                                     fontSize: 12,
    //                                 }}>
    //                                 Completed
    //                             </Text>
    //                         </View>
    //                     </View>
    //                 </View>
    //                 <View
    //                     style={{
    //                         display: 'flex',
    //                         width: '95%',
    //                         borderRadius: 4,
    //                         backgroundColor: '#f1f1f1',
    //                         alignSelf: 'center',
    //                         marginVertical: 10,
    //                         paddingHorizontal: 8,
    //                         paddingVertical: 4,
    //                     }}>
    //                     <Text style={{ fontSize: 11, fontFamily: 'poppins-semibold', color: '#000' }}>
    //                         Plumber Remark:{' '}

    //                         <Text style={{ fontSize: 11, fontFamily: 'poppins-regular', color: '#000' }}>
    //                             Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    //                         </Text>
    //                     </Text>
    //                 </View>
    //             </View>
    //         </View>
    //     </SafeAreaView>
    // );
    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <View>
                    <Text
                        style={{
                            color: '#1D4831',
                            fontFamily: 'poppins-regular',
                            fontSize: 15,
                        }}>
                        Booking ID :{' '}
                        <Text
                            style={{
                                color: '#1D4831',
                                fontFamily: 'poppins-semibold',
                                fontSize: 15,
                            }}>
                            AA1585
                        </Text>
                    </Text>
                </View>


                <View style={{ flexDirection: "row", paddingTop: 20 }}>
                    <Image source={require
                        ('../images/location.png')} />
                    <View style={{ justifyContent: "center" }}>
                        <Text style={{ color: 'black', fontSize: 15, fontWeight: "400" }}>  Nitin Kohtri</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: '35%',
                        backgroundColor: '#e9e9e9',
                        borderColor: '#e9e9e9',
                        borderTopEndRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 10,
                    }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.smlimage}
                            source={require('../images/date.png')}
                        />
                        <Text style={styles.smltext}> 10th March 2022</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.smlimage}
                            source={require('../images/time.png')}
                        />
                        <Text style={styles.smltext}> 09:00 - 11:00 am</Text>
                    </View>
                </View>
                <View style={{flexDirection:"row",backgroundColor:"#E5E7E9",marginTop:15,height:55}}>
                    <View style={{  paddingLeft: 10, paddingVertical: 5 ,justifyContent:"center"}}>
                        <Image source={require('../images/warning.png')} style={{height:30,width:30}} />



                    </View>
                    <View style={{justifyContent:"center",paddingLeft:10}}>
                        <Text style={{}}>
                            Problem:
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'poppins-medium',
                                fontSize: 13,
                                color: '#1D4831',
                            }}>
                            Tap Leaking and sink problem
                        </Text>
                    </View>
                </View>
                <View style={{padding:10,flexDirection:"row"}}>
                <Image source={require
                        ('../images/location.png')}  style={{height:30,width:30}}/>
                        <View style={{alignItems:"center",justifyContent:"center",marginLeft:10}}>
                            <Text style={{color:"#3498DB",fontSize:17}}>Delhi,Basungali</Text>
                        </View>
                </View>
                <View>
                    
                </View>

            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    requests: {
        display: 'flex',
        flex: 1

    },
    booking: {
        display: 'flex',
        // height: 200,
        width: '90%',
        alignSelf: 'center',
        borderColor: '#e9e9e9',
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    smlimage: {
        height: 15,
        width: 15,
        marginVertical: 2,
    },
    smltext: {
        fontFamily: 'poppins-regular',
        fontSize: 12,
        color: '#1D4831',
    },
});
