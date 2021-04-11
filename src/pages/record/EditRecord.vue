<template>
    <div>
        <el-dialog
            title="编辑学生"
            :visible.sync="dialogVisible"
            width="850px"
            :before-close="handleClose"
        >
            <div class="form-wrapper">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="username">
                                <el-input v-model="username" placeholder="请输入" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentno">
                                <el-input v-model="ruleForm.studentno" placeholder="请输入" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="离校时间" prop="leavetime">
                                <el-date-picker
                                    v-model="ruleForm.leaveTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="返校时间" prop="returntime">
                                <el-date-picker
                                    v-model="ruleForm.returnTime"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <div class="btn-wrapper">
                            <el-button size="medium" type="primary" @click="postEditRecord">保存</el-button>
                            <el-button size="medium" @click="handleCloseDialogClick">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getRecordInfo } from '@/api/record'
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            recordId: '',
            username: '',
        },
        data() {
            return {
                ruleForm: {},
                username: '',
                rules: {
                    // username: [
                    //     { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    // ],
                    studentno: [
                        { required: true, message: '请输入学生学号', trigger: 'blur' }              
                    ],
                    // phone: [
                    //     { required: true, validator: validatePhone, trigger: 'blur' }
                    // ],
                    // majorno: [
                    //     { required: true, message: '请选择专业', trigger: 'blur' }
                    // ]
                },
            }
        },
        mounted(){
            
        },
        watch:{
            recordId: {
                handler(val, oldVal) {
                    console.log('旧值--',oldVal,'新值--',val)
                    this.getRecordInfo(val)
                },
                //立即执行
                immediate: true
            }, 
            username: {
                handler(val, oldVal) {
                    this.username = val
                },
                //立即执行
                immediate: true
            },  
        },
        methods: {
            //获取记录信息
            getRecordInfo(recordId){
                getRecordInfo({_id:recordId}).then((res)=>{
                    if(res.data.code === 200){
                        this.ruleForm = res.data.data
                        // console.log('没有学号吗',this.ruleForm)
                    }
                })
            },
            postEditRecord(){
                this.$emit('postEditRecord',this.ruleForm)
            },
            handleCloseDialogClick(){
                this.$emit('handleCloseDialogClick')
            },
            handleClose(){
                this.$emit('handleClose')
            }         
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/CSS/form.scss';
    .el-dialog{
        padding: 30px 20px 30px 0;
    }
    .form-wrapper{
        padding-left: 0;
        padding-top: 0;
        padding-bottom: 0;
        .el-form{
            .el-row{
                box-sizing: border-box;
            }
            .el-upload{
                width: 148px !important;
            }
        }
    }
</style>