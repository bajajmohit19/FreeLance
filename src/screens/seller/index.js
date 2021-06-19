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

function Seller({ t }) {
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
                    <TextHeader title={'Become a Seller'} />
                }
            />
            <KeyboardAvoidingView style={styles.keyboard}>
                <ScrollView>
                    <Container>
                        <Input
                            label={'First Name'}
                            value={first_name}
                            onChangeText={(value) => setState((prev) => ({ ...prev, value }))}
                        // error={errors && errors.first_name}
                        />
                        <Input
                            label={'Shop Name'}
                            value={shop_name}
                            onChangeText={(value) => setState((prev) => ({ ...prev, value }))}

                        // error={errors && errors.shop_name}
                        />
                        <Input
                            label={'Address'}
                            value={address}
                            onChangeText={(value) => setState((prev) => ({ ...prev, value }))}

                            // error={errors && errors.email}
                            keyboardType="email-address"
                        />
                        <InputMobile
                            value={business_contact}
                            initialCountry={INITIAL_COUNTRY}
                            onChangeText={(value) => setState((prev) => ({ ...prev, value }))}

                        // onChangePhoneNumber={({ value, code, isoCode }) =>
                        //     this.changeData({
                        //         phone_number: value,
                        //         country_no: code,
                        //         country_code: isoCode,
                        //     })
                        // }
                        // error={errors && errors.phone_number}
                        />
                        <View style={styles.uploadView}>
                            <Icon

                                name="upload"
                                color={"#000"}
                                size={30}
                                onPress={uploadProfilePic}
                                underlayColor="transparent"
                            />
                            <Text style={styles.uploadImage}>Upload Image (Upto 7)</Text>
                        </View>


                    </Container>
                </ScrollView>
                <Container>
                    <Button
                        title={'Save'}
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
    uploadView : {
        alignItems: 'flex-start', flex: 1, flexDirection: 'row',
        marginTop: 5
    },
    uploadImage : { 
        marginLeft: 10, marginTop: 10
    }
});

export default Seller
