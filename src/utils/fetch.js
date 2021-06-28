import { isImmutable } from 'immutable';

import globalConfig from './global';
import configApi from '../config/api';
import axios from 'axios'
import { AsyncStorage } from 'react-native';

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const _getToken = () => {
  return new Promise(async (next, error) => {
    let x = await AsyncStorage.getItem('token')
    next({ 'headers': { 'Authorization': 'Bearer ' + x } })
  })
}
const get = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

    const isWC = url.indexOf('/wc') === 0;
    const isQuery = url.indexOf('?') >= 0;
    const isAuth =
      url.indexOf('/mobile-builder') === 0 || url.indexOf('/dokan') === 0;

    if (isWC) {
      baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY
        }&consumer_secret=${configApi.CONSUMER_SECRET}`;
    }

    fetch(baseURL, {
      ...options,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          isAuth && globalConfig.getToken()
            ? `Bearer ${globalConfig.getToken()}`
            : undefined,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          reject(new Error(data.message));
        } else {
          resolve(data);
        }
      })
      .catch((error) => {
        return error;
      });
  });
};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
// const post = (url, data, method = 'POST') => {
//   return new Promise((resolve, reject) => {
//     // To JS Object
//     // if (isImmutable(data)) {
//     //   data = data.toJS();
//     // }
//     console.log("url data",url, data)
//     let baseURL = configApi.API_ENDPOINT  + url;

//     // const isWC = url.indexOf('/wc') === 0;
//     // const isDigits = url.indexOf('/digits') === 0;
//     // const isQuery = url.indexOf('?') >= 0;
//     // const isAuth =
//     //   url.indexOf('/mobile-builder') === 0 || url.indexOf('/dokan') === 0;

//     // if (isWC || isDigits) {
//     //   baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${
//     //     configApi.CONSUMER_KEY
//     //   }&consumer_secret=${configApi.CONSUMER_SECRET}`;
//     // }

//     fetch(baseURL, {
//       method: method,
//       // headers: {
//       //   Accept: 'application/json',
//       //   Authorization:
//       //     isAuth && globalConfig.getToken()
//       //       ? `Bearer ${globalConfig.getToken()}`
//       //       : null,
//       //   'Content-Type': isDigits
//       //     ? 'application/x-www-form-urlencoded;charset=UTF-8'
//       //     : 'application/json',
//       // },
//       body: JSON.stringify(data)
//     })
//       // .then((res) => res.json())
//       .then((res) => {
//         console.log("result",res?.data)
//         if (res.code) {
//           if (isDigits && (res.code === '1' || res.code === 1)) {
//             resolve(res.json());
//           } else {
//             reject(new Error(res.message));
//           }
//         } else {
//           resolve(res.json());
//         }
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
const update = (url, data, method = 'POST') => {

  return new Promise(async (next, error) => {
    const token = await _getToken()
    axios.post(url, { ...data }, token).then((d) => {
      next(d.data)
    }).catch((err) => {
      next({ err })
    })

  })
};
const get1 = (url, data, method = 'GET') => {

  return new Promise(async (next, error) => {
    const token = await _getToken()

    axios.get(url, token).then((d) => {
      next(d.data)
    }).catch((err) => {
      console.log("ERRROR", err)
      next({ err })
    })

  })
};
const post = (url, data, method = 'POST') => {
  return new Promise(async (next, error) => {
    const token = await _getToken()
    axios.post(url, { ...data }, token).then((d) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!",d?.data)
      next(d.data)
    }).catch((err) => {
      console.log("ERRRRr", err)
      next({ err })
    })

  })
};

export default {
  get1,
  get,
  post,
  update,
  put: (url, data) => post(url, data, 'PUT'),
};
