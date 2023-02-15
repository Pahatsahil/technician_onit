import React from 'react'
import { Image, Linking, ScrollView, StatusBar, Text, View } from 'react-native'

const AboutUs = () => {
  return (
      <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
              marginTop: StatusBar.currentHeight + 30
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
                      fontSize: 22
                  }}
              >
                  About <Text style={{ color: "#00796A" }}>
                      us
                  </Text>
              </Text>
              <Text
                  style={{
                      fontFamily: 'poppins-semibold',
                      fontWeight: "bold",
                      fontSize:16
                  }}
              >
                  Throughout our journey we have worked with various renounced brands with deep penetration in India and hence we know exactly what the customer needs.
                  This journey was started in 2016 and recently, ADPL has been the first company to get authorisation from Apple for their repair services as IRP.
                  We are a team of service professionals spread across the country and working towards building a quick, easy and affordable place for all the home services needs.
                  An ISO 9001:2015 certified organization "Affordable Deals Private Limited" was established in the year 2016. We are registered in the Start-up India program launched by the Honorable Prime minister Of India.
                  ADPL also comes under MSME of the Government of India. ADPL has established itself across the consumer world as an Organization which makes any Service, buying/purchase affordable for a customer, backed with core values like Integrity, Ethics and Reliability.
                  {"\n"}{"\n"}Learn more on:{"\n"}<Text style={{ color: "#00796A", textDecorationLine: "underline" }} onPress={() => Linking.openURL("https://www.onit.services/")}>https://www.onit.services</Text>
              </Text>
          </View>
      </ScrollView>
  )
}

export default AboutUs