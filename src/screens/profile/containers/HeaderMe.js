import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import truncate from 'lodash/truncate';
import isEqual from 'lodash/isEqual';

import { PermissionsAndroid, StyleSheet } from 'react-native';
import { Text, ListItem } from 'src/components';
import Button from 'src/containers/Button';
import Separator from 'src/containers/Separator';
import { Row } from 'src/containers/Gird';

import { authSelector } from 'src/modules/auth/selectors';

import { mainStack, rootSwitch, authStack } from 'src/config/navigator';
import { margin, padding } from 'src/components/config/spacing';

import ImagePicker from 'react-native-image-picker';
import { updateSellerLogo, updateUserSuccess } from '../../../modules/auth/actions';

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

const HeaderMe = (props) => {
  const {
    auth: { isLogin, user, pendingSellerLogo },
  } = props;

  const { t } = useTranslation();
  const [logoBase, setLogo] = useState(null)
  const navigation = useNavigation();

  useEffect(() => {
    if (logoBase)
      updateShopLogo()
  }, [logoBase])
  const updateShopLogo = () => {
    const { t, dispatch } = props;
    if (!logoBase) {

      showMessage({
        message: t('notifications:text_fill_value'),
        type: 'danger',
      });
    } else {
      dispatch(updateSellerLogo(logoBase, saveDataUser));
    }
  }

  const saveDataUser = (logoUrl) => {
    console.log("logooo",logoUrl)
    const { dispatch } = props;

    dispatch(
      updateUserSuccess({
        logo: logoUrl,
      }),
    );
  };
  console.log("USEr",user)
  const captureImage = async (type = 'photo') => {
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
          setLogo(() => response.data)
        }
      });
    }
  };
  let nameUser = t('profile:text_hello_default');
  if (isLogin && user && !isEqual(user, {})) {
    const stringName = t('profile:text_hello', { name: user.first_name });

    nameUser = truncate(stringName, {
      length: 20,
      separator: '...',
    });
  }
  if (!isLogin) {
    return (
      <>
        <Text style={styles.logoutDescription} colorSecondary>
          {t('profile:text_title_logout')}
        </Text>
        <Row style={styles.logoutViewButton}>
          <Button
            title={t('profile:text_register')}
            containerStyle={styles.flex}
            type="outline"
            onPress={() =>
              navigation.navigate(rootSwitch.auth, { screen: authStack.register })
            }
          />
          <Separator small />
          <Button
            title={t('profile:text_signin')}
            containerStyle={styles.flex}
            onPress={() =>
              navigation.navigate(rootSwitch.auth, { screen: authStack.login })
            }
          />
        </Row>
      </>
    );
  }
  return (
    <ListItem
      title={nameUser}
      leftAvatar={{
        source: user?.logo
          ? { uri: user?.logo }
          : require('src/assets/images/pDefault.png'),
        size: 60,
        rounded: true,
        // onPress: () => navigation.navigate(mainStack.account),
        onPress: () => captureImage()
      }}
      titleProps={{
        medium: true,
        onPress: () => navigation.navigate(mainStack.account),
      }}
      // rightElement={
      //   <TouchableOpacity style={styles.loginBell} onPress={() => false && navigation.navigate(profileStack.notification_list)}>
      //     <Icon name="bell" size={20} />
      //     {/*<Badge status="error" value={2} badgeStyle={styles.badge} textStyle={styles.textBadge} />*/}
      //   </TouchableOpacity>
      // }
      containerStyle={styles.item}
    />
  );
};

const styles = StyleSheet.create({
  logoutDescription: {
    textAlign: 'center',
  },
  logoutViewButton: {
    marginTop: margin.big - 4,
    marginLeft: 0,
    marginRight: 0,
  },
  flex: {
    flex: 1,
  },
  loginBell: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    paddingVertical: padding.large + 4,
  },
  badge: {
    height: 20,
    minWidth: 20,
    borderRadius: 10,
  },
  textBadge: {
    fontSize: 9,
    lineHeight: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
  };
};

export default connect(mapStateToProps, null)(HeaderMe);
