import cj from 'crypto-js'
import qs from 'query-string'

const BaseAPI = `http://floor.huluxia.com`

/**
 * 创建api
 */
const createAPI = (path: string): string => {
  const q = qs.stringify({
    "platform":    "2",
		"gkey":        "000000",
		"app_version": "4.0.0.6.2", // 版本号可能会旧
		"versioncode": "20141433",
		"market_id":   "floor_huluxia",
		"device_code": "%5Bw%5D02%3A00%3A00%3A00%3A00%3A00-%5Bi%5D008796755300310",
  })
  return `${ BaseAPI }${ path }?${ q }`
}

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const Login = (username: string, password: string): Promise<any> => {
  const md5 = cj.MD5(password)
  return new Promise(res=> {
    uni.request({
      method: `POST`,
      url: createAPI(`/account/login/ANDROID/4.0`),
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      dataType: `JSON`,
      data: {
        account: username,
        password: md5,
        login_type: 2,
      },
      success: x=>{
        res(x.data)
      },
      fail: err=> {
        console.error(err)
        res(false)
      },
    })
  })
}

/**
 * 验证登录
 * @param token key
 */
export const CheckLogin = (token: string) => {
  return new Promise(res=> {
    uni.request({
      method: `GET`,
      dataType: `JSON`,
      url: createAPI(`/user/status/ANDROID/2.1`),
      data: {
        "_key": token
      },
      success: x=> {
        res(x.data)
      },
      fail: err=> {
        console.error(err)
        res(false)
      }
    })
  })
}

/**
 * 获取分类板块
 */
export const GetCategoryList = ()=> {
  return new Promise(res=> {
    uni.request({
      dataType: `JSON`,
      url: createAPI(`/category/list/ANDROID/2.0`),
      success: x=> {
        res(x.data)
      },
      fail: err=>{
        console.error(err)
        res(false)
      }
    })
  })
}

/**
 * 签到
 * @param catID id
 */
export const HandleSignin = (catID: string, token: string)=> {
  return new Promise(res=>{
    uni.request({
      dataType: `JSON`,
      url: createAPI(`/user/signin/ANDROID/4.0`),
      data: {
        '_key': token,
        'cat_id': catID,
      },
      success: x=>{
        res(x.data)
      },
      fail: err=> {
        console.log(err)
        res(false)
      }
    })
  })
}