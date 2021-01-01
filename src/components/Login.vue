<template>
    <div class="login-vue" :style="bg">
        <div class="container">
            <p class="title">WELCOME</p>
            <el-form class="demo-ruleForm" :model="loginForm" status-icon :rules="rules" ref="loginForm" v-show="showLogin" label-width="0px">
                <div v-if="errorInfo" style="margin-bottom: 5px;">
                    <span>{{errInfo}}</span>
                </div>
                <el-form-item prop="account">
                    <el-input v-model="loginForm.account" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="loginForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="validate">
                    <el-input v-model="loginForm.validate" class="validate-code" placeholder="验证码"></el-input>
                    <div class="code" @click="refreshCode">
                        <identify :identifyCode="identifyCode"></identify>
                    </div>
                </el-form-item>
                <div class="change-btn">
                    <el-button type="primary" @click="submit('loginForm')">登录</el-button>
                </div>
                <div class="change">
                    <el-link class="change-link" type="primary" :underline="false" @click="showChange">注册</el-link>
                </div>
            </el-form>
            <el-form class="demo-ruleForm" :model="registerForm" status-icon :rules="rules"
                     ref="registerForm" v-show="!showLogin" label-width="0px">
                <div v-if="errorInfo" style="margin-bottom: 5px;">
                    <span>{{errInfo}}</span>
                </div>
                <el-form-item prop="account">
                    <el-input v-model="registerForm.account" placeholder="账号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="密码" v-model="registerForm.password" show-password
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input placeholder="确认密码" v-model="registerForm.rePassword" show-password
                              autocomplete="new-password"></el-input>
                </el-form-item>
                <div class="change-btn">
                    <el-button type="primary" autocomplete="new-password" @click="register">注册</el-button>
                </div>
                <div class="change">
                    <el-link class="change-link" type="primary" :underline="false" @click="showChange">登录</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import md5 from 'js-md5';
    import axios from 'axios';
    import identify from './identify.vue';

export default {
    name: 'login',
    // 注册验证码组件
    components: { identify },
    data() {
        return {
            showLogin: true,
            isShowLoading: false,
            bg: {},
            loginForm:{
                account: '',
                password: '',
                validate:'',
            },
            registerForm:{
                account: '',
                password: '',
                rePassword:'',
                validate:'',
            },
            rules: {
                account: [
                    {required: true, message: '请输入账号', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ],
                validate: [
                    {required: true, message: '请输入验证码', trigger: 'blur'}
                ],
                rePassword: [
                    {required: true, message: '请输入确认密码', trigger: 'blur'}
                ]
            },
            // 验证码初始值
            identifyCode: "",
            // 验证码的随机取值范围
            identifyCodes: "1234567890",
            errorInfo: false,
        }
    },
    mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
    },
    created() {
        this.bg.backgroundImage = 'url(' + require('../assets/imgs/bg0' + new Date().getDay() + '.jpg') + ')'
    },
    watch: {
        $route: {
            handler(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    methods: {
        showChange () {
            this.showLogin = !this.showLogin
            this.refreshCode()
        },
        // 点击验证码刷新验证码
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        // 随机生成验证码字符串
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
            }
            // console.log(this.identifyCode);
        },
        // 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
        randomNum (min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        submit(loginForm) {
            const that = this;
            var inputPass = this.loginForm.password;
            var salt = "1a2b3c4d";
            var str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4);
            var password = md5(str);
            // console.log(this.account+password);
            var details;
            that.$refs[loginForm].validate((valid) => {
                if (valid) {
                    if (that.loginForm.validate != this.identifyCode) {
                        that.errorInfo = true;
                        that.errInfo = '验证码错误';
                        that.$message.error('验证码错误');
                        that.refreshCode();
                    } else {
                        axios({
                            method: 'post',
                            url: '/login/do_login',
                            data: {
                                mobile: this.loginForm.account,
                                password: password
                            }
                        }).then(function (response) {
                            console.log(response);
                            if (response.data.code == 0) {
                                that.isShowLoading = true
                                console.log("success!!!");
                                details = response.data.data;
                                // 登陆成功 设置用户信息
                                localStorage.setItem('userImg', '../assets/imgs/user.jpg');
                                localStorage.setItem('userName', details.name);
                                localStorage.setItem('token', details.token);
                                localStorage.setItem('address', details.address);
                                localStorage.setItem('phoneNum', details.phoneNum);
                                // 登陆成功 假设这里是后台返回的 token
                                that.$message("登陆成功")

                                that.$router.push({name: 'home'});
                            } else {
                                console.log("false!!!");
                                that.$message(response.data.msg);
                            }
                        }).catch(function (error) {
                            console.log(error);
                            console.log("false!!!");
                            that.$layer.msg(error.data.msg);
                        });
                    }
                }else {
                    console.log('error submit!!');
                    return false;
                }
            });

        },
        register () {
            if(this.registerForm.password!=this.registerForm.rePassword){
                this.$message("两次密码不一致");
            }else{
                const that=this
                var inputPass = this.registerForm.password
                var salt = "1a2b3c4d"
                var str = "" + salt.charAt(0) + salt.charAt(2) + inputPass + salt.charAt(5) + salt.charAt(4)
                var password = md5(str)
                axios({
                    method: 'post',
                    url: '/login/register',
                    data: {
                        mobile: this.registerForm.account,
                        password: password
                    }
                }).then(function (response) {
                    console.log(response);
                    if (response.data.code == 0) {
                        that.isShowLoading = true
                        console.log("success!!!")
                        that.$message("注册成功");
                        showChange()
                    } else {
                        console.log("false!!!");
                        that.$message(response.data.msg);
                    }
                }).catch(function (error) {
                    console.log(error);
                    console.log("false!!!");
                    that.$layer.msg(error.data.msg);
                });
            }


        },
        forgetPwd() {

        },
    }
}
</script>

<style>
    .login-vue {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    .login-vue .container {
        background: rgba(255, 255, 255, .5);
        width: 300px;
        text-align: center;
        border-radius: 10px;
        padding: 30px;
    }
    /*.login-vue ::-webkit-input-placeholder { !* WebKit, Blink, Edge *!*/
        /*color: rgba(255, 255, 255, .8);*/
    /*}*/
    /*.login-vue :-moz-placeholder { !* Mozilla Firefox 4 to 18 *!*/
        /*color: rgba(255, 255, 255, .8);*/
    /*}*/
    /*.login-vue ::-moz-placeholder { !* Mozilla Firefox 19+ *!*/
        /*color: rgba(255, 255, 255, .8);*/
    /*}*/
    /*.login-vue :-ms-input-placeholder { !* Internet Explorer 10-11 *!*/
        /*color: rgba(255, 255, 255, .8);*/
    /*}*/
    /*.login-vue .title {*/
        /*font-size: 16px;*/
        /*margin-bottom: 20px;*/
    /*}*/
    .ms-login span {
        color: red;
    }
    .change-btn {
        text-align: center;
    }

    .change-btn button {
        width: 100%;
        height: 36px;
    }
    .code {
        width: 112px;
        height: 35px;
        border: 1px solid #ccc;
        float: right;
        border-radius: 2px;
    }
    .validate-code {
        width: 100px;
        float: left;
    }
    .change {

        cursor: pointer;
        float: right;
    }
    .change .change-link {
        line-height: 30px;
        font-size: 16px;
        color: #717a8a;
    }
</style>
