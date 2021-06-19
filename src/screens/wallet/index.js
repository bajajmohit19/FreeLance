import React, { useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import { ThemedView, Header } from '../../components'
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import { margin } from 'src/components/config/spacing';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';
import InputMobile from 'src/containers/input/InputMobile';
import { Image, Icon } from 'src/components';

function Wallet({ t }) {
    const [state, setState] = useState({
        first_name: '',
        business_contact: '',
        address: '',
        shop_name: '',
        errors: null

    })
    const uploadProfilePic = () => {
        console.log("Upload Image")
    }
    const { first_name, address, shop_name, business_contact } = state
    return (
        <ThemedView isFullView>
            <Header
                leftComponent={<IconHeader />}
                centerComponent={
                    <TextHeader title={'Wallet'} />
                }

            />
            <KeyboardAvoidingView style={styles.keyboard}>
                <ScrollView>
                    <Container>
                        <Text style={styles.wallet}>Wallet</Text>
                        <View style={styles.flex}>
                            <Text style={styles.avaBalColor}>Available Balance ₹0.00 </Text>
                            <View style={styles.arrDown}>
                                <Icon
                                    name="arrow-down"
                                    color={"#000"}
                                    size={15}
                                    onPress={uploadProfilePic}
                                    underlayColor="transparent"
                                />
                            </View>

                        </View>

                        <View style={styles.addMoney}>
                            <Text style={styles.addMoney}>Add Money</Text>
                            <Input
                                label={'₹ Amount'}
                                value={first_name}
                                onChangeText={(value) => setState((prev) => ({ ...prev, value }))}
                            // error={errors && errors.first_name}
                            />


                            <View style={styles.flex}>
                                <Text>Money will be added to </Text>
                                <View style={styles.flex}>
                                    <Icon
                                        color={'blue'}
                                        iconStyle={styles.iconStyle}
                                        name="credit-card"
                                        color={"#000"}
                                        size={15}
                                        onPress={uploadProfilePic}
                                        underlayColor="transparent"
                                    />
                                    <Text style={styles.walletBelow}>Wallet</Text>
                                    <Icon
                                        iconStyle={styles.iconStyle}
                                        name="arrow-down"
                                        color={"#000"}
                                        size={15}
                                        onPress={uploadProfilePic}
                                        underlayColor="transparent"
                                    />
                                </View>

                            </View>
                        </View>



                    </Container>
                </ScrollView>
                <Container>
                    <Button
                        title={'Proceed'}
                        containerStyle={styles.button}
                    // loading={pendingUpdateCustomer}
                    // onPress={this.handleSaveCustomer}
                    />
                </Container>

            </KeyboardAvoidingView>
        </ThemedView>

    )
}
const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
    },
    description: {
        marginVertical: 4,
    },
    button: {
        marginVertical: margin.big,
    },
    wallet :{
        fontSize: 25, fontWeight: "700"
    },
    flex :{
        display:'flex',
        flexDirection:'row'
    },
    avaBalColor: {
        color:'#BDBDBD'
    },
    arrDown : {
        marginTop: 2

    },
    addMoney : {
        marginTop:30
    },
    iconStyle : {
        marginTop: 3
    },
    walletBelow : {

        marginLeft: 3, color: '#95C8D8'
    }
});

export default Wallet
