<template>
    <div class="userInfo">
        <div class="container">
            <span>原始密码</span>
            <el-input v-model="oldPsw" placeholder="原始密码" autocomplete="off"></el-input>
            <span>修改密码</span>
            <el-input v-model="newPsw" placeholder="修改密码" autocomplete="off"></el-input>
            <div class="change-btn">
                <el-button type="primary" @click="modifyPassword">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';

export default {
    name: 'password',
    data() {
        return {
            oldPsw:'',
            newPsw:'',
        }
    },
    //页面加载时用于页面动态数据的填充
    created() {},
    //页面加载是会先去执行的方法（会请求后端）
    mounted() {},
    methods: {
        modifyPassword() {
            const that=this
            var inputOldPass=this.oldPsw
            var inputNewPass=this.newPsw
            var salt = "1a2b3c4d"
            var str1 = "" + salt.charAt(0) + salt.charAt(2) + inputOldPass + salt.charAt(5) + salt.charAt(4)
            var str2 = "" + salt.charAt(0) + salt.charAt(2) + inputNewPass + salt.charAt(5) + salt.charAt(4)
            var oldPassword = md5(str1)
            var newPassword = md5(str2)
            this.$request.post("/api/user/modifyPassword",{
                oldPsw:oldPassword,
                newPsw:newPassword
            }).then(function (response) {

                that.$message("修改成功")
            }).catch(function (error) {
                that.$message(error.msg)
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
