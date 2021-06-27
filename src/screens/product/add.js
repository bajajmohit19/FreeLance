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

class AddProduct extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: {
                product_name: '',
                category_id: '',
                additional_info: '',
                short_description: '',
                description: '',
                total_quantity: 0,
                original_price: 0,
                discount_price: 0,
                country_no: '',
                country_code: '',
                exclusive_offers: false,
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

        this.props.dispatch(addProduct(payload));
        this.setState({ loading: false });

    }
    handleRegister = async () => {
        console.log("call")
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
            auth: { pending, pendingRegisterOreoUser },
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
        console.log(pendingRegisterOreoUser, pending)
        return (
            <ThemeConsumer>
                {({ theme }) => (
                    <ThemedView isFullView>
                        <Loading visible={pending} />
                        <Header
                            leftComponent={<IconHeader />}
                            centerComponent={<TextHeader title={t('common:text_register')} />}
                        />
                        <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
                            <ScrollView>
                                <Container>
                                    {message ? (
                                        <TextHtml
                                            value={message}
                                            style={changeColor(theme.colors.error)}
                                        />
                                    ) : null}
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




                                    <View style={{flex:1, borderColor:'#000', borderWidth:1, marginTop:16}}>
                                        <Button
                                            title={t('profile:add_product')}
                                            onPress={this.handleRegister}
                                            loading={pending}
                                        />
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
    textSwitch: {
        flex: 1,
        lineHeight: lineHeights.h4,
        marginRight: margin.large,
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