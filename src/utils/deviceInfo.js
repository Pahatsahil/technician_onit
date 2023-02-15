import { getUniqueId, getManufacturer } from 'react-native-device-info';


export const deviceInfo = async () => {
    const deviceID = await getUniqueId();

    return deviceID;
}