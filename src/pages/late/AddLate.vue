<template>
    <div>
        <el-dialog
            title="添加晚归记录"
            :visible.sync="dialogVisible"
            width="850px"
            :before-close="handleClose"
        >
            <div class="form-wrapper">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="username">
                                <el-input v-model="username" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentno">
                                <el-input v-model="ruleForm.studentno" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="晚归时间" prop="time">
                                <el-date-picker
                                    v-model="ruleForm.time"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="晚归原因" prop="reason">
                                <el-input v-model="ruleForm.reason" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <div class="btn-wrapper">
                            <el-button size="medium" type="primary" @click="postAddLate">保存</el-button>
                            <el-button size="medium" @click="handleCloseDialogClick">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                ruleForm: {

                },
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
        methods: {
            postAddLate(){
                this.$emit('postAddLate',this.ruleForm)
            },
            handleCloseDialogClick(){
                this.$emit('handleCloseDialogClick')
            },
            handleClose(){
                this.$emit('handleClose')
            },         
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