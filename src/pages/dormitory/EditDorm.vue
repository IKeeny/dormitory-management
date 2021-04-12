<template>
    <div>
        <el-dialog
            title="编辑宿舍"
            :visible.sync="dialogVisible"
            width="850px"
            :before-close="handleClose"
        >
            <div class="form-wrapper">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="楼栋" prop="apartment">
                                <el-input v-model="ruleForm.apartment" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="宿舍号" prop="dormno">
                                <el-input v-model="ruleForm.dormno" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="床位总数" prop="bednum">
                                <el-input v-model="ruleForm.bednum" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="已用床数" prop="usedBed">
                                <el-input v-model="ruleForm.usedBed" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <div class="btn-wrapper">
                            <el-button size="medium" type="primary" @click="postEditDorm">保存</el-button>
                            <el-button size="medium" @click="handleCloseDialogClick">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getDormInfo } from '@/api/dorm'
    export default {
        props: {
            dialogVisible: {
                type: Boolean,
                default: false
            },
            dormId: '',
        },
        data() {
            return {
                ruleForm: {},
                rules: {
                    // username: [
                    //     { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    // ],
                    apartment: [
                        { required: true, message: '请输入楼栋', trigger: 'blur' }              
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
            dormId: {
                handler(val, oldVal) {
                    console.log('旧值--',oldVal,'新值--',val)
                    this.getDormInfo(val)
                },
                //立即执行
                immediate: true
            },  
        },
        methods: {
            //获取记录信息
            getDormInfo(dormId){
                getDormInfo({_id:dormId}).then((res)=>{
                    if(res.data.code === 200){
                        this.ruleForm = res.data.data
                        // console.log('没有学号吗',this.ruleForm)
                    }
                })
            },
            postEditDorm(){
                this.$emit('postEditDorm',this.ruleForm)
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