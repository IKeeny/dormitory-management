<template>
    <div>
        <el-breadcrumb separator="/">
           <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>宿舍管理</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 搜索条件 -->
        <div class="options-wrapper">
            <el-form :inline="true" :model="options" class="demo-form-inline">
                <el-form-item label="楼栋号：">
                    <el-input v-model="options.name" size="medium" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="宿舍号：">
                    <el-input v-model="options.studentno" size="medium" placeholder="请输入学号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="medium" icon="el-icon-search" @click="onSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

</style>