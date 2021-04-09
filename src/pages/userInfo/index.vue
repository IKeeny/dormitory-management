<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>

       <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row :gutter="30">
                <el-col :span="12">
                    <el-form-item label="姓名" prop="username">
                        <el-input v-model="ruleForm.username" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="学号" prop="studentno">
                        <el-input v-model="ruleForm.studentno" placeholder="请输入" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="ruleForm.gender">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼栋" prop="apartment">
                        <el-select v-model="ruleForm.apartment" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in apartmentOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="宿舍号" prop="dormno">
                        <el-select v-model="ruleForm.dormno" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in dormOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="电话号码" prop="phone">
                        <el-input v-model="ruleForm.phone" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="年级" prop="grade">
                        <el-select v-model="ruleForm.grade" placeholder="请选择" disabled>
                            <el-option
                                v-for="item in gradeOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="专业" prop="majorno">
                        <el-cascader 
                            :options="majorOptions" 
                            :show-all-levels="false"
                            :props="majorProps"
                            @change="selectedMajor">
                        </el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item>
                <div class="btn-wrapper">
                    <el-button size="medium" type="primary" @click="handleClickSave">保存</el-button>
                    <el-button size="medium" @click="handleCancle">取消</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { getUserInfo,postUpdateStudent } from '@/api/user'
    import { validatePhone } from '@/utils/validateInput'
    export default {
        data() {
            return {
                ruleForm: {
                    gender: '男'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    ],
                    studentno: [
                        { required: true, message: '请输入学生学号', trigger: 'blur' }              
                    ],
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    // majorno: [
                    //     { required: true, message: '请选择专业', trigger: 'blur' }
                    // ]
                },
                apartmentOptions: [],
                dormOptions: [],
                //年级
                gradeOptions: [
                    { label:2017, value:2017 },
                    { label:2018, value:2018 },
                    { label:2019, value:2019 },
                    { label:2020, value:2020 },
                ],
                //专业信息的级联选择器配置
                majorOptions: [],
                majorProps: {
                    expandTrigger:'hover',
                    emitPath: false
                }
            }
        },
        mounted(){
            this.getUserInfo()
        },
        methods: {
            getUserInfo(){
                let {studentno} = JSON.parse(this.$store.state.userData)
                getUserInfo({studentno:studentno}).then(res=>{
                    if(res.data.code === 200){
                        this.ruleForm = res.data.data
                    }
                })
            },
            //保存信息
            handleClickSave(){
                postUpdateStudent(this.ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.getUserInfo()
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            },
            //取消修改
            handleCancle(){
                this.$message({
                    message: '取消保存',
                    type: 'info'
                })
                this.getUserInfo()
            }
        }
    }
</script>

<style lang="scss" scoped>
.demo-ruleForm {
    margin-top: 30px;
    margin-left: -40px;
    width: 850px;
}
</style>