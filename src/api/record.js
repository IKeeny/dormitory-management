import request from '@/utils/request'

/**
 *离返校记录列表
 */
 export const getRecordList = (params) => request({
    method: 'get',
    url: `/record/recordList`,
    params: params
})

/**
 *根据id获取记录信息
 */
 export const getRecordInfo = (params) => request({
    method: 'get',
    url: `/record/recordInfo`,
    params: params
})

/**
 *添加记录
 */
 export const postAddRecord = (params) => request({
    method: 'post',
    url: `/record/addRecord`,
    data: params
})

/**
 *编辑记录
 */
 export const postEditRecord = (params) => request({
    method: 'post',
    url: `/record/updateRecord`,
    data: params
})

/**
 *删除记录
 */
 export const postDeleteRecord = (params) => request({
    method: 'post',
    url: `/record/deleteRecord`,
    data: params
})



