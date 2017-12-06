import fetch from 'isomorphic-fetch'
import utils from '../common/utils'

const GET_OPTION = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
}

let plat = utils.platId()

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

const isProd = process.env.NODE_ENV === 'product' || process.env.NODE_ENV === 'production'
const isStage = process.env.NODE_ENV === 'stage'
const port = (isProd || isStage) ? 7042 : 8080
// let baseurl = 'http://10.6.112.49:8080/' // wwh27791本地IP
let baseurl = ``
// let baseurl = 'http://10.6.66.200:8080/'

if (process.browser) {
  baseurl = `${window.location.origin}/`
}

if (isProd || isStage) {
  baseurl = `${baseurl}qqflightnew/`
}

// /**
//  * 获取航线列表信息
//  * @param  object params 航线信息查询参数
//  * @return Promise       接口返回的JSON格式数据
//  */
// export function fetchFlightList(params) {
//   let from = params.from === 'BJS' ? 'PEK' : params.from
//   let to = params.to === 'BJS' ? 'PEK' : params.to
//   let openid = params.openid
//   return fetch(`${baseurl}json/getflightlist.html?SearchDate=${params.date}&ArriveAirportCode=${to}&OriginAirportCode=${from}&GetType=0&Plat=${plat}&OpenId=${openid}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }

// /**
//  * 获取低价日历信息
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function fetchPriceCalendar(params) {
//   let from = params.from === 'BJS' ? 'PEK' : params.from
//   let to = params.to === 'BJS' ? 'PEK' : params.to
//   let startDate = params.startDate
//   let endDate = params.endDate
//   return fetch(`${baseurl}json/PriceCalendar.html?StartPort=${from}&Endport=${to}&QueryBegDate=${startDate}&QueryEndDate=${endDate}&Plat=${plat}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /**
//  * 创建临时单接口
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function createTempOrder(params) {
//   return fetch(`${baseurl}json/book2detail.html`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   })
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /**
//  * 查询邮寄地址接口
//  * @param  {[type]} openid      [description]
//  * @param  {[type]} session_key [description]
//  * @return {[type]}             [description]
//  */
// export function fetchMailList(openid, session_key) {
//   return fetch(`${baseurl}json/querymailaddress.html?plat=${plat}&openid=${openid}&session_key=${session_key}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
// /**
//  * 保存邮寄地址接口
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function saveAddress(params) {
//   let getParams = `?plat=${plat}`
//   for(let item in params) {
//     getParams += `&${item}=${params[item]}`
//   }
//   return fetch(`${baseurl}json/savemailaddress.html${getParams}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /**
//  * 删除邮寄地址接口
//  * @param  {[type]} mid         [会员id]
//  * @param  {[type]} mailid      [邮寄id]
//  * @param  {[type]} openid      [description]
//  * @param  {[type]} session_key [description]
//  * @return {[type]}             [description]
//  */
// export function deleteAddress(mid, mailid, openid, session_key) {
//   return fetch(`${baseurl}json/dltmailaddress.html?plat=${plat}&mid=${mid}&mailid=${mailid}&openid=${openid}&session_key=${session_key}`)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /**
//  * 获取省市区级联接口
//  * @param  {[type]} typeId [description]
//  * @param  {[type]} pid    [description]
//  * @return {[type]}        [description]
//  */
// export function fetchAddress(typeId, pid) {
//   return fetch(`${baseurl}json/getcitymenu.html?&plat=${plat}&typeId=${typeId}&pid=${pid}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
// /*乘机人相关功能 start*/
// /**
//  * 获取乘客列表
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function fetchPassgerList(params){
//   return fetch(`${baseurl}json/querylinker.html?openid=${params.openid}&session_key=${params.session_key}&plat=${params.plat}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
// /**
//  * 新增/修改乘机人信息
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function savePassger(params){
//   return fetch(`${baseurl}json/savelinker.html?LinkerId=${params.LinkerId}&mid=${params.mid}&LinkerName=${params.LinkerName}&LinkerType=${params.LinkerType}&Sex=${params.Sex}&Birthday=${params.Birthday}&CardType=${params.CardType}&CardNo=${params.CardNo}&openid=${params.openid}&session_key=${params.session_key}&plat=${params.plat}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /**
//  * 删除乘机人
//  * @param  {[type]} params [description]
//  * @return {[type]}        [description]
//  */
// export function deletePassger(params){
//   return fetch(`${baseurl}json/dltlinker.html?LinkerId=${params.LinkerId}&mid=${params.mid}&LinkerName=${params.LinkerName}&LinkerType=${params.LinkerType}&openid=${params.openid}&session_key=${params.session_key}&plat=${params.plat}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// /*乘机人相关功能 end*/
//
// export function toCheckRepeat(params) {
//   return fetch(`${baseurl}json/checkwxrepeatpassenger.html`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   })
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
//
// export function submitOrder(params) {
//   return fetch(`${baseurl}json/submitorder.html`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(params)
//   })
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
// // export function submitOrder(params) {
// //   return fetch(`${baseurl}json/submitorder.html?Openid=${params.Openid}&Session_Key=${params.Session_Key}&Plat=${params.Plat}&UserRedPacket=${params.UserRedPacket}&OrderSerialId=${params.OrderSerialId}&LinkMobile=${params.LinkMobile}&LinkMan=${params.LinkMan}&InsuranceCodeDesc=${params.InsuranceCodeDesc}&DelayCodeDesc=${params.DelayCodeDesc}&HKZHInsureCodeDesc=${params.HKZHInsureCodeDesc}&Plist=${params.Plist}&IsNeedSend=${params.IsNeedSend}`,GET_OPTION )
// //   .then(checkStatus)
// //   .then(response => {
// //     return response.json()
// //   })
// // }
//
// export function cancelOrder(params) {
//   return fetch(`${baseurl}json/cancelorder.html?serialId=${params.serialId}&openid=${params.openid}&session_key=${params.session_key}&plat=${params.plat}`, GET_OPTION)
//   .then(checkStatus)
//   .then(response => {
//     return response.json()
//   })
// }
// /**
//  * 支付前验证
//  * @param  Object params 支付前验证查询参数
//  * @return Promise        接口返回的JSON格式数据
//  */
// export function beforePayCheck(params) {
//     return fetch(`${baseurl}json/beforepaycheck.html`,{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(params)
//     })
//     .then(checkStatus)
//     .then(response => {
//         return response.json()
//     })
// }
// /**
//  * 获取支付详情
//  * @param  Object params 获取支付详情查询参数
//  * @return Promise        接口返回的JSON格式数据
//  */
// export function fetchCheckstand(params) {
//     return fetch(`${baseurl}json/getpayorderinfo.html?OrderSerialId=${params.OrderSerialId}&OpenId=${params.OpenId}&Session_key=${params.Session_key}&Plat=${params.Plat}`, GET_OPTION)
//     .then(checkStatus)
//     .then(response => {
//         return response.json()
//     })
// }
// /**
//  * 获取预订成功页订单信息
//  * @param  object params 订单信息查询参数
//  * @return Promise       接口返回的JSON格式数据
//  */
// export function fetchOrderSuccessInfo(params) {
//   return fetch(`${baseurl}json/getpaysucessinfo.html?OrderSerialId=${params.OrderSerialId}&OpenId=${params.OpenId}&Session_key=${params.Session_key}&Plat=${params.Plat}&BackSerialId=${params.BackSerialId}`, GET_OPTION)
//           .then((response) => {
//         return response.json();
// })
// }
