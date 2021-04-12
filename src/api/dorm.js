import request from '@/utils/request'

/**
 *宿舍列表
 */
 export const getDormList = (params) => request({
    method: 'get',
    url: `/dorm/dormList`,
    params: params
})

/**
 *根据id获取宿舍信息
 */
 export const getDormInfo = (params) => request({
    method: 'get',
    url: `/dorm/dormInfo`,
    params: params
})

/**
 *添加宿舍记录
 */
 export const postAddDorm = (params) => request({
    method: 'post',
    url: `/dorm/addDorm`,
    data: params
})

/**
 *编辑宿舍记录
 */
 export const postEditDorm = (params) => request({
    method: 'post',
    url: `/dorm/updateDorm`,
    data: params
})

/**
 *删除晚归记录
 */
 export const postDeleteDorm = (params) => request({
    method: 'post',
    url: `/dorm/deleteDorm`,
    data: params
})



