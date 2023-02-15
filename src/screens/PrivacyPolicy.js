import React from 'react';
import { Linking, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';


const PrivacyPolicy = () => {
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
                translucent
            />
            <View
                style={{
                    width: "90%",
                    alignSelf: "center",
                    alignItems: "center"
                }}
            >
                <Text
                    style={{
                        fontFamily: 'poppins-semibold',
                        fontWeight: "bold",
                        fontSize: 28,
                        marginBottom:24
                    }}
                >
                    Privacy <Text style={{ color: "#00796A" }}>
                        Policy
                    </Text>
                </Text>
                <Text
                    style={styles.contentText}
                >
                    This Privacy Policy tells how information is gathered, used, and disclosed by OniT Services , a platform for services by Affordable Deals India Private Limited ("OniT", "we", or "us") when you use our websites, mobile applications, or other online services (collectively, the "Services").
                    Please read this Privacy Policy carefully. If you have any queries regarding our privacy practices, please contact us at <Text style={{ color:"#00796A"}}>help@onit.services</Text>. OniT services and affiliates (“OniT”) provide an online platform that connects Service Professionals (such as plumbers, electricians, carpenters, painters, etc.) with Customers seeking such services.
                </Text>
                <Text
                style={styles.labelText}
                >
                    Background and Key Information
                </Text>
                <Text style={styles.contentText}>
                    When you use our services, we accumulate the following types of information from or about you: Personal Information You Provide to Us. We gather personal data from you when you: (1) register for an OniT account; (2) log in to your OniT account; (3) provide information in your OniT account profile; (4) request or book a service through our Services; (5) contact us with questions or feedback; and/or (6) provide us with reviews or other feedback about Service Professionals.
                    The personal information we collect from you may include:{"\n"}{"\n"}
                    • Name{"\n"}
                    • Email address{"\n"}
                    • Postal code{"\n"}
                    • Phone number{"\n"}
                    • Payment information (including credit card information){"\n"}
                    • Information about the services you requested or booked through our Services; and/or{"\n"}
                    Any other personal information you select to provide.{"\n"}{"\n"}
                    If you book a service through our Services, we will also collect the following additional information from or about you:{"\n"}{"\n"}
                    • Service address{"\n"}
                    • Service date and time{"\n"}
                    • Description of the service requested{"\n"}
                    • Information about any promotions you redeem{"\n"}
                    In addition, when you use our services, we automatically collect the following types of information: Usage Information. We collect information about your interactions with our Services, such as the pages or other content you view, your searches for Service Professionals, and bookings you make through our Services.
                    {"\n"}{"\n"}Location Information. We may collect precise geolocation information from your device when you use certain features of our Services. For example, we may collect and use your device’s geolocation to improve the quality of search results when you use our Services to look for Service Professionals near you. To stop us from collecting precise geolocation information from your device at any time, please follow the standard process for disabling such features on your mobile device.
                    {"\n"}{"\n"}Device Information. We accumulate data regarding the mobile device or computer you use to access our services, such as the hardware model, operating system and version, unique device identifiers, mobile network information, and browser type.
                    {"\n"}{"\n"}Information Collected by Cookies and Other Tracking Technologies. We use various technologies to collect information from your device and your interactions with our Services. This may include sending cookies to your device.
                </Text>
                <Text
                    style={styles.labelText}
                >
                    How Do We Collect Personal Data?
                </Text>
                <Text style={styles.contentText}>
                    We collect data in the following ways:{"\n"}{"\n"}
                    Directly from you: For instance, when you sign up for an account or book a service through our Services.
                    {"\n"}• Automatically: We automatically gather specific information about you and your device when you use our Services, as described above.
                    {"\n"}• Description of the service requested
                    {"\n"}• From third parties: We may receive data about you from third parties. For example, if you book a service through our Services, we will collect your payment information from our payment processor.
                </Text>
                <Text
                    style={styles.labelText}
                >
                    How Do We Use Information?
                </Text>
                <Text style={styles.contentText}>
                    We collect the information for the following purposes:{"\n"}
                    {"\n"}• To provide and improve our Services: We use the information we collect to provide, operate, and improve our services.
                    {"\n"}• To communicate with you: We use the information we collect to communicate about our Services, bookings, and payments. For example, we may send you emails or push notifications about your account or a booking you have made.
                    {"\n"}• For billing and payments: We use the information we collect to process your bookings and payments.
                    {"\n"}• To detect, prevent, and respond to fraud or other illegal activities: We use the information we collect (including from third parties) to detect, prevent, and respond to fraud, abuse, security risks, and technical issues.
                    {"\n"}• For customer support: We use the information we collect to provide you with customer support, including responding to your requests or complaints.
                    {"\n"}• To enforce our terms and conditions: We use the information we collect to enforce our Terms of Service and other policies.
                    {"\n"}• For research and development: We use the information we collect for our own research and development purposes, such as to develop new products and features and to improve our Services.
                    {"\n"}• For marketing: We use the information we collect to send you marketing communications, including information about our Services, special offers, and promotions. .
                </Text>
                <Text
                style={styles.labelText}
                >
                    For more information visit:{"\n"}<Text style={{ color:"#00796A", textDecorationLine: "underline"}} onPress={() => Linking.openURL("https://app.onit.services/privacy-policy") }>https://app.onit.services/privacy-policy</Text>
                </Text>
            </View>
        </ScrollView>
    )
}

export default PrivacyPolicy


const styles = StyleSheet.create({
    labelText: {
        fontFamily: 'poppins-semibold',
        fontWeight: "bold",
        fontSize: 18,
        marginVertical:12,
        alignSelf:"flex-start"
    },
    contentText: {
        fontFamily: 'poppins-semibold',
        fontWeight: "bold",
        fontSize: 16,
        letterSpacing: 0.3
    }
})