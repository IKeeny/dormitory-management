<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>离返校登记</el-breadcrumb-item>
        </el-breadcrumb>

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
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addRecord">添加</el-button>
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
                    prop="leaveTime"
                    label="离校时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="returnTime"
                    label="返校时间"
                    width="150">
                </el-table-column>
                <el-table-column prop="name" label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="editRecord(scope.row)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteRecord(scope.row._id)">删除</el-button>
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

        <!-- 添加记录 -->
        <AddRecord
            :dialogVisible="addDialogVisible"
            v-if="addDialogVisible"
            @postAddRecord="postAddRecord"
            @handleCloseDialogClick="addDialogVisible = false"
            @handleClose="addDialogVisible = false"
        /> 

        <!-- 编辑记录 -->
        <EditRecord
            :dialogVisible="editDialogVisible"
            :recordId="recordId"
            :username="username"
            v-if="editDialogVisible"
            @postEditRecord="postEditRecord"
            @handleCloseDialogClick="editDialogVisible = false"
            @handleClose="editDialogVisible = false"
        /> 
    </div>
</template>

<script>
    import AddRecord from './AddRecord'
    import EditRecord from './EditRecord'
    import { getUserInfo } from '@/api/user'
    import { getRecordList,postAddRecord,postEditRecord,postDeleteRecord } from '@/api/record'
    export default {
        components: {
            AddRecord,
            EditRecord
        },
        data() {
            return {
                options: {},
                loading: true,
                tableData: [],
                pager: {
                    total: 8,
                    size: 10,
                    page: 1
                },
                //添加记录
                addDialogVisible: false,
                //编辑记录
                editDialogVisible: false,
                recordId: '',
                username: ''
            }
        },
        mounted(){
            this.getRecordList()
        },
        methods: {
            /*
             **获取记录列表
             */
            getRecordList(){
                getRecordList({
                    page: this.pager.page,
                    size: this.pager.size
                }).then(res=>{
                    if(res.data.code === 200){
                        console.log('所有离返校记录测试',res.data.data.list)
                        this.tableData = res.data.data.list
                        this.pager.total = res.data.data.total
                        this.getStudentInfo()
                    }
                })
            },
            /*
             **获取学生信息
             */
            getStudentInfo(){
                this.tableData.map((item,index)=>{
                    getUserInfo({studentno:item.studentno}).then(res=>{
                        if(res.data.code === 200){
                            item = Object.assign(res.data.data,item)
                            // console.log('item.id',item._id)
                            this.$set(this.tableData,index,item)
                            this.loading = false
                        }                    
                    })                  
                })
            },
            /*
             **添加记录
             */
            addRecord(){
                this.addDialogVisible = true
            },
            postAddRecord(ruleForm){
                postAddRecord(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.getRecordList()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    this.addDialogVisible = false
                })
            },
            /*
             **选择数据时
             */
            handleSelectionChange(){

            },
            /*
             **编辑记录
             */
            editRecord(record){
                this.editDialogVisible = true
                this.recordId = record._id
                this.username = record.username
            },
            postEditRecord(ruleForm){
                postEditRecord(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.getRecordList()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    this.editDialogVisible = false
                })
            },
            /*
             **删除记录
             */
            deleteRecord(id){
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    postDeleteRecord({_id:id}).then((res)=>{
                        if(res.data.code === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.getRecordList()
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                })     
            },
            /*
             **按条件搜索
             */
            onSearch(){
                getRecordList({
                    username: this.options.name,
                    studentno: this.options.studentno,
                    page: this.pager.page,
                    size: this.pager.size
                }).then((res)=>{
                    if(res.data.code === 200){
                        console.log('查询到的结果列表',res.data)
                        this.tableData = res.data.data.list
                        this.pager.total = res.data.data.total              
                        this.getStudentInfo()
                    }
                })
            },
            /*
             **每页的条数发生改变时
             */
            handleSizeChange(val){
                this.pager.size = val
                this.onSearch()
            },
            /*
             **页码改变
             */
            handleCurrentChange(val){
                this.pager.page = val
                this.onSearch()
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>