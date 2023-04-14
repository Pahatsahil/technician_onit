import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
    Keyboard,
    Modal,
    TouchableNativeFeedback,
    StatusBar,
    Image,
    TouchableOpacity,
    ToastAndroid,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MultiSelect from 'react-native-multiple-select';
// import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import { TextInput } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import { Controller, useForm } from 'react-hook-form';
// import DatePicker from 'react-native-date-picker';
import { LogBox } from 'react-native';
import cross from '../images/cross.png';
import axios from 'axios';
import PhoneInput from 'react-native-phone-number-input';
import { COLORS } from '../utils/constants';
import {
    AADHAR_BACK_IMAGE,
    AADHAR_FRONT_IMAGE,
    CREATE_NEW_TECHNICIAN,
    GET_ALL_SERVICES,
    TECHNICIAN_PAN_CARD,
    TECHNICIAN_PROFILE_PICTURE,
} from '../utils/endpoints';
import DateTimePicker from 'react-native-modal-datetime-picker';
LogBox.ignoreLogs(['VirtualizedLists']);

const { width, height } = Dimensions.get('window');

const SearchTecnician = () => {


  











    return (
        <>







            <ScrollView showsVerticalScrollIndicator={false}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <StatusBar barStyle="light-content" backgroundColor="#00796A" />
                    <View
                        style={{
                            width: '90%',
                            alignSelf: 'center',
                            marginTop: StatusBar.currentHeight,
                        }}>
                        <Text
                            style={{
                                fontFamily: 'poppins-semibold',
                                color: '#000',
                                fontSize: 20,
                                marginTop: 20,
                                marginVertical: 10,
                            }}>
                            Add New Technician
                        </Text>
                        <View
                            style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <View style={{ width: '48%' }}>

                                <TextInput
                                    placeholderTextColor={COLORS.LIGHT_BORDER}
                                    style={[styles.fullinput]}
                                   
                                    placeholder="Name"
                                    
                                    
                                    autoCapitalize="characters"
                                />

                                
                            </View>




                        </View>
                        <View style={styles.halfview}>



                        </View>

                        <View style={{ width: '90%' }}>
                           
                                    <TextInput
                                        placeholderTextColor={COLORS.LIGHT_BORDER}
                                        style={[styles.fullinput]}
                                      
                                        placeholder="Search"


                                        autoCapitalize="characters"
                                    />
                               

                        </View>
                        <View style={{ flexDirection: "row" }}>


                            <View style={{ width: '48%', marginLeft: 10, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TouchableOpacity style={{ width: '100%', borderWidth: 1, alignItems: "center", height: 60, justifyContent: "center" }} >
                                    <Text>
                                        Contract
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{ width: '48%', marginLeft: 10, justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <TouchableOpacity style={{ width: '100%', borderWidth: 1, alignItems: "center", height: 60, justifyContent: "center" }} >
                                    <Text>
                                        Sallary
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                        <View style={{ width: '100%', alignSelf: 'center' }}>
                            {/* Aadhaar Card */}



                            <View style={{ height: 20 }}></View>
                        </View>

                        <TouchableNativeFeedback
                          

                        >
                            <View
                                style={{
                                    width: '100%',
                                    backgroundColor: '#00796A',
                                    borderRadius: 4,
                                }}>
                                <Text style={styles.btn}>Sumbit</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={{ height: 10 }}></View>
                    </View>


                </SafeAreaView>
            </ScrollView>
        </>
    );
}

export default SearchTecnician

const styles = StyleSheet.create({
    picture: {
        height: 75,
        width: 75,
        borderRadius: 10,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    halfinput: {
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#00796A',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: COLORS.BLACK,
        paddingHorizontal: 10,
    },
    fullinput: {
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        height: 60,
        borderWidth: 1,
        borderColor: '#00796A',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: COLORS.BLACK,
        paddingHorizontal: 10,
    },
    headline: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: '#000',
        marginTop: 25,
    },
    star: {
        color: 'red',
    },
    halfview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        alignSelf: 'center',
        paddingVertical: 14,
    },
    modal_style: {
        height: height / 2,
        width: width / 2,
    },
    modal_view: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_view2: {
        height: height / 3,
        width: width / 1.5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_button: {
        marginBottom: 5,

        padding: 10,
    },
    modal_text: {
        paddingBottom: 5,
        fontSize: 15,
        color: '#006ee6',
    },
    upload_image: {
        height: 15,
        width: 15,
        marginBottom: 5,
        padding: 15,
    },
    selectedTextStyle: {
        height: 50,
        borderColor: 'gray',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width: '100%',
        color: 'black',
        fontSize: 20,
        paddingLeft: 10,
        marginTop: -2,
    },
    selectedTextStyle1: {
        height: 50,
        borderColor: 'gray',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        width: '100%',
        color: 'black',
        fontSize: 20,
        paddingLeft: 10,
        marginTop: 15,
    },
    listTextStyle: {
        color: '#000',
        marginVertical: 10,
        flex: 0.9,
        marginLeft: 20,
        marginHorizontal: 10,
        textAlign: 'left',
    },
    searchBarStyle: {
        marginBottom: 10,
        flexDirection: 'row',
        height: 40,
        shadowRadius: 1,
        shadowOpacity: 1.0,
        borderWidth: 1,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        borderColor: '#303030',
        shadowColor: '#303030',
        borderRadius: 5,
        elevation: 1,
        marginHorizontal: 10,
    },
    placeHolderTextStyle: {
        color: 'red',
        padding: 10,
        textAlign: 'left',
        width: '99%',
        flexDirection: 'row',
    },
    dropDownIconStyle: {
        width: 10,
        height: 10,
        left: -40,
        // marginTop: 20,
    },
    dropDownIconStyle1: {
        width: 10,
        height: 10,
        left: -40,
        marginTop: 15,
    },
    pickerStyle: {
        shadowRadius: 0.5,
        shadowOpacity: 0.5,
        borderWidth: 0.5,
        shadowOffset: {
            width: 0.5,
            height: 0.5,
        },
        height: 60,
        borderColor: '#303030',
        shadowColor: '#303030',
        borderRadius: 2,
        elevation: 0.5,
    },
    pickerStyle1: {
        height: 60,
        borderBottomColor: 'dodgerblue',
        borderBottomWidth: 2,
    },
    headline: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: '#000',
        marginTop: 25,
    },
    star: {
        color: 'red',
    },
    halfview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        alignSelf: 'center',
        paddingVertical: 14,
    },
    uploadbox: {
        backgroundColor: '#F1F1F1',
        height: 88,
        width: '48%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        flexDirection: 'row',
    },
    uploadtext: {
        fontFamily: 'poppins-regular',
        color: '#000',
    },
    upload: {
        height: 15,
        width: 15,
        marginHorizontal: 10,
    },
    pan_upload: {
        marginTop: 10,
        height: 88,
        width: '100%',
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    modal_style: {
        height: height / 2,
        width: width / 2,
    },
    modal_view: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_view2: {
        height: height / 3,
        width: width / 1.5,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal_button: {
        marginBottom: 5,
        borderBottomWidth: 0.5,
        padding: 10,
    },
    modal_text: {
        paddingBottom: 5,
        fontSize: 15,
        color: '#006ee6',
    },
    upload_image: {
        height: 15,
        width: 15,
        marginBottom: 5,
        padding: 15,
    },
})