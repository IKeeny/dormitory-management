<template>
    <div>
        <el-dialog
            title="添加记录"
            :visible.sync="dialogVisible"
            width="850px"
            :before-close="handleClose"
        >
            <div class="form-wrapper">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名" prop="username">
                                <el-input v-model="ruleForm.username" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学号" prop="studentno">
                                <el-input v-model="ruleForm.studentno" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="离校时间" prop="leavetime">
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="返校时间" prop="returntime">
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <div class="btn-wrapper">
                            <el-button size="medium" type="primary" @click="postAddRecord">保存</el-button>
                            <el-button size="medium" @click="handleCloseDialogClick">取消</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import { getMajorAll } from '@/api/college'
    import { validatePhone } from '@/utils/validateInput'
    export default {
        // props: {
        //     dialogVisible: {
        //         type: Boolean,
        //         default: false
        //     }
        // },
        data() {
            return {
                dialogVisible: true,
                ruleForm: {

                },
                rules: {
                    username: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    ],
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
                apartmentOptions: [],
                dormOptions: [],
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
            this.getMajorAll()
        },
        methods: {
            postAddRecord(){
                this.$emit('postAddStudent',this.ruleForm)
            },
            handleCloseDialogClick(){
                this.$emit('handleCloseDialogClick')
            },
            handleClose(){
                this.$emit('handleClose')
            },
            //获取所有专业信息，并将数据转化成级联选择器可以用的格式
            getMajorAll(){
                getMajorAll().then(res=>{
                    console.log('所有专业信息',res)
                    let majorData = res.data.data
                    let newArr = []
                    majorData.forEach(college=>{
                        let index = -1
                        let isExists = newArr.some((item,i)=>{
                            if(item.label === college.department){
                                index = i
                                return true
                            }
                        })
                        if(!isExists){
                            newArr.push({
                                value:college.department,
                                label:college.department,
                                children:[{value:college.majorno, label:college.major}]
                            })
                        }else{
                            newArr[index].children.push({value:college.majorno, label:college.major})
                        }
                    })
                    this.majorOptions = newArr
                })
            },
            //选中的专业编号
            selectedMajor(res){
                this.ruleForm.majorno = res
                console.log(this.ruleForm)
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