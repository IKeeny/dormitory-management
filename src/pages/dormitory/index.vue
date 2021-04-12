<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 搜索条件 -->
        <div class="options-wrapper">
            <el-form :inline="true" :model="options" class="demo-form-inline">
                <el-form-item label="宿舍楼：">
                    <el-input v-model="options.apartment" size="medium" placeholder="请输入宿舍楼"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号：">
                    <el-input v-model="options.dormno" size="medium" placeholder="请输入宿舍号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!-- 操作条件 -->
        <div class="operator-wrapper">
            <el-button type="primary" size="medium" icon="el-icon-plus" @click="addDorm">添加</el-button>
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
                    prop="apartment"
                    label="楼栋"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="dormno"
                    label="宿舍号"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="bednum"
                    label="床位总数"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="usedBed"
                    label="已用床位"
                    width="200">
                </el-table-column>
                <el-table-column prop="name" label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="editDorm(scope.row._id)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteDorm(scope.row._id)">删除</el-button>
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

        <!-- 添加宿舍记录 -->
        <AddDorm
            :dialogVisible="addDialogVisible"
            v-if="addDialogVisible"
            @postAddDorm="postAddDorm"
            @handleCloseDialogClick="addDialogVisible = false"
            @handleClose="addDialogVisible = false"
        /> 

        <!-- 编辑宿舍记录 -->
        <EditDorm
            :dialogVisible="editDialogVisible"
            :dormId="dormId"
            v-if="editDialogVisible"
            @postEditDorm="postEditDorm"
            @handleCloseDialogClick="editDialogVisible = false"
            @handleClose="editDialogVisible = false"
        /> 
    </div>
</template>

<script>
    import AddDorm from './AddDorm'
    import EditDorm from './EditDorm'
    import { getDormList,postAddDorm,postEditDorm,postDeleteDorm } from '@/api/dorm'
    export default {
        components: {
            AddDorm,
            EditDorm
        },
        data() {
            return {
                options: {},
                tableData: [],
                loading:true,
                pager: {
                    total: 8,
                    page: 1,
                    size: 10
                },
                //添加记录
                addDialogVisible: false,
                //编辑记录
                editDialogVisible: false,
                dormId: '',
            }
        },
        mounted(){
            this.getDormList()
        },
        methods: {
            getDormList(){
                getDormList().then(res=>{
                    if(res.data.code === 200){
                        this.tableData = res.data.data.list,
                        this.pager.total = res.data.data.total
                        this.loading = false
                    }
                })
            },
            /*
             **添加记录
             */
            addDorm(){
                this.addDialogVisible = true
            },
            postAddDorm(ruleForm){
                postAddDorm(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.getDormList()
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
            editDorm(id){
                this.editDialogVisible = true
                this.dormId = id
            },
            postEditDorm(ruleForm){
                postEditDorm(ruleForm).then(res=>{
                    if(res.data.code === 200){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.getDormList()
                    }else{
                        this.$message.error(res.data.message)
                    }
                    this.editDialogVisible = false
                })
            },
            /*
             **删除记录
             */
            deleteDorm(id){
                this.$confirm('此操作将永久删除该宿舍记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    postDeleteDorm({_id:id}).then((res)=>{
                        if(res.data.code === 200){
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            this.getDormList()
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
                getDormList({
                    apartment: this.options.apartment,
                    dormno: this.options.dormno,
                    page: this.pager.page,
                    size: this.pager.size
                }).then((res)=>{
                    if(res.data.code === 200){
                        console.log('查询到的结果列表',res.data)
                        this.tableData = res.data.data.list
                        this.pager.total = res.data.data.total              
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