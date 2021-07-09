import React from 'react';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import firebase from '@react-native-firebase/app';

import {
    StyleSheet,
    ScrollView,
    View,
    Switch,
    KeyboardAvoidingView,
    Platform,
    PermissionsAndroid,
    Dimensions
} from 'react-native';
import {
    Header,
    Loading,
    Text,
    ThemedView,
    Button,
    ThemeConsumer,
} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import InputMobile from 'src/containers/input/InputMobile';
import TextHtml from 'src/containers/TextHtml';
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import { addProduct } from 'src/modules/auth/actions';
import { authSelector } from 'src/modules/auth/selectors';
import { configsSelector, languageSelector } from 'src/modules/common/selectors';
import { checkPhoneNumber } from 'src/modules/auth/service';

import { authStack } from 'src/config/navigator';
import { margin, padding } from 'src/components/config/spacing';
import { lineHeights } from 'src/components/config/fonts';
import { changeColor } from 'src/utils/text-html';
import { showMessage } from 'react-native-flash-message';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';
import { formatPhoneWithCountryCode } from 'src/utils/phone-formatter';
import Avtar from 'src/components/avatar/Avatar.js'
import ImagePicker from 'react-native-image-picker';

const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera permission',
                },
            );
            // If CAMERA Permission is granted
            return 'granted' === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            alert('Write permission err', err);
            console.warn(err);
            return false;
        }
    } else return true;
};

const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'External Storage Write Permission',
                    message: 'App needs write permission',
                },
            );
            // If WRITE_EXTERNAL_STORAGE Permission is granted
            return 'granted' === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            alert('Write permission err', err);
        }
        return false;
    } else return true;
};

class AddProduct extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                product_name: '',
                category_id: 'nQrXwjhIpaVFx8faw68V8BCCghcse6iE',
                additional_info: '',
                short_description: '',
                description: '',
                total_quantity: 0,
                original_price: 0,
                discount_price: 0,
                country_no: '',
                country_code: '',
                exclusive_offers: false,
                image: null,
                product_images: []
            },
            user: null,
            confirmResult: null,
            visibleModal: false,
            loading: false,
            error: {
                message: null,
                errors: null,
            },
        };
        this.confirmation = null;
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }
    captureImage = async (type = 'photo', field_name) => {
        const options = {
            title: 'Select Shop Logo',
            type: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {
                    // alert('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    alert('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }
                else {
                    // You can also display the image using data:
                    // let source = {
                    //   uri: 'data:image/jpeg;base64,' + response.data
                    // };
                    let newArr = this.state.data.product_images.concat(response?.data)
                    this.setState({ data: { ...this.state.data, [field_name]: field_name == 'product_images' ? newArr : response?.data } })
                }
            });
        }
    };
    changeData = (value) => {
        this.setState({
            data: {
                ...this.state.data,
                ...value,
            },
        });
    };

    register = () => {
        const { data } = this.state;

        this.props.dispatch(addProduct(data));
        this.setState({ loading: false });

    }
    handleRegister = async () => {
        this.setState({
            loading: true,
        });
        try {

            this.register();
        } catch (e) {
            console.log(e)
            showMessage({
                message: e.message,
                type: 'danger',
            });
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const {
            navigation,
            auth: { pending, pendingRegisterOreoUser, pendingAddProduct },
            enablePhoneNumber,
            t,
        } = this.props;
        const {
            data: {
                email,
                product_name,
                description,
                short_description,
                category_id,
                total_quantity,
                additional_info,
                original_price,
                discount_price,
                phone,
                country_no,
                password,
                exclusive_offers,
            },
            error: { message, errors },
            visibleModal,
            loading,
            user,
            confirmResult,
        } = this.state;
        const visible = visibleModal || !!(!user && confirmResult);
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <ThemedView isFullView>
                        <Loading visible={pendingAddProduct} />
                        <Header
                            leftComponent={<IconHeader />}
                            centerComponent={<TextHeader title={t('profile:add_product')} />}
                        />
                        <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
                            <ScrollView >
                                <Container >
                                    {message ? (
                                        <TextHtml
                                            value={message}
                                            style={changeColor(theme.colors.error)}
                                        />
                                    ) : null}
                                    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: Dimensions.get('screen').height * 0.8 }}>
                                        <ScrollView >
                                            <Input
                                                label={t('profile:product_name')}
                                                value={product_name}
                                                onChangeText={(value) =>
                                                    this.changeData({ product_name: value })
                                                }
                                                error={errors && errors.product_name}
                                            />
                                            <Input
                                                label={t('profile:category_id')}
                                                value={category_id}
                                                onChangeText={(value) =>
                                                    this.changeData({ category_id: value })
                                                }
                                                error={errors && errors.category_id}
                                            />
                                            <Input
                                                label={t('profile:additional_info')}
                                                value={additional_info}
                                                onChangeText={(value) => this.changeData({ additional_info: value })}
                                                error={errors && errors.additional_info}
                                            />
                                            <Input
                                                label={t('profile:short_description')}
                                                value={short_description}
                                                onChangeText={(value) => this.changeData({ short_description: value })}
                                                error={errors && errors.short_description}
                                            />
                                            <Input
                                                label={t('profile:description')}
                                                value={description}
                                                onChangeText={(value) => this.changeData({ description: value })}
                                                error={errors && errors.description}
                                            />
                                            <Input
                                                keyboardType={'number-pad'}
                                                label={t('profile:total_quantity')}
                                                value={total_quantity}
                                                onChangeText={(value) => this.changeData({ total_quantity: value })}
                                                error={errors && errors.total_quantity}
                                            />
                                            <Input
                                                keyboardType={'number-pad'}
                                                label={t('profile:original_price')}
                                                value={original_price}
                                                onChangeText={(value) => this.changeData({ original_price: value })}
                                                error={errors && errors.original_price}
                                            />
                                            <Input
                                                keyboardType={'number-pad'}
                                                label={t('profile:discount_price')}
                                                value={discount_price}
                                                onChangeText={(value) => this.changeData({ discount_price: value })}
                                                error={errors && errors.discount_price}
                                            />

                                            <View style={styles.addButton}>
                                                <View style={styles.avtar}>
                                                    <Text>Product Image</Text>
                                                    <Avtar
                                                        renderPlaceholderContent={<Text>Product Image</Text>}

                                                        source={this.state.data?.image
                                                            ? { uri: `data:image/png;base64, ${this.state.data?.image}` }
                                                            : require('src/assets/images/pDefault.png')}
                                                        size={60}
                                                        rounded={true}
                                                        showEditButton
                                                        onPress={() => this.captureImage('photo', 'image')}
                                                    />
                                                </View>
                                                <Text>Product Images</Text>
                                                <View style={{display:'flex', flexDirection:'row', }}>
                                                    {this.state.data?.product_images.length ?
                                                        this.state.data.product_images.map(image => 
                                                            <Avtar
                                                                renderPlaceholderContent={<Text>Product Images</Text>}

                                                                source={
                                                                         { uri: `data:image/png;base64, ${image}` }
                                                                    }
                                                                size={60}
                                                                showEditButton
                                                                rounded={true}
                                                                onPress={() => this.captureImage('photo', 'product_images')}
                                                            />
                                                        ) : null
                                                    }
                                                  {this.state.data.product_images.length <= 4 ?  
                                                  <Avtar
                                                        renderPlaceholderContent={<Text>Product Images</Text>}

                                                        source={
                                                                require('src/assets/images/pDefault.png')}
                                                        size={60}
                                                        showEditButton
                                                        rounded={true}
                                                        onPress={() => this.captureImage('photo', 'product_images')}
                                                    /> : null}
                                                </View>

                                            </View>
                                        </ScrollView>
                                        <View >

                                            <Button
                                                title={t('profile:add_product')}
                                                onPress={this.handleRegister}
                                                loading={pendingAddProduct}
                                            />
                                        </View>
                                    </View>







                                </Container>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </ThemedView>
                )}
            </ThemeConsumer>
        );
    }
}
const styles = StyleSheet.create({
    keyboard: {
        flex: 1,
    },
    viewSwitch: {
        marginVertical: margin.big,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avtar: {
        paddingRight: 4
    },
    textSwitch: {
        flex: 1,
        lineHeight: lineHeights.h4,
        marginRight: margin.large,
    },
    addButton: {
        display: 'flex', flexDirection: 'column', padding: 4
    },
    viewAccount: {
        marginVertical: margin.big,
    },
    textHaveAccount: {
        paddingVertical: padding.small,
        marginTop: margin.base,
        marginBottom: margin.big,
        textAlign: 'center',
    },
});

const mapStateToProps = (state) => {
    const configs = configsSelector(state);
    return {
        auth: authSelector(state),
        language: languageSelector(state),
        enablePhoneNumber: configs.get('toggleLoginSMS'),
        // addedUser: state.signup.registeredUser
    };
};

export default connect(mapStateToProps)(withTranslation()(AddProduct));