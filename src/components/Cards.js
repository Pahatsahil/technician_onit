import {View, Text, StyleSheet, Image} from 'react-native';
import React,{useEffect,useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import acmin from '../images/ac-min.png';
import plumberingmin from '../images/plumbering-min.png';
import {COLORS} from '../utils/constants';
import axios from 'axios';

export const Cards = ({data,_id}) => {
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
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.images} 
        source={require('../images/electronics-min.png')}
        // source={
        //    availableServices[0]._id==='63b9162bfa46443c582e1940'?(require("../images/electronics-min.png"))
        //    : availableServices[1]._id === '637b7ab07c7cd9e139b39d2c'
        //            ? require("../images/faq.png"):null
        // } 
        // source={
        //     availableServices[0]._id === '63b9162bfa46443c582e1940'
        //         ? require("../images/electronics-min.png"):null
                // : availableServices[1]._id === '637b7a4b7c7cd9e139b39d25'
                //     ? require("../images/electronics-min.png")
                //     : availableServices[2]._id === '637b7a0e7c7cd9e139b39d1e'
                //         ? require("../images/electronics-min.png")
                //         : availableServices[3]._id === '637b79cd7c7cd9e139b39d17'
                //             ? require("../images/electronics-min.png"):null
                            // : service._id === '637b79cd7c7cd9e139b39d17'
                            //     ? require("../images/electronics-min.png")
                            //     : service._id === '637b7a0e7c7cd9e139b39d1e'
                            //         ? require("../../assets/logo/plmber.png")
                            //         : service._id === '637b7ab07c7cd9e139b39d2c'
                            //             ? require("../../assets/logo/homecare.png")
                            //             : service._id === '637b76f47c7cd9e139b39d02'
                            //                 ? require("../../assets/logo/elc.png")
                            //                 : service._id === '63b9162bfa46443c582e1940'
                            //                     ? require('../../assets/logo/homecare.png')
                            //                     : require("../../assets/logo/elc.png")
        // }
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
        <Text style={{color: COLORS.BLACK}}>No. of Tickets available:</Text>
        <View style={styles.alltext}>
          <Text style={{color: COLORS.BLACK}}>
            {data.no_of_tickets_available}
          </Text>
        </View>
      </View>
      <View style={styles.box2}>
        <Text style={{color: COLORS.BLACK}}>No. of Pending Tickets:</Text>
        <View style={styles.alltext}>
          <Text style={{color: COLORS.BLACK}}>
            {data.no_of_pending_tickets}
          </Text>
        </View>
      </View>
      <View style={styles.box2}>
        <Text style={{color: COLORS.BLACK}}>No. of Technicians:</Text>
        <View style={styles.alltext}>
          <Text style={{color: COLORS.BLACK}}>{data.no_of_technicians}</Text>
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
