import { View, Text, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import profile from "../../images/profile.png"
const { height, width } = Dimensions.get("screen");


const center = [
    {
        uri: profile,
        name: "Jullian Dasilva",
        message: "Hi Julani See you after work"
    },
    {
        uri: profile,
        name: "Jullian Dasilva",
        message: "Hi Julani See you after work"
    },

]
export default function Consumer() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 4 }}>
                <View style={styles.chatbox}>
                    <FlatList showsVerticalScrollIndicator={false}
                        data={center}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.button} >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <View>
                                        <Image
                                            style={{ height: 50, width: 50, borderRadius: 50 }}
                                            source={item.uri}
                                        />
                                    </View>
                                    <View style={{}}>
                                        <Text style={styles.font}>{item.name}</Text>
                                        <Text style={styles.chatfont}>{item.message}</Text>
                                    </View>
                                </View>
                                <Text>Nov</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({


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
        paddingLeft: 20,
        fontWeight: 'bold'
    },
    chatfont: {
        fontSize: 14,
        paddingLeft: 20
    }

});
