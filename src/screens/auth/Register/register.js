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
import ModalVerify from '../containers/ModalVerify';
import SocialMethods from '../containers/SocialMethods';
import { signUpWithEmail } from 'src/modules/auth/actions';
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

class RegisterScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        phone: '',
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
    // this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     const { data } = this.state;
    //     this.setState({
    //       user,
    //       data: { ...data, phone_number: user.phoneNumber },
    //     });
    //   }
    //   if (this.state.confirmResult && Platform.OS === 'android') {
    //     this.register();
    //   }
    // });
  }

  componentWillUnmount() {
    // if (this.unsubscribe) {
    //   this.unsubscribe();
    // }
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
    data?.exclusive_offers == true ? data.exclusive_offers = 1 : data.exclusive_offers = 0 
    let payload = data;
    const { country_code } = data;
   
    this.props.dispatch(signUpWithEmail(payload));
    this.setState({ loading: false });

  };

  /**
   * Handle User register
   */
  handleRegister = async () => {
    console.log("call")
    this.setState({
      loading: true,
    });
    try {
      const { enablePhoneNumber } = this.props;
      const { data, user } = this.state;
      const { phone_number, country_code } = data;
     
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
      auth: { pending },
      enablePhoneNumber,
      t,
    } = this.props;
    const {
      data: {
        email,
        first_name,
        last_name,
        username,
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
            {/* <Loading visible={pending} /> */}
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
                    label={t('auth:text_input_first_name')}
                    value={first_name}
                    onChangeText={(value) =>
                      this.changeData({ first_name: value })
                    }
                    error={errors && errors.first_name}
                  />
                  <Input
                    label={t('auth:text_input_last_name')}
                    value={last_name}
                    onChangeText={(value) =>
                      this.changeData({ last_name: value })
                    }
                    error={errors && errors.last_name}
                  />
                  <Input
                    label={t('auth:text_input_user')}
                    value={username}
                    onChangeText={(value) => this.changeData({ username: value })}
                    error={errors && errors.username}
                  />
                  {enablePhoneNumber ? (
                    <InputMobile
                      value={phone}
                      initialCountry={INITIAL_COUNTRY}
                      onChangePhoneNumber={({ value, code, isoCode }) =>
                        this.changeData({ phone: value, country_no: code, country_code: isoCode, })
                      }
                      error={errors && errors.phone}
                    />
                  ) : null}
                  <Input
                    label={t('auth:text_input_email')}
                    value={email}
                    onChangeText={(value) => this.changeData({ email: value })}
                    error={errors && errors.email}
                  />
                  <Input
                    label={t('auth:text_input_password')}
                    value={password}
                    secureTextEntry
                    onChangeText={(value) => this.changeData({ password: value })}
                    error={errors && errors.password}
                  />
                  <View style={styles.viewSwitch}>
                    <Text style={styles.textSwitch} colorSecondary>
                      {t('auth:text_agree_register')}
                    </Text>
                    <Switch
                      value={exclusive_offers}
                      onValueChange={(value) =>
                        this.changeData({ exclusive_offers: value })
                      }
                    />
                  </View>
                  <Button
                    title={t('auth:text_register')}
                    onPress={this.handleRegister}
                    loading={loading}
                  />
                  <SocialMethods style={styles.viewAccount} />
                  <Text
                    medium
                    style={styles.textHaveAccount}
                    onPress={() => navigation.navigate(authStack.login)}>
                    {t('auth:text_already_account')}
                  </Text>
                  <ModalVerify
                    visible={visible}
                    type={'register'}
                    phone={
                      phone.includes(country_no)
                        ? phone
                        : country_no + phone
                    }
                    confirmation={confirmResult}
                    handleVerify={this.register}
                    setModalVisible={(value) =>
                      this.setState({
                        visibleModal: value,
                        loading: false,
                        confirmResult: null,
                      })
                    }
                  />
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

export default connect(mapStateToProps)(withTranslation()(RegisterScreen));
