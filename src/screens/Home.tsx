import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text, Modal, ToastAndroid
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Completed, NewRequest, Pending } from './requesttabs';
import { Header } from '../components/Header';
import axios from 'axios';
import plus from '../images/plus.png';
import {
    GET_ALL_SERVICES,
    GET_NOTIFICATION_TOKEN,
    GET_WALLET_BALANCE,
    TECHNICIAN_PROFILE_PICTURE,
    CREATE_NEW_TECHNICIAN
} from '../utils/endpoints';
import { useDispatch, useSelector } from 'react-redux';

import { setUserData, setWalletBalance } from '../../redux-toolkit/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { setProfileImageUrl } from '../../redux-toolkit/slice';

//9873371012
//9810024941
//8882449931
// 8318187374

const { height, width } = Dimensions.get('screen');
const Tab = createMaterialTopTabNavigator();

const Home = ({ navigation, route }) => {
    const { walletBalance, userId, accessToken, userData, profileImageUrl } = useSelector(
        (state: any) => state.auth,
    );

    const [modalVisible, setModalVisible] = useState(false);
    const [profilePicture, setProfilePicture] = useState();
    const [visible, setVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const [s3ProfileImage, setS3ProfileImage] = useState();
    const [s3aadhaarCardFront, sets3AadhaarCardFront] = useState();
    const [s3aadhaarCardBack, sets3AadhaarCardBack] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchServices = async () => {
            const res = await axios.get(GET_ALL_SERVICES);
        };
        fetchServices();
    }, []);
    useEffect(() => {
        console.log('datassss', userData)
    }, [])
    const onsubmit = async () => {
        console.log('image',s3ProfileImage)
        const payload = {
            personal_details: {
                email: userData?.userDetails?.personal_details?.email,
                about: userData?.work_experience,
                name: userData?.userDetails?.personal_details?.name,
                phone: {
                    country_code: '+91',
                    mobile_number: userData?.userDetails?.personal_details?.phone?.mobile_number
                },
                profile_picture: profileImageUrl,
            },
            // secondary_services:
            //     [{
            //         secondary_services_id: secondaryService._id,
            //         priority: 0
            //     }],
            primary_services: userData?.userDetails?.services?.primary_services?._id,
            service_area_main_pincode: userData?.userDetails?.service_area_main_pincode,
            //service_area_secondary_pincode: [service_area_secondary_pincode],
            address_details_permanent: {
                address_line: userData?.userDetails?.address_details_permanent?.address_line,
                city: userData?.userDetails?.address_details_permanent?.city,
                pincode: userData?.userDetails?.address_details_permanent?.pincode,
                country: 'INDIA',
            },
            engagement_type: 'SALARIED',
            document_details: {
                aadhar_card_document: {
                    front_side: s3aadhaarCardFront?.toString(),
                    back_side: s3aadhaarCardBack?.toString(),
                },
                aadhar_number: userData?.userDetails?.document_details?.aadhar_number,
                pan_number: userData?.userDetails?.document_details?.pan_number,
            },
            referenceDetails: {
                reference_person_name: userData?.userDetails?.referenceDetails?.reference_person_name,
                reference_person_mobile: userData?.userDetails?.referenceDetails?.reference_person_mobile,
            },
        };
        console.log('phone',userData?.userDetails?.services?.primary_services)
        console.log('payload',payload);
        setLoader(true);
        try {
            await axios({
                method: 'post',
                url: CREATE_NEW_TECHNICIAN, 
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
                data: payload,
            }).then(res => {
                console.log('This', res?.data);
                dispatch(setUserData(res?.data?.data))
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT);
                if (res?.status === 200) {
                    navigation.goBack();
                } else {
                    setLoader(false);
                    console.log('ERROR', res)
                }
            });
        } catch (error) {
            setLoader(false);
            console.log('ER', error?.response)
            ToastAndroid.show(
                error?.response?.data?.message + '!',
                ToastAndroid.SHORT,
            );
        }
    };

    const uploadImageForProfilePicture = (uploadType, imageType) => {
        if (uploadType === 'camera') {
            ImagePicker.openCamera({
                height: 400,
                width: 400,
                cropping: true,
                compressImageQuality: 0.7,
            }).then(profilePicture => {
                if (imageType === 'profilePicture') {
                    setProfilePicture(profilePicture);
                    setVisible(false);
                }
            });
        }
    };
    // userData?.userDetails?.personal_details.profile_picture
    // useEffect(() => {
    //     if (!userData?.userDetails?.personal_details.profile_picture) {
    //         setModalVisible(true);
    //     }

    // }, []);
    useEffect(() => {
        if (!profileImageUrl) {
            setModalVisible(true);
            uploadImage();
        }

    }, [profilePicture]);
    const uploadImage = async () => {
        if (profilePicture) {
            setLoader(true);
            var data = new FormData();
            data.append('aadhar', {
                uri: profilePicture.path,
                name: profilePicture.path.split('/').pop(),
                type: profilePicture.mime,
                height: profilePicture.height,
                width: profilePicture.width,
            });
            try {
                const response = await fetch(TECHNICIAN_PROFILE_PICTURE, {
                    method: 'post',

                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Accept: 'application/json',
                    },

                    body: data,
                    mode: 'cors',
                });
                let _data = await response.json();
                // setImageResponse(_data);
                if (_data.status === 200) {
                    // setS3ProfileImage();
                    dispatch(setProfileImageUrl(_data?.data?.fileSavedUrl.toString()))
                    setModalVisible(false)
                    console.log('12333',_data?.data?.fileSavedUrl.toString())
                    onsubmit()
                    setLoader(false);
                    ToastAndroid.show('Image Uploaded successfully!', ToastAndroid.SHORT);
                }
            } catch (error) {
                console.log(error);
                setLoader(false);
                ToastAndroid.show('Error! Please Try again!', ToastAndroid.SHORT);
            }
        } else {
            Alert.alert('Error!', 'Upload Profile Image!');
        }
    };

    useEffect(() => {
        console.log('USERID', userId);
        if (userId) {
            WalletBalanceAPI();
        }
    }, []);

    const WalletBalanceAPI = async () => {
        try {
            let payload = {
                userId: userId,
                // amount: 99
            };
            const res = await axios({
                url: 'https://api.onit.fit/payment/wallet-balance',
                method: 'post',
                headers: {
                    'x-access-token': accessToken,
                },
                data: payload,
            });
            if (res) {
                console.log('DATA_BALANCE', res.data);
                dispatch(setWalletBalance(res.data.wallet_balance));
            } else {
                console.log('ERROR BALANCE', res.error);
            }
        } catch (error) {
            console.log('ERROR', error);
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header />
            {/* <Image
                style={{ height: 120, width: 120 }}
                source={{ uri: profileImageUrl }}
            /> */}
            <View>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    style={styles.modal_style}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modal_view}>
                        <View style={styles.modal_view2}>
                            <Text>First!</Text>
                            <Text>You have to add profile picture</Text>
                            <Image
                                style={styles.upload_image}
                                source={require('../images/upload.png')}
                            />
                            <TouchableOpacity
                                style={styles.modal_button}
                                onPress={() =>
                                    uploadImageForProfilePicture('camera', 'profilePicture')
                                }>
                                <Text style={styles.modal_text}>Open Camera</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={styles.modal_button}
                                onPress={() =>
                                    uploadImageForProfilePicture('gallery', 'profilePicture')
                                }>
                                <Text style={styles.modal_text}>Select Image from gallery</Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </Modal>
            </View>
            <View style={{ height: height * 0.76 }}>
                <TopBar />
                <TouchableOpacity
                    style={{
                        backgroundColor: '#00796A',
                        height: 60,
                        borderRadius: 30,
                        position: 'absolute',
                        bottom: height * 0.003,
                        right: '5%',
                        elevation: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 18,
                    }}
                    onPress={() => navigation.navigate('CreateTicket')}>
                    <Image
                        source={plus}
                        style={{
                            resizeMode: 'contain',
                            height: 50,
                            width: 50,
                        }}
                    />
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
                        Create Request
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

function TopBar() {
    const { userData } = useSelector(state => state.auth);
    console.log('reds', userData?.userDetails?.is_technician_admin);
    return (
        <Tab.Navigator
            initialRouteName="NewRequest"
            screenOptions={{
                tabBarIndicatorStyle: { backgroundColor: '#00796A', height: 2 },
                tabBarActiveTintColor: '#00796A',
                tabBarInactiveTintColor: '#000000',
                tabBarPressColor: 'transparent',
                tabBarLabelStyle: {
                    fontSize: 14,
                    textTransform: 'capitalize',
                    fontFamily: 'poppins-regular',
                },
                tabBarContentContainerStyle: { marginVertical: 4 },
                swipeEnabled: true,
            }}>
            {userData?.userDetails?.is_technician_admin && (
                <Tab.Screen
                    name="NewRequest"
                    component={NewRequest}
                    options={{ tabBarLabel: 'New Request' }}
                />
            )}
            <Tab.Screen
                name="Pending"
                component={Pending}
                options={{ tabBarLabel: 'Pending' }}
            />
            <Tab.Screen
                name="Completed"
                component={Completed}
                options={{ tabBarLabel: 'Completed' }}
            />
        </Tab.Navigator>
    );
}

export default Home;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
    },
    header: {
        flex: 0.6,
        flexDirection: 'row',
        marginHorizontal: 16,
        alignItems: 'center',
    },

    profile: {
        width: 42,
        height: 42,
    },
    padding: {
        marginHorizontal: 10,
    },
    nav_image: {
        height: 20,
        width: 20,
        alignSelf: 'center',
        marginVertical: 5,
    },
    nav_text: {
        fontSize: 10,
        fontFamily: 'poppins-medium',
        color: '#00796a',
        alignSelf: 'center',
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
});
