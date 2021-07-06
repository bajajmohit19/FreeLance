import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, StyleSheet, AsyncStorage } from 'react-native'
import { ThemedView, Header, Loading } from 'src/components'
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import { useDispatch, useSelector } from 'react-redux'
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';
import { margin } from 'src/components/config/spacing';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';
import InputMobile from 'src/containers/input/InputMobile';
import { Image, Icon } from 'src/components';
import { sellerDataSelector,authSelector  } from 'src/modules/auth/selectors'
import { becomeASeller, getSellerDetails, updateSeller } from 'src/modules/auth/actions'
function Seller({ t }) {
    const { sellerData, auth } = useSelector((state) => ({
        sellerData: sellerDataSelector(state),
        auth: authSelector(state)

    })
    )
    const dispatch = useDispatch()
    const [sellerState, setState] = useState({
        first_name: '',
        business_contact: '',
        address1: '',
        address2: '',
        shop_name: '',
        postcode: '',
        city: '',
        state: '',
        description: '',
        // errors: null

    })
    const [seller, setSeller] = useState(false)
    const handleSaveCustomer = () => {
        if(seller) dispatch(updateSeller(sellerState))
        else dispatch(becomeASeller(sellerState));
    }
    const getSellerDetails1 = () => {
        dispatch(getSellerDetails());
    }
    const uploadProfilePic = () => {
        console.log("Upload Image")
    }
    useEffect(() => {
        if(auth?.user.user_type == 'SELLER') {
            setSeller(true)
            getSellerDetails1()
        }
    }, [])
    useEffect(() => {
        setState((prev) => ({ ...prev, first_name:sellerData?.seller_name, shop_name:sellerData?.shop_name, address1:sellerData?.addressEnc?.address1,address2:sellerData?.addressEnc?.address2, postcode:sellerData?.addressEnc?.postcode, city:sellerData?.addressEnc?.city, state: sellerData?.addressEnc?.state  }))
    }, [sellerData])
    const { first_name, address1, shop_name, business_contact, address2, city, postcode, description, state } = sellerState
    return (
        <ThemedView isFullView>
            <Loading visible={auth?.pending} />

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
                            onChangeText={(value) => setState((prev) => ({ ...prev, first_name: value }))}
                        // error={errors && errors.first_name}
                        />
                        <Input
                            label={'Shop Name'}
                            value={shop_name}
                            onChangeText={(value) => setState((prev) => ({ ...prev, shop_name: value }))}

                        // error={errors && errors.shop_name}
                        />
                        <Input
                            label={'Address1'}
                            value={address1}
                            onChangeText={(value) => setState((prev) => ({ ...prev, address1: value }))}

                        // error={errors && errors.email}
                        />
                        <Input
                            label={'Address2'}
                            value={address2}
                            onChangeText={(value) => setState((prev) => ({ ...prev, address2: value }))}

                        // error={errors && errors.email}
                        />
                        <Input
                            label={'City'}
                            value={city}
                            onChangeText={(value) => setState((prev) => ({ ...prev, city: value }))}

                        // error={errors && errors.email}
                        />
                        <Input
                            label={'State'}
                            value={state}
                            onChangeText={(value) => setState((prev) => ({ ...prev, state: value }))}

                        // error={errors && errors.email}
                        />
                        <Input
                            label={'Postal Code'}
                            value={postcode}
                            onChangeText={(value) => setState((prev) => ({ ...prev, postcode: value }))}

                            // error={errors && errors.email}
                            keyboardType="number-pad"
                        />

                        <InputMobile
                            value={business_contact}
                            initialCountry={INITIAL_COUNTRY}
                            onChangeText={(value) => setState((prev) => ({ ...prev, business_contact: value }))}

                        // onChangePhoneNumber={({ value, code, isoCode }) =>
                        //     this.changeData({
                        //         phone_number: value,
                        //         country_no: code,
                        //         country_code: isoCode,
                        //     })
                        // }
                        // error={errors && errors.phone_number}
                        />
                        <Input
                            label={'Description'}
                            value={description}
                            onChangeText={(value) => setState((prev) => ({ ...prev, description: value }))}

                            // error={errors && errors.email}
                            keyboardType="email-address"
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
                        loading={auth?.pending}
                        onPress={handleSaveCustomer}
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
    uploadView: {
        alignItems: 'flex-start', flex: 1, flexDirection: 'row',
        marginTop: 5
    },
    uploadImage: {
        marginLeft: 10, marginTop: 10
    }
});

export default Seller
