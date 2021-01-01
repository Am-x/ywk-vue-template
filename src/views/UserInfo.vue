<template>
    <div class="userInfo">
        <div class="container">
            <span>昵称</span>
            <el-input v-model="userName" placeholder="昵称"></el-input>
            <span>手机号</span>
            <el-input v-model="phoneNum" placeholder="手机号"></el-input>
            <span>收货地址</span>
            <el-input v-model="address" placeholder="收货地址"></el-input>
            <div class="change-btn">
                <el-button type="primary" @click="update">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
export default {
    name: 'userinfo',
    data() {
        return {
            userName:'',
            phoneNum:'',
            address:'',
        }
    },
    mounted() {
        this.userName=""
        this.phoneNum=""
        this.address=""
        if(localStorage.getItem('userName')!="null"){
            this.userName=localStorage.getItem('userName')
        }
        if(localStorage.getItem('phoneNum')!="null"){
            this.phoneNum=localStorage.getItem('phoneNum')
        }
        if(localStorage.getItem('address')!="null"){
            this.address=localStorage.getItem('address')
        }
    },
    computed: {
        update(){
            axios({
                method: 'post',
                url: '/goods/to_list',
                data: {}
            }).then(function (response) {
                console.log(response)
                if (response.data.code == 0) {
                    that.isShowLoading = true
                    console.log("success!!!")
                    that.tableData = response.data.data

                } else {
                    console.log("false!!!")
                    that.$message(response.data.msg)
                }
            }).catch(function (error) {
                console.log(error)
                console.log("false!!!")
                that.$layer.msg(error.data.msg)
            })
        }
    },
}
</script>

<style scoped>
    .userInfo {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .userInfo .container {
        background: rgba(255, 255, 255, .5);
        width: 500px;
        text-align: center;
        border-radius: 10px;
        padding: 30px;
    }
    .userInfo .container span{
        color: #2c3e50;
        margin-top: 5px;
    }
    .userInfo .container input{
        margin-top: 10px;
    }
    .change-btn {
        text-align: center;
    }

    .change-btn button {
        width: 100%;
        height: 36px;
        margin-top: 10px;
    }
</style>
