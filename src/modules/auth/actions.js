import * as Actions from './constants';

/**
 * Action login
 * @param username
 * @param password
 * @returns {{type: string, username: *, password: *}}
 */
export function signInWithEmail({ username, password }) {
  return {
    type: Actions.SIGN_IN_WITH_EMAIL,
    username,
    password,
  };
}
export function becomeASeller(data, cb = () => { }) {
  return {
    type: Actions.BECOME_A_SELLER,
    payload: { data, cb }
  };
}
export function updateSeller(data) {
  return {
    type: Actions.UPDATE_SELLER,
    payload: data
  };
}

/**
 * Action login mobile
 * @param tokenId
 * @returns {{type: string, tokenId}}
 */
export function signInWithMobile(tokenId) {
  return {
    type: Actions.SIGN_IN_WITH_MOBILE,
    tokenId,
  };
}

/**
 * Action register
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function signUpWithEmail(data) {
  return {
    type: Actions.SIGN_UP_WITH_EMAIL,
    payload: {
      data,
    },
  };
}
export function addProduct(data) {
  return {
    type: Actions.ADD_PRODUCT,
    payload: {
      data,
    },
  };
}
export function getCategories(cb = () => { }) {
  return {
    type: Actions.GET_CATEGORY_LIST,
    cb
  };
}
export function getHomeCategories(data) {
  return {
    type: Actions.GET_HOME_CATEGORIES,
    payload :{
      data
    }
  };
}
export function getHomeVendors(data) {
  return {
    type: Actions.GET_HOME_VENDORS,
    payload :{
      data
    }
  };
}
export function getProductByVendor(data) {
  return {
    type: Actions.GET_PRODUCT_BY_VENDOR,
    payload :{
      data
    }
  };
}
export function getNewArrivals(data) {
  return {
    type: Actions.GET_HOME_NEW_ARRIVALS,
    payload :{
      data
    }
  };
}


/**
 * Login with google
 * @param idToken
 * @returns {{type: string, payload: {data: *}}}
 */
export function signInWithGoogle(idToken) {
  return {
    type: Actions.SIGN_IN_WITH_GOOGLE,
    payload: {
      idToken,
    },
  };
}

/**
 * Action login google cancel
 */
export function signInWithGoogleCancel() {
  return {
    type: Actions.SIGN_IN_WITH_GOOGLE_CANCEL,
  };
}

/**
 * Action login by Facebook
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function signInWithFacebook(data) {
  return {
    type: Actions.SIGN_IN_WITH_FACEBOOK,
    payload: {
      data,
    },
  };
}

/**
 * Action login facebook cancel
 */
export function signInWithFacebookCancel() {
  return {
    type: Actions.SIGN_IN_WITH_GOOGLE_CANCEL,
  };
}

/**
 * validate login
 * @returns {{type: string}}
 */
export function isLogin() {
  return {
    type: Actions.IS_LOGIN,
  };
}

/**
 * Get seller data
 * @param cb
 * @returns {{type: string, payload: { cb: *}}}
 */
export function getSellerDetails(cb = () => { }) {
  return {
    type: Actions.GET_SELLER_DETAILS,
    cb
  };
}
export function getUserDetails(cb = () => { }) {
  return {
    type: Actions.GET_USER_DETAILS,
    cb
  };
}

export function forgotPassword(email) {
  return {
    type: Actions.FORGOT_PASSWORD,
    email,
  };
}

export function checkAuth() {
  return {
    type: Actions.CHECK_AUTH,
  };
}

/**
 * Change email action
 * @param u_password
 * @param u_email
 * @returns {{type: string, payload: {password: *, email: *}}}
 */
export function changeEmail({ u_password, u_email }) {
  return {
    type: Actions.CHANGE_EMAIL,
    payload: {
      u_password,
      u_email,
    },
  };
}

/**
 * Get customer
 * @param id
 * @param cb
 * @returns {{type: string, payload: {id: *, cb: *}}}
 */
export function fetchCustomer(id, cb = () => { }) {
  return {
    type: Actions.GET_CUSTOMER,
    payload: {
      id,
      cb
    },
  };
}

/**
 * Update customer
 * @param data
 * @returns {{type: string, payload: {data: *, cb: *}}}
 */
export function updateCustomer(data, cb = () => { }) {
  return {
    type: Actions.UPDATE_CUSTOMER,
    payload: {
      data,
      cb,
    },
  };
}

/**
 * Update user
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function updateShippingAddressSuccess(data) {
  return {
    type: Actions.UPDATE_SHIPPING_ADDRESS_SUCCESS,
    payload: data,
  };
}

/**
 * Update user
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function updateUserSuccess(data) {
  return {
    type: Actions.UPDATE_USER_SUCCESS,
    payload: data,
  };
}

/**
 * Change password action
 * @param data
 * @returns {{type: string, payload: object}}
 */
export function changePassword(data) {
  return {
    type: Actions.CHANGE_PASSWORD,
    payload: data,
  };
}

/**
 * Action sign out
 * @returns {{type: string}}
 */
export function signOut() {
  return {
    type: Actions.SIGN_OUT,
  };
}

/**
 * SignIn with Apple
 * @param identityToken
 * @param user
 * @returns {{payload: {identityToken: *, user: *}, type: string}}
 */
export function signInWithApple(payload) {
  return {
    type: Actions.SIGN_IN_WITH_APPLE,
    payload,
  };
}

/**
 * Sign Up with OTP
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function signUpWithOtp(data) {
  return {
    type: Actions.SIGN_UP_WITH_OTP,
    payload: {
      data,
    },
  };
}

/**
 * Sign In with OTP
 * @param data
 * @returns {{payload: {identityToken: *, user: *}, type: string}}
 */
export function signInWithOtp(data) {
  return {
    type: Actions.SIGN_IN_WITH_OTP,
    payload: {
      data,
    },
  };
}

/**
 * Get List file download of user
 * @param data
 * @returns {{type: string, payload: *}}
 */
export function getFilesDonwload() {
  return {
    type: Actions.GET_LIST_FILE_DOWNLOAD,
    payload: {},
  };
}

/**
 * Update seller logo
 * @param data
 * @returns {{type: string, payload: {data: *, cb: *}}}
 */
export function updateUserLogo(data, cb = () => { }) {
  return {
    type: Actions.UPDATE_USER_LOGO,
    payload: {
      ...data,
      cb,
    },
  };
}


export function updateUserLogoSuccess() {
  return {
    type: Actions.UPDATE_USER_LOGO_SUCCESS
  };
}