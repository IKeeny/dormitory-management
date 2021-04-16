<template>
    <div>
        <el-dialog
            title="添加学生"
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
                            <el-form-item label="性别" prop="gender">
                                <el-radio-group v-model="ruleForm.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="楼栋宿舍" prop="apartment">
                                <el-cascader 
                                    :options="dormOptions" 
                                    :props="dormProps"
                                    @change="selectedDorm">
                                </el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="电话号码" prop="phone">
                                <el-input v-model="ruleForm.phone" placeholder="请输入"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="年级" prop="grade">
                                <el-select v-model="ruleForm.grade" placeholder="请选择">
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
                            <el-button size="medium" type="primary" @click="postAddStudent">保存</el-button>
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
    import { getDormList } from '@/api/dorm'
    import { validatePhone } from '@/utils/validateInput'
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
                    gender: '男'
                },
                dorm: {},
                rules: {
                    username: [
                        { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    ],
                    studentno: [
                        { required: true, message: '请输入学生学号', trigger: 'blur' }              
                    ],
                    dormno: [
                        { required: true, message: '请先选择楼栋', trigger: 'blur' }              
                    ],
                    // phone: [
                    //     { required: true, validator: validatePhone, trigger: 'blur' }
                    // ],
                    // majorno: [
                    //     { required: true, message: '请选择专业', trigger: 'blur' }
                    // ]
                },
                //楼栋宿舍选择
                dormOptions: [],
                dormProps: {
                    expandTrigger:'hover',
                    emitPath: false
                },
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
            this.getDorm()
        },
        methods: {
            postAddStudent(){
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
            //获取宿舍信息并转换成相应格式    
            getDorm(){
                getDormList().then(res=>{
                    if(res.data.code === 200){
                        let dormList = res.data.data.list
                        
                        let newArr = []
                        dormList.forEach(dorm=>{
                            let index = -1
                            let isExists = newArr.some((item,i)=>{
                                if(item.label === dorm.apartment){
                                    index = i
                                    return true
                                }
                            })
                            if(!isExists){
                                newArr.push({
                                    value:dorm.apartment,
                                    label:dorm.apartment,
                                    children:[{value:dorm._id, label:dorm.dormno}]
                                })
                            }else{
                                newArr[index].children.push({value:dorm._id, label:dorm.dormno})
                            }
                        })
                        this.dormOptions = newArr
                    }
                })
            },
            selectedDorm(val){
                this.ruleForm.dormId = val
                console.log('选中的宿舍',val)
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