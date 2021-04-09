import request from '@/utils/request'

/**
 * 登录
 */
export const postLogin = (params) => request({
    method: 'post',
    url: `/user/login`,
    data: params
})

/**
 * 根据条件查询学生列表
 */
 export const getStudentList = (params) => request({
    method: 'get',
    url: `/user/studentList`,
    params: params
})

/**
 * 根据学号获取用户信息
 */
 export const getUserInfo = (params) => request({
    method: 'get',
    url: `/user/studentInfo`,
    params
})


/**
 * 添加学生
 */
 export const postAddStudent = (params) => request({
    method: 'post',
    url: `/user/addStudent`,
    data: params
})

/**
 * 编辑学生
 */
export const postUpdateStudent = (params) => request({
    method: 'post',
    url: `/user/updateStudent`,
    data: params
})
/**
 * 删除学生
 */
 export const postDeleteStudent = (params) => request({
    method: 'post',
    url: `/user/deleteStudent`,
    data: params
})