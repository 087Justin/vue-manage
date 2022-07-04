import Mock from 'mockjs'
import homeAPI from '@/API/mockServeData/home'
import userAPI from '@/API/mockServeData/user'
import permissionAPI from '@/API/mockServeData/permission'

Mock.mock('/home/getData', homeAPI.getStatisticalData)
Mock.mock(/\/user\/add/, 'post', userAPI.createUser)
Mock.mock(/\/user\/edit/, 'post', userAPI.updateUser)
Mock.mock(/\/user\/getUser/, 'get', userAPI.getUserList)
Mock.mock(/\/user\/del/, 'get', userAPI.deleteUser)
Mock.mock(/permission\/getMenu/, 'post', permissionAPI.getMenu)
