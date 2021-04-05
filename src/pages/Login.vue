<template>
  <div class="login_container">
      <div class="login_box">
          <div class="text">
              <span>宿舍管理系统</span>
          </div>
          <!-- 登录表单 -->
          <el-form class="login_form" ref="loginFormRef" :rules="loginFormRules" :model="loginForm">
            <el-form-item prop="studentno">
                <el-input 
                    v-model="loginForm.studentno" 
                    prefix-icon="el-icon-user"
                />
            </el-form-item>          
            <el-form-item prop="password">
                <el-input 
                    v-model="loginForm.password" 
                    prefix-icon="el-icon-lock"
                    clearable
                    show-password
                    type="password"
                />
            </el-form-item>          
            <el-form-item class="login-button">
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
          </el-form>
      </div>
  </div>
</template>

<script>
import { postLogin } from '@/api/user'

export default {
  data() {
    return {
      //登录表单的数据绑定对象
      loginForm:{
        studentno:'',
        password:''
      },
      //验证是否合法
      loginFormRules:{
        username:[
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
      login(){
        postLogin(this.loginForm).then((res)=>{
          console.log(res)
          if(res.data.code == 200 && res.data.message === true){
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.push('/home')
          }else{
            this.$message.error(res.data.message)
          }
        })
      }
  }
}
</script>

<style lang="scss" scoped>
.login_container {
  // background: #409EFF;
  height: 100%;
}
.text {
  font-size: 28px;
  font-weight: 400;
  color: #666;
  padding: 18px 20px;
  text-align: center;
}
.login_box {
  width: 450px;
  height: 260px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  // box-shadow: 0 0 10px 0 #ebeff3;
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-button {
  width: 100%
}
</style>