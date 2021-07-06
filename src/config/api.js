export const API = 'https://wc2.rnlab.io';
export const NEWAPI = 'http://93.188.162.144/oreo/v1/'

export const CONSUMER_KEY = 'ck_9a40d82e47c124bc1be422682dd93eb25bdb5e3a';
export const CONSUMER_SECRET = 'cs_01bd2047d4ea33bdb4b6d8f6f034e0e072abdf4a';

export default {
  API_ENDPOINT: API,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  login: NEWAPI + 'auth/login',
  update: NEWAPI + 'profie/update',
  register : NEWAPI + 'auth/signup',
  addSeller : NEWAPI + 'seller/add',
  getSeller : NEWAPI + 'seller',
  updateSeller: NEWAPI + 'seller/update',
  products: NEWAPI + 'products/add',
  uploadSellerLogo : NEWAPI + 'seller/upload-logo',
  uploadCustomerLogo : NEWAPI + 'profile/upload-image',
};
