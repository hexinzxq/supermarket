/**
 * 首页相关url
 * 对request进一步封装
 */
import { request } from 'network/request';


export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type: type,
            page: page
        }

    })
}