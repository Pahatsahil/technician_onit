import React from 'react'
import { Image, ScrollView, StatusBar, Text, View } from 'react-native'
import text from '../document/Text'
import { COLORS } from '../utils/constants'

const TermsCondition = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                marginTop: StatusBar.currentHeight + 30,
                backgroundColor: COLORS.GREY2,
            }}
        >
            <StatusBar
                backgroundColor="#00796A"
                barStyle="dark-content"
            />
            <View
                style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center"
                }}
            >
                <Image
                    source={require("../images/logo.png")}
                    style={{
                        width: "100%",
                        height: 60,
                        resizeMode: "contain",
                        marginVertical: 20
                    }}
                />
                <Text
                    style={{
                        fontFamily: 'poppins-semibold',
                        fontWeight: "bold",
                        fontSize: 22,
                        color:"black"
                    }}
                >
                    Terms & <Text style={{ color:"#00796A"}}>
                        Conditions
                    </Text>
                </Text>
                <Text
                    style={{
                        fontFamily: 'poppins-semibold',
                        fontWeight: "bold",
                        color: COLORS.BLACK,
                        fontSize: 15
                    }}
                >
                    {text}
                </Text>
            </View>
        </ScrollView>
    )
}

export default TermsCondition