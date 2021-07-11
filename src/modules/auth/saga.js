import firebase from '@react-native-firebase/app';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager } from 'react-native-fbsdk';
import AsyncStorage from '@react-native-community/async-storage';
import { put, call, select, takeEvery } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import { handleError } from 'src/utils/error';
import OneSignal from 'react-native-onesignal';

import languages from 'src/locales';

import * as Actions from './constants';

import { userIdSelector } from './selectors';
import {
  loginWithEmail,
  loginWithMobile,
  registerWithEmail,
  addProduct,
  getCategories,
  loginWithGoogle,
  loginWithFacebook,
  changeEmail,
  changePassword,
  forgotPassword,
  updateCustomer,
  getCustomer,
  getFilesDownload,
  loginWithApple,
  digitsLoginUser,
  digitsCreateUser,
  digitsLogoutUser,
  isLogin,
  logout,
  becomeASeller,
  updateSeller,
  getSellerData,
  updateSellerLogo,
  uploadCustomerLogo,
  getVendors,
  getHomeNewArrivals,
  getHomeCategories,
  getProductsByVendor,
  getUserDetail
} from './service';

import { validatorForgotPassword, validatorChangePassword } from './validator';

import appleAuth, {
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

import { languageSelector, requiredLoginSelector } from '../common/selectors';

import NavigationService from 'src/utils/navigation';
import { rootSwitch } from 'src/config/navigator';
import { shippingAddressInit } from './config';

async function signOut() {

  const method = await AsyncStorage.getItem('method');

  // Logout rest api
  await logout();

  // Sign Out Firebase
  if (method === 'otp') {
    await firebase.auth().signOut();
  }

  // Sign Out Google
  if (method === 'google') {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  }

  // Sign Out Apple
  if (method === 'apple') {
    await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGOUT,
    });
  }

  // Sign Out Facebook
  if (method === 'facebook') {
    LoginManager.logOut();
  }

  // Sign Out Digits
  if (method === 'otp-digits') {
    await digitsLogoutUser();
  }
}

/**
 * Do login success
 * @param token
 * @param user
 * @returns {IterableIterator<*>}
 */
function* doLoginSuccess(token, user = {}, method = 'email') {
  yield put({
    type: Actions.SIGN_IN_WITH_EMAIL_SUCCESS,
    payload: { token, user },
  });
  yield put({
    type: Actions.GET_CUSTOMER,
    payload: {
      id: user.ID,
    },
  });
  yield call(NavigationService.navigate, rootSwitch.main);
  yield call(AsyncStorage.setItem, 'token', token);
  yield call(AsyncStorage.setItem, 'method', method);

  OneSignal.sendTag('user_id', user.ID);
}
/**
 * Do makeaseller success
 * @param token
 * @param user
 * @returns {IterableIterator<*>}
 */


/**
 * Sign In saga
 * @param username
 * @param password
 * @returns {IterableIterator<*>}
 */
function* signInWithEmailSaga({ username, password }) {
  try {
    const language = yield select(languageSelector);
    const { data, err, message, status } = yield call(loginWithEmail, {
      username,
      password,
      language,
    });
    if (status === 409 || status === 422 || status === 500) {
      yield call(showMessage, {
        description: message?.password && message?.username ? 'Both fields cannot be blank' : message?.username ? message?.username[0] : message?.password[0],
        message: message?.password && message?.username ? 'username and password' : message?.username ? 'username' : ' password',
        type: 'info',
      });
      yield put({
        type: Actions.SIGN_IN_WITH_EMAIL_ERROR,
        payload: {
          message: message,
        },
      });
    } else {
      yield call(showMessage, {
        message: message,
        type: 'success',
      });
      yield call(doLoginSuccess, data?.access_token, data, 'email');

    }
  } catch (e) {
    yield call(handleError, e)
    yield put({
      type: Actions.SIGN_IN_WITH_EMAIL_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}
/**
 * Become A Seller
 * @param data
 * @returns {Generator<<"PUT", PutEffectDescriptor<{payload: {message: *}, type: string}>>|<"CALL", CallEffectDescriptor>, void, ?>}
 */
function* becomeSeller({ payload }) {
  try {
    const { data, cb } = payload;


    const signupData = yield call(becomeASeller, data);

    if (signupData?.status === 409 || signupData?.status === 422 || signupData?.status === 500) {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'info',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
        payload: {
          message: signupData?.message,
        },
      });
    }
    else {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'success',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_SUCCESS,
        payload: {
          message: signupData?.message,
        },
      });
      yield put({
        type: Actions.BECOME_A_SELLER_SUCCESS,
      });
      yield call(
        cb(signupData?.data)
      )

      // yield call(AsyncStorage.setItem, 'isSeller', signupData?.data?.user_type);

    }

  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}
function* updateSellerData({ payload }) {
  try {

    const signupData = yield call(updateSeller, payload);

    if (signupData?.status === 409 || signupData?.status === 422 || signupData?.status === 500) {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'info',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
        payload: {
          message: signupData?.message,
        },
      });
    }
    else {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'success',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_SUCCESS,
        payload: {
          message: signupData?.message,
        },
      });

    }

  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}
function* getSellerDataSaga({ payload }) {
  try {
    yield put({
      type: Actions.REGISTER_OREO_USER,

    });
    const seller = yield call(getSellerData);

    yield put({
      type: Actions.GET_SELLER_DETAILS_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.REGISTER_OREO_USER_SUCCESS,

    });
    if (payload?.cb) {
      yield call(payload?.cb, seller);
    }
  } catch (e) {
    console.log("error", e)
    yield put({
      type: Actions.REGISTER_OREO_USER_ERROR,

    });
  }
}
function* getUserDataSaga({ payload }) {
  try {
    yield put({
      type: Actions.GET_USER_DETAIL_LOADER,

    });
    const seller = yield call(getUserDetail);

    yield put({
      type: Actions.GET_USER_DETAIL_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.GET_USER_DETAIL_LOADER_SUCCESS,

    });
    if (payload?.cb) {
      yield call(payload?.cb, seller);
    }
  } catch (e) {
    console.log("error", e)
    yield put({
      type: Actions.GET_USER_DETAIL_LOADER_ERROR,

    });
  }
}
function* getCategoryList({ payload }) {
  try {
    yield put({
      type: Actions.CATEGORY_LIST_LOADER,

    });
    const seller = yield call(getCategories);

    yield put({
      type: Actions.CATEGORY_LIST_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.CATEGORY_LIST_LOADER_SUCCESS,

    });
    if (payload?.cb) {
      yield call(payload?.cb, seller);
    }
  } catch (e) {
    console.log("error", e)
    yield put({
      type: Actions.CATEGORY_LIST_LOADER_ERROR,

    });
  }
}
function* getHomeVendors({ payload }) {
  console.log("payload",payload)
  const { data } = payload
  try {
    yield put({
      type: Actions.VENDORS_LIST_LOADER,

    });
    const seller = yield call(getVendors, data);
  console.log("array",seller?.data)

    yield put({
      type: Actions.HOME_VENDORS_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.VENDORS_LIST_LOADER_SUCCESS,

    });

  } catch (e) {
    console.log("errorasd", e)
    yield put({
      type: Actions.VENDORS_LIST_LOADER_ERROR,

    });
  }
}
function* getVendorProducts({ payload }) {
  const { data } = payload
  try {
    yield put({
      type: Actions.VENDORS_PRODUCTS_LIST_LOADER,

    });
    const seller = yield call(getProductsByVendor, data);
  console.log("array",seller?.data)

    yield put({
      type: Actions.VENDORS_PRODUCTS_LIST_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.VENDORS_PRODUCTS_LIST_LOADER_SUCCESS,

    });

  } catch (e) {
    console.log("errorasd", e)
    yield put({
      type: Actions.VENDORS_PRODUCTS_LIST_LOADER_ERROR,

    });
  }
}
function* getNewArrivals({ payload }) {
  const { data } = payload
  try {
    yield put({
      type: Actions.HOME_NEW_ARRIVALS_LOADER,

    });
    const seller = yield call(getHomeNewArrivals, data);

    yield put({
      type: Actions.HOME_NEW_ARRIVALS_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.HOME_NEW_ARRIVALS_LOADER_SUCCESS,

    });

  } catch (e) {
    console.log("errorasd", e)
    yield put({
      type: Actions.HOME_NEW_ARRIVALS_LOADER_ERROR,

    });
  }
}
function* getHomeCategoriesData({ payload }) {
  const { data } = payload
  try {
    yield put({
      type: Actions.HOME_CATEGORIES_LOADER,

    });
    const seller = yield call(getHomeCategories, data);
    yield put({
      type: Actions.HOME_CATEGORIES_SUCCESS,
      payload: seller?.data

    });
    yield put({
      type: Actions.HOME_CATEGORIES_LOADER_SUCCESS,

    });

  } catch (e) {
    console.log("errorasd", e)
    yield put({
      type: Actions.HOME_CATEGORIES_LOADER_ERROR,

    });
  }
}
/**
 * Sign In With OTP
 * @param data
 * @returns {Generator<<"PUT", PutEffectDescriptor<{payload: {message: *}, type: string}>>|<"CALL", CallEffectDescriptor>, void, ?>}
 */
function* signInWithOtpSaga({ payload }) {
  try {
    // const language = yield select(languageSelector);
    const { success, data } = yield call(digitsLoginUser, payload.data);
    if (success) {
      const { token, user } = data;
      yield call(doLoginSuccess, token, user, 'otp-digits');
    } else {
      yield call(handleError, new Error('Something wrong.'));
    }
  } catch (e) {
    // yield call(handleError, e)
    yield put({
      type: Actions.SIGN_IN_WITH_OTP_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}

/**
 * Sign up with email
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* signUpWithOtplSaga({ payload }) {
  try {
    const language = yield select(languageSelector);
    const { success, data } = yield call(digitsCreateUser, payload.data);
    if (success) {
      const { token, user } = data;
      yield call(showMessage, {
        message: languages[language].notifications.text_create_user_success,
        type: 'info',
      });
      yield call(doLoginSuccess, token, user, 'otp-digits');
    } else {
      yield call(handleError, new Error('Something wrong.'));
    }
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}

/**
 * Sign In mobile saga
 * @param tokenId
 * @returns {IterableIterator<*>}
 */
function* signInWithMobileSaga({ tokenId }) {
  try {
    const { token, user } = yield call(loginWithMobile, tokenId);
    yield call(doLoginSuccess, token, user, 'otp');
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_IN_WITH_MOBILE_ERROR,
    });
  }
}

/**
 * Sign up with email
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* signUpWithEmailSaga({ payload }) {
  try {
    const { data } = payload;
    const language = yield select(languageSelector);
    const signupData = yield call(registerWithEmail, data);

    if (signupData?.status === 409 || signupData?.status === 422 || signupData?.status === 500) {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'info',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
        payload: {
          message: signupData?.message,
        },
      });
    }
    else {
      yield call(showMessage, {
        message: signupData?.message,
        type: 'success',
      });
      yield put({
        type: Actions.SIGN_UP_WITH_EMAIL_SUCCESS,
      });
      yield call(doLoginSuccess, signupData?.data?.access_token, signupData?.data, 'otp');

    }
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_UP_WITH_EMAIL_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}
/**
 * Sign up with email
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* addProductSaga({ payload }) {
  try {
    const { data } = payload;
    const language = yield select(languageSelector);
    const { data1, error, message, status } = yield call(addProduct, data);

    console.log("product", data1, error, message, status)
    if (status === 409 || status === 422) {
      console.log("innn")
      yield call(showMessage, {
        description: message?.poduct_name || message?.description || message?.image || message?.product_images || message?.additional_info && 'Please Fill required fields',
        message: 'Please Fill Required Fields',
        type: 'info',
      });
      yield put({
        type: Actions.ADD_PRODUCT_LOADING_FALSE,
        payload: {
          message: message,
        },
      });
    } else if (status === 500) {
      yield call(showMessage, {
        message: 'Oops Something went wrong',
        type: 'error',
      });
    }
    else {
      yield call(showMessage, {
        message: message,
        type: 'success',
      });
      yield put({
        type: Actions.ADD_PRODUCT_LOADING_FALSE,
      });

    }
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.ADD_PRODUCT_LOADING_FALSE,
      payload: {
        message: e.message,
      },
    });
  }
}

/**
 * Sign in with google
 * @param payload
 * @returns {IterableIterator<CallEffect | *>}
 */
function* signInWithGoogleSaga({ payload }) {
  try {
    const { idToken } = payload;
    const { token, user } = yield call(loginWithGoogle, { idToken });
    yield call(doLoginSuccess, token, user, 'google');
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_IN_WITH_GOOGLE_ERROR,
    });
  }
}

/**
 * Sign in with Google
 * @param payload
 * @returns {IterableIterator<CallEffect | *>}
 */
function* signInWithFacebookSaga({ payload }) {
  try {
    const { data } = payload;
    const { token, user } = yield call(loginWithFacebook, data);
    yield call(doLoginSuccess, token, user, 'facebook');
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_IN_WITH_FACEBOOK_ERROR,
    });
  }
}

/**
 * Sign in with Apple
 * @param payload
 * @returns {IterableIterator<CallEffect | *>}
 */
function* signInWithAppleSaga({ payload }) {
  try {
    const { token, user } = yield call(loginWithApple, payload);
    yield call(doLoginSuccess, token, user, 'apple');
  } catch (e) {
    yield call(handleError, e);
    yield put({
      type: Actions.SIGN_IN_WITH_FACEBOOK_ERROR,
    });
  }
}
/**
 * Sign up with email
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* forgotPasswordSideEffect(action) {
  try {
    const language = yield select(languageSelector);
    const errors = validatorForgotPassword(action.email, language);
    if (errors.size > 0) {
      yield put({
        type: Actions.FORGOT_PASSWORD_ERROR,
        payload: {
          message: languages[language].notifications.text_fill_value,
          errors: errors.toJS(),
        },
      });
    } else {
      yield call(forgotPassword, action.email);
      yield put({
        type: Actions.FORGOT_PASSWORD_SUCCESS,
      });
      yield call(showMessage, {
        message: languages[language].notifications.text_forgot_password_success,
        type: 'info',
      });
    }
  } catch (e) {
    yield put({
      type: Actions.FORGOT_PASSWORD_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}
/**
 * Sign up with email
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* checkAuthSideEffectSaga() {
  try {
    const user = yield call(isLogin);
    if (!user || !user.ID) {
      yield call(signOut);
      yield call(AsyncStorage.removeItem, 'token');
      yield put({ type: Actions.SIGN_OUT_SUCCESS });
      console.log('checkAuthSideEffect', 'token not validate!');
    } else {
      console.log('Token validate ok!');
    }
  } catch (e) {
    console.log('checkAuthSideEffect', e);
  }
}

/**
 * Change Email Saga
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* changeEmailSaga({ payload }) {
  try {
    yield call(changeEmail, payload);
    yield put({ type: Actions.CHANGE_EMAIL_SUCCESS });
  } catch (e) {
    yield call(handleError, e);
    yield put({ type: Actions.CHANGE_EMAIL_ERROR });
  }
}

/**
 * Change Password Saga
 * @param payload
 * @returns {IterableIterator<*>}
 */
function* changePasswordSaga({ payload }) {
  try {
    const language = yield select(languageSelector);
    const errors = validatorChangePassword(payload, language);
    if (errors.size > 0) {
      yield put({
        type: Actions.CHANGE_PASSWORD_ERROR,
        payload: {
          message: languages[language].notifications.text_fill_value,
          errors: errors.toJS(),
        },
      });
    } else {
      const data = {
        password_old: payload.password_old,
        password_new: payload.password_new,
      };
      yield call(changePassword, data);
      yield put({
        type: Actions.CHANGE_PASSWORD_SUCCESS,
      });
      yield call(showMessage, {
        message: languages[language].notifications.text_change_password_success,
        type: 'info',
      });
    }
  } catch (e) {
    yield put({
      type: Actions.CHANGE_PASSWORD_ERROR,
      payload: {
        message: e.message,
      },
    });
  }
}

/**
 * Sign out saga
 * @returns {IterableIterator<*>}
 */
function* signOutSaga() {
  try {
    const requiredLogin = yield select(requiredLoginSelector);
    yield call(AsyncStorage.removeItem, 'token');
    if (requiredLogin) {
      yield call(NavigationService.navigate, rootSwitch.auth);
    }
    yield put({ type: Actions.SIGN_OUT_SUCCESS });
    yield call(signOut);
  } catch (e) {
    console.log(e);
    // yield call(handleError, e);
  }
}

/**
 * Get customer
 * @returns {IterableIterator<*>}
 */
function* getCustomerSaga({ payload }) {
  try {
    const { id, cb } = payload;
    const customer = yield call(getCustomer, id);
    yield put({
      type: Actions.GET_CUSTOMER_SUCCESS,
      payload: {
        shippingAddress: customer.shipping,
        billingAddress: customer.billing,
      },
    });
    if (cb) {
      yield call(cb, customer);
    }
  } catch (e) {
    yield put({
      type: Actions.GET_CUSTOMER_ERROR,
    });
  }
}

/**
 * Update customer
 * @returns {IterableIterator<*>}
 */
function* updateCustomerSaga({ payload }) {
  try {
    const { data, cb } = payload;
    // const userID = yield select(userIdSelector);
    yield call(updateCustomer, data);
    yield put({
      type: Actions.UPDATE_CUSTOMER_SUCCESS,
    });
    yield call(showMessage, {
      message: 'Update success',
      type: 'success',
    });
    yield call(cb);
  } catch (e) {
    yield put({
      type: Actions.UPDATE_CUSTOMER_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

/**
 * get list file of customer
 * @returns {IterableIterator<*>}
 */
function* getFilesDownloadCustomer({ payload }) {
  try {
    const userID = yield select(userIdSelector);
    const files = yield call(getFilesDownload, userID);
    if (files && files.length) {
      yield put({
        type: Actions.GET_LIST_FILE_DOWNLOAD_SUCCESS,
        payload: files,
      });
    } else {
      yield put({
        type: Actions.GET_LIST_FILE_DOWNLOAD_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: Actions.GET_LIST_FILE_DOWNLOAD_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

/**
 * Update seller logo
 * @returns {IterableIterator<*>}
 */
function* updateUserLogoSaga({ payload }) {
  try {
    const { data, cb, user } = payload;
    // const userID = yield select(userIdSelector);
    const key = user?.user_type === 'SELLER' ? 'logo' : 'image'
    const uploadLogo = yield call(user?.user_type === 'SELLER' ? updateSellerLogo : uploadCustomerLogo,
      { [key]: data });
    yield put({
      type: Actions.UPDATE_USER_LOGO_SUCCESS,
    });
    yield call(showMessage, {
      message: 'Update success',
      type: 'success',
    });
    yield call(() => {
      cb(uploadLogo?.data[key] || undefined)
    });
  } catch (e) {
    yield put({
      type: Actions.UPDATE_USER_LOGO_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

export default function* authSaga() {
  yield takeEvery(Actions.BECOME_A_SELLER, becomeSeller)
  yield takeEvery(Actions.ADD_PRODUCT, addProductSaga)
  yield takeEvery(Actions.GET_CATEGORY_LIST, getCategoryList)
  yield takeEvery(Actions.GET_HOME_CATEGORIES, getHomeCategoriesData)
  yield takeEvery(Actions.GET_HOME_VENDORS, getHomeVendors)
  yield takeEvery(Actions.GET_PRODUCT_BY_VENDOR, getVendorProducts)
  yield takeEvery(Actions.GET_HOME_NEW_ARRIVALS, getNewArrivals)
  yield takeEvery(Actions.UPDATE_SELLER, updateSellerData)
  yield takeEvery(Actions.GET_SELLER_DETAILS, getSellerDataSaga)
  yield takeEvery(Actions.GET_USER_DETAILS, getUserDataSaga)
  yield takeEvery(Actions.SIGN_IN_WITH_EMAIL, signInWithEmailSaga);
  yield takeEvery(Actions.SIGN_IN_WITH_MOBILE, signInWithMobileSaga);
  yield takeEvery(Actions.SIGN_UP_WITH_EMAIL, signUpWithEmailSaga);
  yield takeEvery(Actions.SIGN_IN_WITH_GOOGLE, signInWithGoogleSaga);
  yield takeEvery(Actions.SIGN_IN_WITH_FACEBOOK, signInWithFacebookSaga);
  yield takeEvery(Actions.SIGN_IN_WITH_APPLE, signInWithAppleSaga);
  yield takeEvery(Actions.IS_LOGIN, checkAuthSideEffectSaga);
  yield takeEvery(Actions.SIGN_OUT, signOutSaga);
  yield takeEvery(Actions.CHANGE_EMAIL, changeEmailSaga);
  yield takeEvery(Actions.CHANGE_PASSWORD, changePasswordSaga);
  yield takeEvery(Actions.FORGOT_PASSWORD, forgotPasswordSideEffect);
  yield takeEvery(Actions.GET_CUSTOMER, getCustomerSaga);
  yield takeEvery(Actions.UPDATE_CUSTOMER, updateCustomerSaga);

  yield takeEvery(Actions.SIGN_IN_WITH_OTP, signInWithOtpSaga);
  yield takeEvery(Actions.SIGN_UP_WITH_OTP, signUpWithOtplSaga);
  yield takeEvery(Actions.GET_LIST_FILE_DOWNLOAD, getFilesDownloadCustomer);
  yield takeEvery(Actions.UPDATE_USER_LOGO, updateUserLogoSaga);
}
