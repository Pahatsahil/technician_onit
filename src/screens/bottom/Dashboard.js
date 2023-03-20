import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Header} from '../../components/Header';
import {Cards} from '../../components/Cards';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {GET_OPPORTUNITY_IN_YOUR_AREA} from '../../utils/endpoints';
import {COLORS} from '../../utils/constants';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

const {height, width} = Dimensions.get('screen');

const array = [1, 2, 3, 4, 5, 6, 7];
export default function Dashboard({navigation}) {
  const tabBarHeight = useBottomTabBarHeight();
  const {accessToken, userData} = useSelector(state => state.auth);
  const [availableServices, setAvailableServices] = useState();
  //console.log(availableServices);
  console.log(accessToken);

  useEffect(() => {
    const fetchAvailableOpportunity = async () => {
      const res = await axios.get(GET_OPPORTUNITY_IN_YOUR_AREA);
      setAvailableServices(res?.data?.data?.totalData);
    };
    fetchAvailableOpportunity();
  }, []);
  return (
    <View
      style={{
        backgroundColor: COLORS.GREY2,
      }}>
      <Header />
      {/* <View style={styles.services}>
        <View>
          <TouchableOpacity>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={acmin}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.imagetitle}>AC Service</Text>
        </View>

        <View>
          <TouchableOpacity>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={plumberingmin}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.imagetitle}>Plumber</Text>
        </View>

        <View>
          <TouchableOpacity>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../../images/electronics-min.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.imagetitle}>Appliance</Text>
        </View>
        <View>
          <TouchableOpacity>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../../images/cleaning-min.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.imagetitle}>Cleaning</Text>
        </View>

        <View>
          <TouchableOpacity>
            <View style={styles.imageback}>
              <Image
                style={styles.images}
                source={require('../../images/gift-min.png')}
              />
            </View>
          </TouchableOpacity>
          <Text style={styles.imagetitle}>Refer Earn</Text>
        </View>
      </View> */}
      <View
        style={{paddingHorizontal: 10, height: height * 0.83 - tabBarHeight}}>
        <Text style={{fontSize: 20, color: 'black', marginVertical: 10}}>
          Opportunity in your area:
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={availableServices}
          style={{marginVertical: 15}}
          renderItem={({item, index}) => <Cards key={index} data={item} />}
        />
      </View>
      {/* <TouchableOpacity
        style={{
          backgroundColor:"green",
          height:60,
          width:60,
          borderRadius:30,
          position:"absolute",
          bottom:"10%",
          right:15,
          elevation:10,
          justifyContent:"center",
          alignItems:"center"
        }}
        onPress={()=>{}}
      >
        <Image
          source={plus}
          style={{
            resizeMode:"contain",
            height:50,
            width:50,
          }}
        />
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  services: {
    backgroundColor: '#ebebeb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 110,
  },
  images: {
    height: 40,
    width: 40,
  },
  imageback: {
    padding: 10,
    backgroundColor: '#c7ddda',
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  imagetitle: {
    fontSize: 12,
    fontFamily: 'poppins-regular',
    alignSelf: 'center',
    color: '#000',
  },
});
