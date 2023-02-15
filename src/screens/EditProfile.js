import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Dimensions, Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux-toolkit/slice';
import { Header } from '../components/Header';
import angleLeft from '../images/angleLeft.png'
import { GET_USER_DETAILS, UPDATE_TECHNICIAN } from '../utils/endpoints';

const { width, height } = Dimensions.get('screen');

const EditProfile = ({ navigation }) => {
    const { accessToken, isAuthorized, userData, profileImageUrl } = useSelector((state) => state.auth);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: "all" });
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch()
    console.log(userData.userDetails.service_area_main_pincode)
    // console.log(accessToken)

    const onSubmit = async (data) => {
        console.log(data)

        if (data.email !== "") {
            setLoader(true)
            let payload = {
                "personal_details": {
                    email: data?.email
                },
                // upi_id: data?.upi_id
            }
            try {
                await axios({
                    method: "post",
                    url: UPDATE_TECHNICIAN,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': accessToken
                    },
                    data: payload,
                }).then((res) => {
                    console.log("This", res?.data)
                    ToastAndroid.show("Profile Updated!", ToastAndroid.SHORT);
                    if (res?.status === 200) {
                        try {
                            axios({
                                method: "get",
                                url: GET_USER_DETAILS,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'x-access-token': accessToken
                                },
                            }).then(res => {
                                dispatch(setUserData(res?.data?.data));
                                setLoader(false)
                                navigation.replace("Tab")
                            })
                        } catch (err) {
                            setLoader(false)
                            ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
                            navigation.goBack()
                        }
                    } else {
                        setLoader(false)
                    }
                }
                )
            } catch (error) {
                setLoader(false);
                ToastAndroid.show("Something went wrong!", ToastAndroid.SHORT);
            }
        } else {
            ToastAndroid.show("Nothing to update!", ToastAndroid.SHORT);
        }

    }
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={loader}>
                <View style={{ height: height, width: width, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }}>
                    <ActivityIndicator animating={loader} size="large" />
                </View>
            </Modal>
            <View
                style={{ flexDirection: "row", width: "100%", backgroundColor: '#00796A', alignItems: "center", height: 50, marginTop: StatusBar.currentHeight }}
            >
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        style={{ height: 40, width: 40, resizeMode: "contain" }}
                        source={angleLeft}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: 'poppins-semibold',
                        color: '#000',
                        fontSize: 20,
                        marginVertical: 10,
                    }}>
                    Edit Profile
                </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 20, backgroundColor: '#00796A', paddingBottom: 16 }}>
                <View>
                    <Image
                        style={{ height: 120, width: 120 }}
                        source={{ uri: profileImageUrl }}
                    />
                </View>
                <View style={{ paddingLeft: 20, flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, color: 'white' }}>{userData?.userDetails?.center_id[0]?.center_name}</Text>
                    <Text style={{ fontSize: 16, color: 'white', paddingBottom: 10 }}>
                        {userData.userDetails?.personal_details?.phone?.country_code}
                        {" " + userData.userDetails?.personal_details?.phone?.mobile_number}
                    </Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    width: "90%",
                    alignSelf: "center",
                    paddingTop: 16
                }}
                contentContainerStyle={{
                    alignItems: "center",
                    paddingBottom: 20
                }}
            >
                <Text
                    style={styles.sectionHeader}
                >
                    Contact Details
                </Text>
                <TextInput
                    editable={false}
                    defaultValue={userData.userDetails?.personal_details?.phone?.country_code + " " + userData.userDetails?.personal_details?.phone?.mobile_number}
                    style={styles.fullinput}
                    placeholder='Phone Number'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                />
                {/* <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.fullinput, { backgroundColor: "#fff" }]}
                            onBlur={onBlur}
                            defaultValue={userData.userDetails?.personal_details?.email}
                            placeholder='Enter UPI ID'
                            placeholderTextColor='grey'
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            keyboardType='email-address'
                        />
                    )}
                    name="upi_id"
                    defaultValue={userData.upi_id || ""}
                /> */}
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={[styles.fullinput, { backgroundColor: "#fff" }]}
                            onBlur={onBlur}
                            placeholder='Email Address'
                            onChangeText={(value) => onChange(value)}
                            value={value}
                            keyboardType='email-address'
                            autoCapitalize="characters"
                        />
                    )}
                    name="email"
                    defaultValue={userData.userDetails?.personal_details?.email.toUpperCase() || ""}
                    rules={{
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Please enter your email address',
                        }
                    }}
                />
                {errors.email?.type === "pattern" && <Text style={{ color: "red", alignSelf: "flex-start" }}>Enter a valid email</Text>}

                {/* <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.fullinput, { backgroundColor: "#fff" }]}
                      onBlur={onBlur}
                      placeholder="Enter your valid UPI ID"
                      placeholderTextColor={"grey"}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      editable={!userData?.upi_id ? true : false}
                      defaultValue={userData?.upi_id?.toUpperCase() || ""}
                      keyboardType="email-address"
                    />
                  )}
                  name="upi_id"
                  defaultValue=""
                  rules={{
                    pattern: {
                      value: /[a-zA-Z0-9\.\-]\@[a-zA-Z][a-zA-Z]/,
                      message: 'Please enter a number',
                    }
                  }}
                />
                {errors.upi_id?.type === "pattern" && (
                  <Text style={{ color: "red", alignSelf: "flex-start"  }}> Enter valid UPI ID</Text>
                )} */}

                <Text
                    style={styles.sectionHeader}
                >
                    Address Details
                </Text>
                <TextInput
                    editable={false}
                    style={styles.fullinput}
                    defaultValue={userData?.userDetails?.address_details_permanent?.address_line.toUpperCase()}
                    placeholder='Address Line 1'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                    maxLength={50}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingTop: 10
                    }}
                >
                    <TextInput
                        editable={false}
                        style={styles.halfinput}
                        defaultValue={userData?.userDetails?.address_details_permanent?.city.toUpperCase()}
                        placeholder='City'
                        placeholderTextColor='black'
                        keyboardType='name-phone-pad'
                        maxLength={50}
                    />
                    <TextInput
                        editable={false}
                        style={styles.halfinput}
                        defaultValue={userData?.userDetails?.address_details_permanent?.pincode.toUpperCase()}
                        placeholder='Pincode'
                        placeholderTextColor='black'
                        keyboardType='name-phone-pad'
                    />
                </View>
                <Text
                    style={styles.sectionHeader}
                >
                    Service Details
                </Text>
                <Text
                    style={styles.sectionSubHeader}
                >
                    Primary Service
                </Text>
                <TextInput
                    editable={false}
                    style={styles.fullinput}
                    defaultValue={userData?.userDetails?.services?.primary_services?.service_name.toString().split("-")[0]}
                    placeholder='Primary Service'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                />
                {
                    userData?.userDetails?.services?.secondary_services[0]?.secondary_services_id?.service_name &&
                    <>
                        <Text
                            style={styles.sectionSubHeader}
                        >
                            Secondary Service
                        </Text>
                        <TextInput
                            editable={false}
                            style={styles.fullinput}
                            defaultValue={userData?.userDetails?.services?.secondary_services[0]?.secondary_services_id?.service_name.toString().split("-")[0]}
                            placeholder='Secondary Service'
                            placeholderTextColor='black'
                            keyboardType='name-phone-pad'
                        />
                    </>

                }
                <Text
                    style={styles.sectionSubHeader}
                >
                    Service Area Pincode
                </Text>
                <TextInput
                    editable={false}
                    style={styles.fullinput}
                    defaultValue={userData?.userDetails?.service_area_main_pincode?.toUpperCase()}
                    placeholder='Service area Pincode'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                />
                <Text
                    style={styles.sectionHeader}
                >
                    Document Details
                </Text>
                <TextInput
                    editable={false}
                    style={styles.fullinput}
                    defaultValue={userData?.userDetails?.document_details?.aadhar_number.toUpperCase()}
                    placeholder='Aadhar number'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                />
                <TextInput
                    editable={false}
                    style={styles.fullinput}
                    defaultValue={userData?.userDetails?.document_details?.pan_number}
                    placeholder='PAN number'
                    placeholderTextColor='black'
                    keyboardType='name-phone-pad'
                />
                <Text
                    style={styles.sectionSubHeader}
                >
                    Aadhar card Front & Back Image
                </Text>
                <View
                    style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                        marginBottom: 16
                    }}
                >
                    <Image
                        style={{ width: '48%', height: 120, borderRadius: 10 }}
                        source={{
                            uri: userData?.userDetails?.document_details?.aadhar_card_document?.front_side,
                        }}
                        resizeMode='cover'
                    />
                    <Image
                        style={{ width: '48%', height: 120, borderRadius: 10 }}
                        source={{
                            uri: userData?.userDetails?.document_details?.aadhar_card_document?.back_side,
                        }}
                        resizeMode='cover'
                    />
                </View>
                <Text
                    style={styles.sectionSubHeader}
                >
                    PAN card Image
                </Text>
                <Image
                    style={{ width: '100%', height: 120, borderRadius: 10 }}
                    source={{
                        uri: userData?.userDetails?.document_details?.pan_card_document,
                    }}
                    resizeMode='cover'
                />
                <Text
                    style={styles.sectionSubHeader}
                >
                    Certificate
                </Text>
                <Image
                    style={{ width: '100%', height: 120, borderRadius: 10 }}
                    source={{
                        uri: userData?.userDetails?.personal_details?.company_worked_with,
                    }}
                    resizeMode='cover'
                />

                <TouchableOpacity onPress={handleSubmit(onSubmit)} style={{ width: '100%', backgroundColor: '#00796A', borderRadius: 4, marginTop: 20 }}>
                    <Text style={styles.btn}>Update Profile</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default EditProfile;

const styles = StyleSheet.create({
    btn: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        alignSelf: 'center',
        paddingVertical: 14,
    },
    upload: {
        // height: 15,
        width: "100%",
        marginHorizontal: 10,
    },
    button: {
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft: 20,
        paddingRight: 20,
        width: width,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    font: {
        fontSize: 16,
        paddingLeft: 20
    },
    buttonBorder: {
        borderRadius: 5,
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10,
        width: width / 2,
        backgroundColor: '#00796A',
        borderWidth: 1,
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderBottomColor: 'white'
    },
    halfinput: {
        backgroundColor: "grey",
        borderRadius: 4,
        marginTop: 10,
        width: '45%',
        height: 60,
        borderWidth: 1.5,
        borderColor: '#00796A',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    fullinput: {
        backgroundColor: "grey",
        borderRadius: 4,
        marginTop: 10,
        width: '100%',
        height: 60,
        borderWidth: 1.5,
        borderColor: '#00796A',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: '#000',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    sectionHeader: {
        alignSelf: "flex-start",
        fontFamily: 'poppins-semibold',
        fontSize: 18,
        color: '#000',
    },
    sectionSubHeader: {
        alignSelf: "flex-start",
        fontFamily: 'poppins-semibold',
        fontSize: 16,
        color: '#000',
        paddingTop: 10
    },
});