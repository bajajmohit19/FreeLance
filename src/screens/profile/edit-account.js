import React from 'react';
import { connect } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import omit from 'lodash/omit';
import { withTranslation } from 'react-i18next';

import { StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ThemedView, Header, Loading } from 'src/components';
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import { INITIAL_COUNTRY } from 'src/config/config-input-phone-number';
import InputMobile from 'src/containers/input/InputMobile';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import Button from 'src/containers/Button';

import { authSelector } from 'src/modules/auth/selectors';
import { updateCustomer, updateUserSuccess, getUserDetails } from 'src/modules/auth/actions';
import { validatorUpdateAccount } from 'src/modules/auth/validator';

import { margin } from 'src/components/config/spacing';

class EditAccount extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUserDetails())
  }
  
  componentWillReceiveProps(nextProps) {
    const { auth: { userDetails } } = this.props

    if (nextProps?.auth?.userDetails != userDetails) {
      this.setState({
        data: {
          first_name: userDetails ? userDetails?.first_name :'',
          last_name: userDetails ? userDetails?.last_name : '',
          email: userDetails ? userDetails?.email : '',
          phone: userDetails ? userDetails?.phone : '',
          username: userDetails ? userDetails?.username : '',
          country_no: userDetails ? userDetails?.country_no : '',
        }
      })

    }
  }
  constructor(props) {
    super(props);
    const {
      auth: { user, userDetails, userDetailsLoader },
    } = props;
    this.state = {
      data: {
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        username: '',
        country_no: '',
      },
      errors: null,
    };
  }

  handleSaveCustomer = () => {
    const { t, dispatch } = this.props;
    const { data } = this.state;
    const errors = validatorUpdateAccount(data);
    if (errors.size > 0) {
      this.setState({
        errors: errors.toJS(),
      });
      showMessage({
        message: t('notifications:text_fill_value'),
        type: 'danger',
      });
    } else {
      this.setState({
        errors: null,
      });
      dispatch(updateCustomer(data, this.saveDataUser));
    }
  };
  saveDataUser = () => {
    const { dispatch } = this.props;
    const { data } = this.state;
    const user_email = data.email;
    dispatch(
      updateUserSuccess({
        ...omit(data, ['email']),
        user_email,
      }),
    );
  };

  changeData(key, value) {
    const { data } = this.state;
    this.setState({
      data: {
        ...data,
        [key]: value,
      },
    });
  }
  render() {
    console.log("asdasd", userDetails)
    const {
      t,
      auth: { pendingUpdateCustomer, userDetails, userDetailsLoader },
    } = this.props;
    const { data, errors } = this.state;
    const { first_name, last_name, email, phone, country_code, username } = data;
    console.log("details", userDetails)
    return (
      <ThemedView isFullView>
        <Loading visible={userDetailsLoader} />

        <Header
          leftComponent={<IconHeader />}
          centerComponent={
            <TextHeader title={t('profile:text_edit_account')} />
          }
        />
        <KeyboardAvoidingView style={styles.keyboard}>
          <ScrollView>
            <Container>
              <Input
                label={t('inputs:text_first_name')}
                value={first_name}
                onChangeText={(value) => this.changeData('first_name', value)}
                error={errors && errors.first_name}
              />
              <Input
                label={t('inputs:text_last_name')}
                value={last_name}
                onChangeText={(value) => this.changeData('last_name', value)}
                error={errors && errors.last_name}
              />
              <Input
                label={t('inputs:text_email_address')}
                value={email}
                onChangeText={(value) => this.changeData('email', value)}
                error={errors && errors.email}
                keyboardType="email-address"
              />
              <Input
                label={t('inputs:text_username')}
                value={username}
                onChangeText={(value) => this.changeData('username', value)}
                error={errors && errors.username}
                keyboardType="email-address"
              />
              <InputMobile
                value={phone}
                initialCountry={INITIAL_COUNTRY}
                onChangePhoneNumber={({ value, code, isoCode }) =>
                  this.changeData({
                    phone: value,
                    country_no: code,
                    country_code: isoCode,
                  })
                }
                error={errors && errors.phone}
              />

              <Button
                title={t('common:text_save')}
                containerStyle={styles.button}
                loading={pendingUpdateCustomer}
                onPress={this.handleSaveCustomer}
              />
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    );
  }
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
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
  };
};

export default connect(mapStateToProps, null)(withTranslation()(EditAccount));
