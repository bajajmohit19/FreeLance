import { fromJS } from 'immutable';

import { REHYDRATE } from 'redux-persist/lib/constants';
import * as Actions from './constants';
import { notificationMessage } from 'src/utils/error';
import { shippingAddressInit, billingAddressInit, errorInit as initError } from './config';

const initState = fromJS({
  homeCategoryLoader: false,
  userDetailsLoader:false,
  productsByVenderLoader: false,
  categoryListLoader: false,
  homeNewArrivalLoader: false,
  vendorListLoader: false,
  isLogin: false,
  pending: false,
  pendingAddProduct: false,
  pendingMobile: false,
  pendingGoogle: false,
  pendingFacebook: false,
  pendingApple: false,
  user: {},
  token: '',
  shippingAddress: shippingAddressInit,
  billingAddress: billingAddressInit,
  loginError: initError,
  signUpError: initError,
  changeMailError: {
    message: '',
    errors: {},
  },
  changePasswordError: initError,
  forgotPasswordError: initError,
  updateShippingAddressError: initError,
  pendingChangeEmail: false,
  pendingChangePassword: false,
  pendingForgotPassword: false,
  pendingUpdateCustomer: false,
  pendingRegisterOreoUser: false,
  pendingGetCustomer: false,
  isSeller: false,
  files: {
    data: [],
    loading: true,
    error: true,
    refreshing: false,
  },
  pendingUserLogo: false
});

export default function authReducer(state = initState, action = {}) {
  switch (action.type) {
    case Actions.SIGN_IN_WITH_EMAIL:
      return state.set('pending', true).set('loginError', fromJS(initError));
    case Actions.SIGN_IN_WITH_EMAIL_SUCCESS:
      return state
        .set('pending', false)
        .set('user', fromJS(action.payload.user))
        .set('isLogin', true)
        .set('token', fromJS(action.payload.token))
        .set('pendingMobile', false)
        .set('pendingFacebook', false)
        .set('pendingFacebook', false)
        .set('pendingApple', false);
    case Actions.BECOME_A_SELLER_SUCCESS:
      return state
        .set('isSeller', true)
    case Actions.VENDORS_PRODUCTS_LIST_SUCCESS:
      return state.set('productsByVendors', action?.payload)
    case Actions.VENDORS_PRODUCTS_LIST_LOADER:
      return state.set('productsByVenderLoader', true)
    case Actions.VENDORS_PRODUCTS_LIST_LOADER_SUCCESS:
      return state.set('productsByVenderLoader', false)
    case Actions.VENDORS_PRODUCTS_LIST_LOADER_ERROR:
      return state.set('productsByVenderLoader', false)
    case Actions.HOME_CATEGORIES_SUCCESS:
      return state.set('homeCategories', action?.payload)
    case Actions.HOME_CATEGORIES_LOADER:
      return state.set('homeCategoryLoader', true)
    case Actions.HOME_CATEGORIES_LOADER_SUCCESS:
      return state.set('homeCategoryLoader', false)
    case Actions.HOME_CATEGORIES_LOADER_ERROR:
      return state.set('homeCategoryLoader', false)
    case Actions.CATEGORY_LIST_LOADER:
      return state.set('categoryListLoader', true)
    case Actions.CATEGORY_LIST_LOADER_SUCCESS:
      return state.set('categoryListLoader', false)
    case Actions.CATEGORY_LIST_LOADER_ERROR:
      return state.set('categoryListLoader', false)
    case Actions.VENDORS_LIST_LOADER:
      return state.set('vendorListLoader', true)
    case Actions.VENDORS_LIST_LOADER_SUCCESS:
      return state.set('vendorListLoader', false)
    case Actions.VENDORS_LIST_LOADER_ERROR:
      return state.set('vendorListLoader', false)
    case Actions.HOME_NEW_ARRIVALS_LOADER:
      return state.set('homeNewArrivalLoader', true)
    case Actions.HOME_NEW_ARRIVALS_LOADER_SUCCESS:
      return state.set('homeNewArrivalLoader', false)
    case Actions.HOME_NEW_ARRIVALS_LOADER_ERROR:
      return state.set('homeNewArrivalLoader', false)
    case Actions.HOME_NEW_ARRIVALS_SUCCESS:
      return state
        .set('homeNewArrivals', action?.payload);
    case Actions.CATEGORY_LIST_SUCCESS:
      return state
        .set('categoryList', action?.payload);
    case Actions.HOME_VENDORS_SUCCESS:
      return state
        .set('vendorsList', action?.payload);
    case Actions.SIGN_IN_WITH_EMAIL_ERROR:
      const errorSignIn = notificationMessage(action.payload);
      return state.set('pending', false).set('loginError', fromJS(errorSignIn));
    case Actions.SIGN_IN_WITH_MOBILE:
      return state.set('pendingMobile', true);
    case Actions.SIGN_IN_WITH_MOBILE_ERROR:
      return state.set('pendingMobile', false);
    case Actions.SIGN_IN_WITH_GOOGLE:
      return state.set('pendingGoogle', true);
    case Actions.SIGN_IN_WITH_GOOGLE_ERROR:
    case Actions.SIGN_IN_WITH_GOOGLE_CANCEL:
      return state.set('pendingGoogle', false);
    case Actions.SIGN_IN_WITH_APPLE:
      return state.set('pendingApple', true);
    case Actions.SIGN_IN_WITH_FACEBOOK:
      return state.set('pendingFacebook', true);
    case Actions.SIGN_IN_WITH_FACEBOOK_ERROR:
    case Actions.SIGN_IN_WITH_FACEBOOK_CANCEL:
      return state.set('pendingFacebook', false);
    case Actions.SIGN_IN_WITH_APPLE_ERROR:
    case Actions.SIGN_IN_WITH_APPLE_CANCEL:
      return state.set('pendingApple', false);
    case Actions.SIGN_UP_WITH_EMAIL:
      return state.set('pending', true).set('signUpError', fromJS(initError));
    case Actions.SIGN_UP_WITH_EMAIL_SUCCESS:
      return state.set('pending', false);
    case Actions.ADD_PRODUCT:
      return state.set('pendingAddProduct', true)
    // case Actions.ADD_PRODUCT_LOADING_TRUE:
    //   return state.set('pendingAddProduct', true)
    case Actions.ADD_PRODUCT_LOADING_FALSE:
      return state.set('pendingAddProduct', false)
    case Actions.SIGN_UP_WITH_EMAIL_ERROR:
      const errorSignUp = notificationMessage(action.payload);
      return state
        .set('pending', false)
        .set('signUpError', fromJS(errorSignUp));

    case Actions.SIGN_OUT_SUCCESS:
      return initState;
    case Actions.CHANGE_EMAIL:
      return state.set('pendingChangeEmail', true).set('changeMailError', {
        message: '',
        errors: {},
      });
    case Actions.CHANGE_EMAIL_SUCCESS:
      return state.set('pendingChangeEmail', false);
    case Actions.CHANGE_PASSWORD:
      return state
        .set('pendingChangePassword', true)
        .set('changePasswordError', fromJS(initError));
    case Actions.CHANGE_PASSWORD_SUCCESS:
      return state.set('pendingChangePassword', false);
    case Actions.CHANGE_PASSWORD_ERROR:
      const errorChangePass = notificationMessage(action.payload);
      return state
        .set('pendingChangePassword', false)
        .set('changePasswordError', fromJS(errorChangePass));

    case Actions.CHANGE_EMAIL_ERROR:
      return state.set('pendingChangePassword', false);

    case Actions.FORGOT_PASSWORD:
      return state
        .set('pendingForgotPassword', true)
        .set('forgotPasswordError', fromJS(initError));

    case Actions.FORGOT_PASSWORD_SUCCESS:
      return state.set('pendingForgotPassword', false);
    case Actions.FORGOT_PASSWORD_ERROR:
      const errorForgotPass = notificationMessage(action.payload);
      return state
        .set('pendingForgotPassword', false)
        .set('forgotPasswordError', fromJS(errorForgotPass));

    case Actions.GET_CUSTOMER:
      return state.set('pendingGetCustomer', true);
    case Actions.GET_CUSTOMER_SUCCESS:
      return state
        .set('pendingGetCustomer', false)
        .set('shippingAddress', fromJS(action?.payload?.shippingAddress))
        .set('billingAddress', fromJS(action?.payload?.billingAddress));
    case Actions.GET_USER_DETAIL_SUCCESS:
      return state.set('userDetails', action?.payload)
    case Actions.GET_USER_DETAIL_LOADER:
      return state.set('userDetailsLoader', true)
    case Actions.GET_USER_DETAIL_LOADER_SUCCESS:
      return state.set('userDetailsLoader', false)
    case Actions.GET_USER_DETAIL_LOADER_ERROR:
      return state.set('userDetailsLoader', false)
    case Actions.GET_SELLER_DETAILS_SUCCESS:
      return state
        .set('sellerData', action?.payload);

    case Actions.GET_CUSTOMER_ERROR:
      return state.set('pendingGetCustomer', false);
    case Actions.UPDATE_CUSTOMER:
      return state.set('pendingUpdateCustomer', true);
    case Actions.REGISTER_OREO_USER:
      return state.set('pending', true);
    case Actions.REGISTER_OREO_USER_SUCCESS:
    case Actions.REGISTER_OREO_USER_ERROR:
      return state.set('pending', false);
    case Actions.UPDATE_CUSTOMER_SUCCESS:
    case Actions.UPDATE_CUSTOMER_ERROR:
      return state.set('pendingUpdateCustomer', false);
    case Actions.UPDATE_USER_SUCCESS:
      const userOld = state.get('user');
      const user = {
        ...userOld.toJS(),
        ...action.payload,
      };
      return state.set('user', fromJS(user));
    case Actions.UPDATE_SHIPPING_ADDRESS_SUCCESS:
      return state.set('shippingAddress', fromJS(action.payload));
    case REHYDRATE:
      if (action.payload && action.payload.auth) {
        // Restore only user and isLogin state
        const { auth } = action.payload;
        return initState.merge(
          fromJS({
            user: auth.get('user'),
            token: auth.get('token'),
            isLogin: auth.get('isLogin'),
            shippingAddress:
              auth.get('shippingAddress') || fromJS(shippingAddressInit),
            billingAddress:
              auth.get('billingAddress') || fromJS(billingAddressInit),
          }),
        );
      } else {
        return state;
      }
    case 'UPDATE_DEMO_CONFIG_SUCCESS':
      return initState;
    case Actions.GET_LIST_FILE_DOWNLOAD:
      return state.set('files', {
        data: [],
        loading: true,
        error: true,
        refreshing: false,
      });
    case Actions.GET_LIST_FILE_DOWNLOAD_SUCCESS:
      return state.set('files', {
        data: fromJS(action.payload),
        loading: false,
        error: false,
        refreshing: false,
      });
    case Actions.GET_LIST_FILE_DOWNLOAD_ERROR:
      return state.set('files', {
        data: [],
        loading: false,
        error: false,
        refreshing: false,
      });
    case Actions.UPDATE_USER_LOGO:
      return state.set('pendingUserLogo', true);
    case Actions.UPDATE_USER_LOGO_SUCCESS:
    case Actions.UPDATE_USER_LOGO_ERROR:
      return state.set('pendingUserLogo', false);
    default:
      return state;
  }
}
