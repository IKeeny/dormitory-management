import request from '@/utils/request'

/**
 *晚归记录列表
 */
 export const getLateList = (params) => request({
    method: 'get',
    url: `/late/lateList`,
    params: params
})

/**
 *根据id获取晚归信息
 */
 export const getLateInfo = (params) => request({
    method: 'get',
    url: `/late/lateInfo`,
    params: params
})

/**
 *添加晚归记录
 */
 export const postAddLate = (params) => request({
    method: 'post',
    url: `/late/addLate`,
    data: params
})

/**
 *编辑晚归记录
 */
 export const postEditLate = (params) => request({
    method: 'post',
    url: `/late/updateLate`,
    data: params
})

/**
 *删除晚归记录
 */
 export const postDeleteLate = (params) => request({
    method: 'post',
    url: `/late/deleteLate`,
    data: params
})



