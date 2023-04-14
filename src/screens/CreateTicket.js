import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Modal,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
    Image,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-native-phone-number-input';
import axios from 'axios';
import { useSelector } from 'react-redux';
import angleLeft from '../images/angleLeft.png';
import { CREATE_NEW_TICKET, GET_ALL_SERVICES } from '../utils/endpoints';
import { COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('screen');

export const CreateTicket = ({ navigation }) => {
    const { accessToken, isAuthorized, userData, profileImageUrl } = useSelector(
        state => state.auth,
    );
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({ mode: 'all' });
    const [loader, setLoader] = useState(false);
    const phoneInputRef = useRef(null);
    const alternatePhoneInputRef = useRef(null);
    const [allServices, setAllServices] = useState();
    const [serviceModal, setServiceModal] = useState(false);
    const [serviceProvided, setServiceProvided] = useState();
    const [pin, setPin] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');

    const GET_CITY = async () => {
        console.log(pin);
        try {
            const res = await axios({
                url: `https://api.postalpincode.in/pincode/${pin}`,
            });
            setCity(res.data[0]?.PostOffice[0]?.District);
            setState(res.data[0]?.PostOffice[0]?.State);
            console.log('CITYs', res.data[0]?.PostOffice[0]);
        } catch (error) {
            console.log('GERROR', error);
        }
    };

    const onsubmit = async data => {
        let payload = {
            personal_details: {
                primary_phone: {
                    country_code: '+' + phoneInputRef.current?.getCallingCode(),
                    mobile_number: data?.mobile_number,
                },
                alternate_phone: {
                    country_code: '+' + alternatePhoneInputRef.current?.getCallingCode(),
                    mobile_number: data?.alternate_mobile_number,
                },
                name: data?.name,
            },
            specific_requirement: data.specific_requirement,
            service_provided_for: serviceProvided?._id,
            address_details: {
                house_number: data?.house_number,
                locality: data?.locality,
                city: data?.city,
                state: data?.state,
                pincode: data?.pincode,
                additional_pincode: data?.pincode,
                country: 'INDIA',
            },
            offers_applied: {
                offer_code: data?.offer_code,
            },
        };
        console.log('PAYLOAD', payload)

        setLoader(true);
        try {
            await axios({
                method: 'post',
                url: CREATE_NEW_TICKET,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': accessToken,
                },
                data: payload,
            }).then(res => {
                console.log('This', res?.data);
                ToastAndroid.show(res?.data?.message, ToastAndroid.SHORT);
                setLoader(false);
                navigation.replace('Tab');
            });
        } catch (error) {
            setLoader(false);
            ToastAndroid.show(
                error?.response?.data?.message + '!',
                ToastAndroid.SHORT,
            );
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            const res = await axios.get(GET_ALL_SERVICES);
            setAllServices(res.data.data);
        };
        fetchServices();
    }, []);

    return (
        <>
            <Modal animationType="fade" transparent={true} visible={loader}>
                <View
                    style={{
                        height: height,
                        width: width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }}>
                    <ActivityIndicator animating={loader} size="large" />
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={serviceModal}
                onRequestClose={() => setServiceModal(!serviceModal)}>
                <TouchableOpacity
                    style={{
                        height: height,
                        width: width,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                    }}
                    onPress={() => setServiceModal(!serviceModal)}>
                    <View
                        style={{
                            height: height / 2,
                            width: width / 1.2,
                            backgroundColor: 'white',
                            zIndex: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {allServices ? (
                            <ScrollView>
                                {allServices.map(item => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setServiceProvided(item);
                                            setServiceModal(false);
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                fontFamily: 'poppins-semibold',
                                                padding: 10,
                                                color: COLORS.BLACK,
                                            }}>
                                            {item.service_name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        ) : (
                            <ActivityIndicator
                                animating={!allServices}
                                size="large"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </Modal>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar barStyle="light-content" backgroundColor="#00796A" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                        alignSelf: 'center',
                        marginTop: StatusBar.currentHeight,
                    }}
                    contentContainerStyle={{ alignItems: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image
                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
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
                            Create Ticket
                        </Text>
                    </View>
                    <View style={{ width: '90%' }}>
                        <View>
                            <Text style={styles.headline}>Personal Details</Text>
                            <Text style={styles.labelText}>
                                Name<Text style={styles.star}>*</Text>
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.fullinput}
                                        onBlur={onBlur}
                                        placeholder="Enter Name"
                                        placeholderTextColor={'grey'}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="name"
                                defaultValue=""
                                rules={{
                                    required: true,
                                }}
                            />
                            {errors.name?.type === 'required' && (
                                <Text style={{ color: 'red' }}>Name is required!</Text>
                            )}
                        </View>
                        <View>
                            <Text style={styles.labelText}>
                                Mobile Number<Text style={styles.star}>*</Text>
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <PhoneInput
                                        ref={phoneInputRef}
                                        value={value}
                                        defaultCode="IN"
                                        onChangeText={text => {
                                            onChange(text);
                                        }}
                                        withDarkTheme
                                        withShadow
                                        containerStyle={styles.phoneinput}
                                        textInputProps={{ maxLength: 12 }}
                                    />
                                )}
                                name="mobile_number"
                                defaultValue=""
                                rules={{
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: 'Enter valid phone number!',
                                    },
                                }}
                            />
                            {errors.mobile_number?.type === 'pattern' && (
                                <Text style={{ color: 'red' }}>Enter a valid mobile number!</Text>
                            )}
                            {errors.mobile_number?.type === 'required' && (
                                <Text style={{ color: 'red' }}>Mobile number is required!</Text>
                            )}
                        </View>
                        <View>
                            <Text style={styles.labelText}>Alternate Mobile Number</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <PhoneInput
                                        ref={alternatePhoneInputRef}
                                        value={value}
                                        defaultCode="IN"
                                        onChangeText={text => {
                                            onChange(text);
                                        }}
                                        withDarkTheme
                                        withShadow
                                        containerStyle={styles.phoneinput}
                                        textInputProps={{ maxLength: 12 }}
                                    />
                                )}
                                name="alternate_mobile_number"
                                defaultValue=""
                                rules={{
                                    pattern: {
                                        value: /^[0-9]*$/,
                                        message: 'Enter valid phone number!',
                                    },
                                }}
                            />
                            {errors.alternate_mobile_number?.type === 'pattern' && (
                                <Text style={{ color: 'red' }}>Enter a valid mobile number!</Text>
                            )}
                        </View>
                        <Text style={styles.headline}>Address Details</Text>
                        <View>
                            <Text style={styles.labelText}>
                                Pincode<Text style={styles.star}>*</Text>
                            </Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => {
                                    if (value.length === 6) {
                                        setPin(value)
                                        GET_CITY()
                                    }
                                    return (
                                        <TextInput
                                            style={styles.fullinput}
                                            onBlur={onBlur}
                                            placeholder="Enter Pincode"
                                            placeholderTextColor={'grey'}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                            keyboardType="numeric"
                                        />
                                    )
                                }}
                                name="pincode"
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 6,
                                    maxLength: 6,
                                    pattern: {
                                        value: /^[1-9]{1}[0-9]{2}[0-9]{3}$/,
                                        message: 'Please enter a number',
                                    },
                                }}
                            />
                            {errors.pincode?.type === 'pattern' && (
                                <Text style={{ color: 'red' }}>Enter valid PIN code.</Text>
                            )}
                            {errors.pincode?.type === 'required' && (
                                <Text style={{ color: 'red' }}>Pincode is required.</Text>
                            )}
                            {errors.pincode?.type === 'minLength' && (
                                <Text style={{ color: 'red' }}>Enter valid PIN code.</Text>
                            )}
                            {errors.pincode?.type === 'maxLength' && (
                                <Text style={{ color: 'red' }}>Enter valid PIN code.</Text>
                            )}
                        </View>
                        <View style={styles.halfview}>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.labelText}>
                                    House Number<Text style={styles.star}>*</Text>
                                </Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.halfinput}
                                            onBlur={onBlur}
                                            placeholder="House Number"
                                            placeholderTextColor={'grey'}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                    name="house_number"
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                    }}
                                />
                                {errors.house_number?.type === 'required' && (
                                    <Text style={{ color: 'red' }}>House number is required!</Text>
                                )}
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.labelText}>
                                    Locality<Text style={styles.star}>*</Text>
                                </Text>
                                <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <TextInput
                                            style={styles.halfinput}
                                            onBlur={onBlur}
                                            placeholder="Locality"
                                            placeholderTextColor={'grey'}
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                    name="locality"
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                    }}
                                />
                                {errors.locality?.type === 'required' && (
                                    <Text style={{ color: 'red' }}>Locality is required!</Text>
                                )}
                            </View>
                        </View>

                        <View style={styles.halfview}>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.labelText}>
                                    City<Text style={styles.star}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.halfinput}
                                    //   onBlur={onBlur}
                                    placeholder="City"
                                    placeholderTextColor={'grey'}
                                    onChangeText={city => setCity(city)}
                                    value={city}
                                    editable={city.length == 0 ? false : true}
                                />
                                {/* <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => {
                    if(city.length !== 0){
                      value = city
                      console.log(value)
                    }
                    return(
                    
                  )}}
                  name="city"
                  defaultValue=""
                  rules={{
                      required: city.length == 0 ? false : true
                  }}
                /> */}
                                {errors.city?.type === 'required' && (
                                    <Text style={{ color: 'red' }}>City is required!</Text>
                                )}
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={styles.labelText}>
                                    State<Text style={styles.star}>*</Text>
                                </Text>
                                <TextInput
                                    style={styles.halfinput}
                                    // onBlur={onBlur}
                                    placeholder="State"
                                    placeholderTextColor={'grey'}
                                    onChangeText={state => setState(state)}
                                    value={state}
                                    editable={city.length == 0 ? false : true}
                                />
                                {/* <Controller
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => {
                                        if (state.length !== 0) {
                                            value = state
                                            console.log(value)
                                        }
                                        return (
                   
                  )
                                    }}
                                    name="state"
                                    defaultValue=""
                                    rules={{
                                        required: city.length == 0 ? false : true
                                    }}
                                /> */}
                                {errors.city?.type === 'state' && (
                                    <Text style={{ color: 'red' }}>State is required!</Text>
                                )}
                            </View>
                        </View>

                        <View>
                            <Text style={styles.labelText}>Offer Code</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.fullinput}
                                        onBlur={onBlur}
                                        placeholder="Enter Offer code"
                                        placeholderTextColor={'grey'}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="offer_code"
                                defaultValue="ONIT2023"
                            />
                        </View>
                        <Text style={styles.labelText}>
                            Service Required<Text style={styles.star}>*</Text>
                        </Text>
                        <TouchableOpacity
                            style={[styles.fullinput, { height: 60, justifyContent: 'center' }]}
                            onPress={() => setServiceModal(true)}>
                            <Text
                                style={{
                                    fontSize: 16,
                                    fontWeight: 'bold',
                                    fontFamily: 'poppins-semibold',
                                    color: "black"
                                }}>
                                {serviceProvided?.service_name
                                    ? serviceProvided?.service_name.split('-')[0]
                                    : 'Select'}
                            </Text>
                        </TouchableOpacity>
                        {!serviceProvided && (
                            <Text style={{ color: 'red' }}>Service Type is required!</Text>
                        )}
                        <View>
                            <Text style={styles.labelText}>Requirement Details</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={styles.fullinput}
                                        onBlur={onBlur}
                                        placeholder="Describe Problem"
                                        placeholderTextColor={'grey'}
                                        onChangeText={value => onChange(value)}
                                        value={value}
                                    />
                                )}
                                name="specific_requirement"
                                defaultValue=""
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.btnsize}
                            disabled={!serviceProvided}
                            onPress={handleSubmit(onsubmit)}>
                            <Text style={styles.btn}>Create Ticket</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
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
    btnsize: {
        width: '100%',
        backgroundColor: '#00796A',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 4,
        marginVertical: 20,
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
        color: '#000',
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
        color: '#000',
        paddingHorizontal: 10,
    },
    phoneinput: {
        borderRadius: 4,
        marginVertical: 6,
        width: '100%',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#00796A',
        fontFamily: 'poppins-medium',
        fontSize: 16,
        color: '#000',
    },
    labelText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: 'black',
        marginTop: 10,
    },
    star: {
        color: 'red',
    },
    headline: {
        fontSize: 18,
        fontFamily: 'poppins-semibold',
        color: '#000',
        marginTop: 8,
    },
});
