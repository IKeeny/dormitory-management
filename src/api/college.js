import request from '@/utils/request'

/**
 * 获取学生专业信息
 */
export const getMajor = (params) => request({
    method: 'get',
    url: `/college/major`,
    params: params
})

/**
 * 获取所有专业信息
 */
 export const getMajorAll = () => request({
    method: 'get',
    url: `/college/majorAll`,
})
