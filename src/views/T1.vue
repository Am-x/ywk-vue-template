<template>
    <div class="panel panel-default" >
        <div class="panel-heading">秒杀商品详情</div>
        <div class="panel-body">
            <span id="userTip"> {{userTip}}<br/></span>
            <span>{{isAddress}}</span>
        </div>
        <table class="table" id="goodslist">
            <tr>
                <td>商品名称</td>
                <td colspan="3" id="goodsName">{{goodsName}}</td>
            </tr>
            <tr>
                <td>商品图片</td>
                <td colspan="3"><img :src="require(`@/assets/imgs/${img}`)" width="200" height="200" /></td>
            </tr>
            <tr>
                <td>秒杀开始时间：</td>
                <td id="startTime">{{startTime}}</td>
            </tr>
            <tr>
                <td >
                    <input type="hidden" id="remainSeconds" />
                    <span id="miaoshaTip">{{miaoshaTip}}</span>
                </td>
                <td>
                    <!--
                        <form id="miaoshaForm" method="post" action="/miaosha/do_miaosha">
                            <button class="btn btn-primary btn-block" type="submit" id="buyButton">立即秒杀</button>
                            <input type="hidden" name="goodsId"  id="goodsId" />
                        </form>-->
                    <el-button class="btn btn-primary btn-block" type="button" id="buyButton" :disabled="isAble"  @click="doMiaosha">立即秒杀</el-button>
                    <input type="hidden" name="goodsId"  id="goodsId" />
                </td>
            </tr>
            <tr>
                <td>商品原价</td>
                <td colspan="3" id="goodsPrice">{{goodsPrice}}</td>
            </tr>
            <tr>
                <td>秒杀价</td>
                <td colspan="3"  id="miaoshaPrice">{{miaoshaPrice}}</td>
            </tr>
            <tr>
                <td>库存数量</td>
                <td colspan="3"  id="stockCount">{{stockCount}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
    import {formatDate} from '../utils/common.js';
    export default {
        data() {
            return{
                userTip:'',
                isAddress:'',
                goodsName:'',
                img:'',
                goodsImg:'',
                startTime:'',
                miaoshaTip:'',
                goodsPrice:'',
                miaoshaPrice:'',
                stockCount:'',
                isAble:true
            }
        },

        mounted:function () {
            this.getDetail();
        },

        methods:{
            getDetail(){
                const that=this
                var goodsId=this.$route.query.goodsId
                console.log(goodsId)
                this.$request.get('/api/goods/detail?goodsId='+goodsId).then(function (response) {
                    if(response.code==0){
                        console.log(response)
                        that.render(response.data)
                    }
                }).catch(function (error) {
                    that.$message(error.msg)
                })
            },
            render(detail){
                const that = this
                var miaoshaStatus = detail.miaoshaStatus
                var  remainSeconds = detail.remainSeconds
                var goods = detail.goods
                var user = detail.user
                var startTime=detail.startTime
                if(user==null || user==''){
                    that.userTip='您还没有登录，请登陆后再操作'
                }
                if(localStorage.getItem('address')=='' || localStorage.getItem('address')== null){
                    that.address='没有收货地址的提示。。。'
                }
                that.goodsName=goods.goodsName
                that.img=goods.goodsImg
                that.startTime=detail.startTime
                that.remainSeconds=remainSeconds
                that.goodsId=goods.id
                that.goodsPrice=goods.goodsPrice
                that.miaoshaPrice=goods.miaoshaPrice
                that.stockCount=goods.stockCount
                that.countDown()
            },
            countDown() {
                const that = this
                clearTimeout(timeout)
                var remainSeconds = that.remainSeconds
                var timeout;
                if (remainSeconds > 0) {//秒杀还没开始，倒计时
                    that.isAble= true
                    that.miaoshaTip='  秒杀倒计时：' + remainSeconds + '秒   '
                    timeout = setTimeout(function () {
                        that.remainSeconds=remainSeconds - 1
                        that.countDown()
                    }, 1000)
                } else if (remainSeconds == 0) {//秒杀进行中
                    that.isAble= false
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    that.miaoshaTip='秒杀进行中'
                } else {//秒杀已经结束
                    that.isAble=true
                    that.miaoshaTip='秒杀已经结束'
                }
            },
            doMiaosha() {
                const that = this
                this.$request.post("api/miaosha/do_miaosha",{
                    goodsId:this.goodsId
                }).then(function (response) {
                    if (response.code == 0) {
                        that.getMiaoshaResult(that.goodsId)
                    }else {
                        that.$message(response.msg)
                    }
                }).catch(function (error) {
                    that.$layer.msg(error.msg)
                })
            },
            getMiaoshaResult(goodsId) {
                const that = this
                clearTimeout(timeout)
                var result
                this.$request.get('api/miaosha/result?goodsId='+goodsId).then(function (response) {
                    console.log(response)
                    if (response.code == 0) {
                        result = data.data
                        console.log('orderId:'+result)
                        if(result < 0){
                            that.$message("对不起，抢购失败")
                        }else if(result == 0){//继续轮询
                            that.$message("正在抢购订单")
                            timeout = setTimeout(function(){
                                that.getMiaoshaResult(goodsId)
                            }, 50)
                        }else{
                            that.$message('抢购成功')
                            that.info()
                        }
                    }else{
                        console.log(response.code)
                        that.$message(response.msg)
                    }
                }).catch(function (error) {
                    console.log(error.code)
                    that.$message(error.msg)
                })
            },
            info() {
                const self = this
                this.$Notice.info({
                    title: `您有1条消息`,
                    render(h) {
                        return h('Button', {
                            attrs: {
                                type: 'info',
                                size: 'small',
                            },
                            on: {
                                click() {
                                    // 点击查看跳转到消息页
                                    self.gotoPage('msg')
                                    self.hasNewMsg = false
                                    self.msgNum = 0
                                },
                            },
                        }, [
                            '点击查看',
                        ])
                    },
                })
            },
        }
    }
</script>
<style scoped>
    .table{
        margin:auto 0;
    }
</style>
