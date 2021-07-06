import queryString from 'query-string';
import request from 'src/utils/fetch';
import { PLUGIN_NAME } from 'src/config/development';
import configApi from '../../config/api'
/**
 * API login with email and password
 * @param username
 * @param password
 * @returns {Promise<unknown>}
 */
export const loginWithEmail = ({ username, password }) =>
  request.post(configApi.login, { username, password });

export const registerWithEmail = (inputData) =>
  request.post(configApi.register, inputData);

export const addProduct = (inputData) =>
  request.post(configApi.products, inputData);

export const becomeASeller = (inputData) =>
  request.update(configApi.addSeller, inputData);

export const updateSeller = (inputData) =>
  request.update(configApi.updateSeller, inputData);

export const getSellerData = (inputData) =>
  request.get1(configApi.getSeller, inputData);

export const updateCustomer = (data) =>
  request.update(configApi.update, data);
/**
 * Login with Firebase
 * @param idToken Firebase user id token
 * @returns {Promise<unknown>}
 */
export const loginWithMobile = (idToken) =>
  request.post(`/${PLUGIN_NAME}/v1/login-otp`, { idToken });

export const loginWithFacebook = (token) =>
  request.post(`/${PLUGIN_NAME}/v1/facebook`, { token });

export const loginWithGoogle = (user) =>
  request.post(`/${PLUGIN_NAME}/v1/google`, user);

export const loginWithApple = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/apple`, data);



export const forgotPassword = (user_login) =>
  request.post(`/${PLUGIN_NAME}/v1/lost-password`, { user_login });

export const changePassword = ({ password_old, password_new }) =>
  request.post(`/${PLUGIN_NAME}/v1/change-password`, {
    password_old,
    password_new,
  });

export const changeEmail = ({ u_password, u_email }) =>
  request.patch('users/change-email', { u_password, u_email });



export const getCustomer = (user_id) =>
  request.get(`/wc/v3/customers/${user_id}`);

export const logout = () => request.get(`/${PLUGIN_NAME}/v1/logout`);

export const isLogin = () => request.get(`/${PLUGIN_NAME}/v1/current`);

export const checkPhoneNumber = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/check-phone-number`, data);

export const checkInfo = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/check-info`, data);

// Digits API

export const digitsCreateUser = (data) =>
  request.post('/digits/v1/create_user', queryString.stringify(data));

export const digitsLoginUser = (data) =>
  request.post('/digits/v1/login_user', queryString.stringify(data));

export const digitsRecoveryUser = (data) =>
  request.post('/digits/v1/recovery', queryString.stringify(data));

export const digitsLogoutUser = () => request.post('/digits/v1/logout');

export const digitsUpdatePhone = (data) =>
  request.post('/digits/v1/update_phone', queryString.stringify(data));

export const digitsSendOtp = (data) =>
  request.post('/digits/v1/send_otp', queryString.stringify(data));

export const sendOtp = (data) =>
  request.post('/digits/v1/send_otp', queryString.stringify(data));

export const digitsReSendOtp = (data) =>
  request.post('/digits/v1/resend_otp', queryString.stringify(data));

export const digitsVerifyOtp = (data) =>
  request.post('/digits/v1/verify_otp', queryString.stringify(data));

export const getFilesDownload = (user_id) =>
  request.get(`/wc/v3/customers/${user_id}/downloads`);

export const updateSellerLogo = (data) =>
  request.post(configApi.uploadSellerLogo, data);

export const uploadCustomerLogo = (data) =>
  request.post(configApi.uploadCustomerLogo, data);