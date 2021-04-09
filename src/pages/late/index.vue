<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>晚归记录</el-breadcrumb-item>
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
                    prop="latetime"
                    label="晚归时间"
                    width="150">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    label="晚归原因"
                    width="150">
                </el-table-column>
                <el-table-column prop="name" label="操作">
                    <template v-slot="scope">
                        <el-button type="text" size="small" @click="editLate(scope.row.studentno)">编辑</el-button>
                        <el-button type="text" size="small" @click="deleteLate(scope.row.studentno)">删除</el-button>
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
</template>

<script>
    export default {
        data() {
            return {
                options: {},
                loading: false,
                tableData: [],
                pager: {
                    total: 8,
                    size: 10,
                    page: 1
                }
            }
        },
        methods: {
            /*
             **添加记录
             */
            addRecord(){

            },
            /*
             **选择数据时
             */
            handleSelectionChange(){

            },
            /*
             **编辑记录
             */
            editRecord(){},
            /*
             **删除记录
             */
            deleteRecord(){},
            /*
             **每页的条数发生改变时
             */
            handleSizeChange(){},
            /*
             **页码改变
             */
            handleCurrentChange(){}
        }
    }
</script>

<style lang="scss" scoped>

</style>