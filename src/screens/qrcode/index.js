import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import QrCode from 'react-native-qrcode-svg';
import QrCode from 'react-native-qrcode-image';
import { ThemedView, Header } from '../../components'
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';


function QRCode() {
    return (
        <ThemedView isFullView>
            <Header
                leftComponent={<IconHeader />}
                centerComponent={
                    <TextHeader title={'QR-Code'} />
                }

            />
            <Container>
                <View style={styles.view}>
                    <QrCode
                        value="http://awesome.link.qr"
                        size={200}
                        bgColor='#FFFFFF'
                        fgColor='#000000'
                    />
                    <Text style={styles.email}>love1234@gmail.com</Text>
                    <View style={styles.detailView}>
                        <Text style={styles.name}>
                            Love Behl
                        </Text>
                        <View style={styles.number}>
                            <Text>
                                love1234@gmail.com
                        </Text>
                            <Text>
                                +91 9999999999
                        </Text>
                        </View>

                    </View>

                </View>
            </Container>
        </ThemedView>

    )
}
const styles = StyleSheet.create({
    view :{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:50, alignContent:'center'
    },
    email :{
        marginTop: 10, fontSize: 16 
    },
    detailView : {
        display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', marginTop: 12
    },
    name : {
        fontSize: 22, fontWeight: "700" 
    },
    number : {
        marginTop:8, alignItems:'center'
    }
})

export default QRCode
