<template>
    <div class="home-div">
        <el-container class="home-container">
            <el-header style="height: 50px">
                <div>
                    <span>宿舍管理系统</span>
                </div>
                <el-button type="info" size="small" @click="logout">退出登录</el-button>
            </el-header>
            <el-container>
                <el-aside :width="isCollapse ? '64px' : '200px'">
                    <div class="toggle-button" @click="toggleCollapse">|||</div>
                    <el-menu
                        background-color="#EDEBED"
                        default-active="2"
                        class="el-menu-vertical-demo"
                        :router="true"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                    >
                        <el-menu-item :index="item.path" v-for="(item,index) in menulist" :key="index">
                            <i :class="item.icon"></i>
                            <span slot="title">{{item.name}}</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main class="main-wrapper" style="overflow-y:auto">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                // menulist: [],
                menulist: [    
                    {name:'学生管理', icon:'iconfont icon-Student',path:'/student'},
                    {name:'宿舍管理', icon:'iconfont icon-Dormitorymanagement',path:'/dormitory'},
                    {name:'晚归记录',icon:'iconfont icon-clock',path:'/late'},
                    {name:'离返校登记', icon:'iconfont icon-record',path:'/record'},
                    {name:'个人信息', icon:'iconfont icon-Personalinformation',path:'/userInfo'}
                ],
                //是否折叠
                isCollapse: false,
                userData: ''
            }
        },
        // computed:{
        //     userData:()=>{
        //         return this.$store.state.userData
        //     }
        // },
        mounted(){
            console.log('计算属性试一下',this.userData)
            // console.log('加载了吗')
            // console.log('拿到存的数据2',this.$store.state.userData)
            // let { type } = JSON.parse(this.$store.state.userData)
            
            // if(type === 'student'){
            //     this.menulist = [    
            //         {name:'晚归记录',icon:'iconfont icon-clock',path:'/late'},
            //         {name:'离返校登记', icon:'iconfont icon-record',path:'/record'},
            //         {name:'个人信息', icon:'iconfont icon-Personalinformation',path:'/userInfo'}
            //     ]
            // }else if(type === 'manager'){
            //     this.menulist = [    
            //         {name:'学生管理', icon:'iconfont icon-Student',path:'/student'},
            //         {name:'宿舍管理', icon:'iconfont icon-Dormitorymanagement',path:'/dormitory'},
            //         {name:'晚归记录',icon:'iconfont icon-clock',path:'/late'},
            //         {name:'离返校登记', icon:'iconfont icon-record',path:'/record'},
            //         {name:'个人信息', icon:'iconfont icon-Personalinformation',path:'/userInfo'}
            //     ]
            // }
            // setTimeout(this.getType(),3000)
            // this.getType()
            this.$nextTick(()=>{
                // this.getType()
            })
        },
        methods: {
            toggleCollapse(){
                this.isCollapse = !this.isCollapse
            },
            /*
             **退出登录
             */
            logout(){
                this.$message({
                    message: '退出登录',
                    type: 'success'
                })
                this.$store.commit('delUserData')
                this.$router.push('/login')             
            },
            /*
             **获取用户类型
             */
            getType(){
                console.log('加载了吗')
                console.log('新方法--拿到存的数据2',this.$store.state.userData)
                let { type } = JSON.parse(this.$store.state.userData)
                if(type === 'student'){
                    this.menulist = [    
                        {name:'晚归记录',icon:'iconfont icon-clock',path:'/late'},
                        {name:'离返校登记', icon:'iconfont icon-record',path:'/record'},
                        {name:'个人信息', icon:'iconfont icon-Personalinformation',path:'/userInfo'}
                    ]
                }else if(type === 'manager'){
                    this.menulist = [    
                        {name:'学生管理', icon:'iconfont icon-Student',path:'/student'},
                        {name:'宿舍管理', icon:'iconfont icon-Dormitorymanagement',path:'/dormitory'},
                        {name:'晚归记录',icon:'iconfont icon-clock',path:'/late'},
                        {name:'离返校登记', icon:'iconfont icon-record',path:'/record'},
                        {name:'个人信息', icon:'iconfont icon-Personalinformation',path:'/userInfo'}
                    ]
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.home-div {
    height: 100%;
    overflow: hidden;
}
.home-container {
    height: 100%;
    // overflow: hidden;
}
.el-header {
    background-color: rgb(77, 74, 74);
    display: flex;
    justify-content: space-between;
    color: #fff;
    font-size: 20px;
    padding: 10px 40px;  
    div {
        display:flex;
        align-items: center;
        // img {
        //     // width: 50px;
        //     // height: 50px;
        // }
    }
    .el-button {
        color: #fff;
    }
}
.toggle-button {
    background-color: rgb(237, 235, 237);
    font-size: 10px;
    line-height: 24px;
    color: #878387;
    text-align: center;
    letter-spacing: 0.2rem;
    cursor: pointer;
}
.el-menu {
    height: calc(100vh - 24px); 
    span {
        font-weight: 700;
    }
}
.iconfont {
    margin-right: 15px;
    font-weight: 700;
}
.main-wrapper {
    width: calc(100% - 64px);
    height: 100%;
    overflow: auto;
    
}
</style>