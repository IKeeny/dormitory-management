<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
        
        <div class="app-content-wrapper">
        <!-- 搜索条件 -->
        <div class="options-wrapper">
            <el-form :inline="true" :model="options" class="demo-form-inline">
                <el-form-item label="姓名：">
                    <el-input v-model="options.name" size="medium" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="学号：">
                    <el-input v-model="options.studentno" size="medium" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作条件 -->
        <div class="operator-wrapper">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addStudent">添加</el-button>
            <el-button size="medium" icon="el-icon-s-home">导出</el-button>
        </div>

        <!-- 表格数据 -->
        <div class="table-wrapper" v-loading="loading">
            <el-table
                ref="multipleTable"
                :data="tableData"
                height="250"
                tooltip-effect="dark"
                :show-overflow-tooltip="true"         
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="姓名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="studentno"
                    label="学号"
                    width="100">
                </el-table-column>
                <el-table-column
                    prop="gender"
                    label="性别"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="apartment"
                    label="楼栋"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="dormno"
                    label="宿舍号"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="电话号码"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="grade"
                    label="年级"
                    width="80">
                </el-table-column>
                <el-table-column
                    prop="major"
                    label="专业"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="department"
                    label="学院"
                    width="120">
                </el-table-column>
                <el-table-column prop="name" label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="editStudent(scope.row.studentno)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteStudent(scope.row.studentno)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页 -->
        <div class="pager-wrapper">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, prev, pager, next, sizes, jumper"
                :page-sizes="[3, 5, 10, 20]"
                :total="pager.total"
                :page-size="pager.size"
                :current-page="pager.page"
            >
            </el-pagination>
        </div>
        </div>

        <!-- 添加学生 -->
        <AddStudent
            :dialogVisible="addDialogVisible"
            v-if="addDialogVisible"
            @postAddStudent="postAddStudent"
            @handleCloseDialogClick="addDialogVisible = false"
            @handleClose="addDialogVisible = false"
        /> 

        <!-- 编辑学生 -->
        <EditStudent
            :dialogVisible="editDialogVisible"
            :studentno="editStudentno"
            v-if="editDialogVisible"
            @postEditStudent="postEditStudent"
            @handleCloseDialogClick="editDialogVisible = false"
            @handleClose="editDialogVisible = false"
        /> 
    </div>
</template>

<script>
    import AddStudent from './AddStudent'
    import EditStudent from './EditStudent'
    import { postAddStudent,postDeleteStudent,getStudentList,postUpdateStudent,getUserInfo } from '@/api/user'
    import { getMajor } from '@/api/college'

    export default {
        name: 'Student',
        components: {
            AddStudent,
            EditStudent
        },
        data() {
            return {
                options: {
                    name: '',
                    studentno: '',
                },
                loading: true,
                tableData: [],
                // tableData: [{
                //     studentno: 201701, //学号
                //     username: '小白',
                //     password: '123456bai',
                //     gender: '女',
                //     phone: '13658367960',
                //     dorm: '明理苑7舍310', //宿舍号
                //     type: 'student',  //是否是管理员
                //     grade: '2017',  //年级
                //     majorno: 24101,
                //     status: 1,
                //     major: '会计学',  //专业,
                //     department: '经济管理学院'
                // }],
                pager: {
                    total: 8,
                    size: 10,
                    page: 1
                },
                addDialogVisible: false,
                studentInfo: [],
                editDialogVisible: false,
                editRuleForm: {},
                //传给编辑对话框
                editStudentno: ''
            }
        },
        mounted(){
            this.getStudentAll()
        },
        methods: {
            //获取所有学生信息
            getStudentAll(){
                getStudentList({
                    page: this.pager.page,
                    size: this.pager.size
                }).then(res=>{
                    if(res.data.code === 200){
                        // console.log('所有学生信息',res)
                        this.tableData = res.data.data.list
                        this.pager.total = res.data.data.total
                        this.getMajor()
                    }
                })
            },
            //获取专业信息
            getMajor(){
                this.tableData.map((item,index)=>{
                    getMajor({majorno:item.majorno}).then((res)=>{
                        if(res.data.code === 200){
                            item = Object.assign(item,res.data.data)
                            this.$set(this.tableData,index,item)
                            this.loading = false
                        }                       
                    })
                })
                console.log('表格数据',this.tableData)
            },
            //显示添加学生的对话框
            addStudent() {
                this.addDialogVisible = true
            },
            //添加学生
            postAddStudent(ruleForm){
                postAddStudent(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.getStudentAll()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    this.addDialogVisible = false
                })
            },
            //编辑学生
            editStudent(studentno){
                this.getStudent(studentno)
                this.editStudentno = studentno
                this.editDialogVisible = true
            },
            getStudent(studentno){
                getUserInfo({
                    studentno:studentno
                }).then((res)=>{
                    console.log('根据学号获取的学生信息啊啊啊',res.data.data)
                })
            },
            postEditStudent(ruleForm){
                postUpdateStudent(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.getStudentAll()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    this.editDialogVisible = false
                })
            },
            //删除学生
            deleteStudent(studentno){
                this.$confirm('此操作将永久删除该学生, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    postDeleteStudent({studentno:studentno}).then((res)=>{
                        if(res.data.code === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.getStudentAll()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                })          
            },
            onSearch(){
                getStudentList({
                    username: this.options.name,
                    studentno: this.options.studentno,
                    page: this.pager.page,
                    size: this.pager.size
                }).then((res)=>{
                    if(res.data.code === 200){
                        console.log('查询到的结果列表',res.data)
                        this.tableData = res.data.data.list
                        this.pager.total = res.data.data.total              
                        this.getMajor()
                    }
                })
            },
            handleSelectionChange(){},
            //每页显示的个数变化
            handleSizeChange(val){
                this.pager.size = val
                this.onSearch()
            },
            //页码变化
            handleCurrentChange(val){
                this.pager.page = val
                this.onSearch()
            }
        }
    }
</script>

<style lang="scss" scoped>
.app-content-wrapper{
    height:100%;
    overflow: auto
}
</style>