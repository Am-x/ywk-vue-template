<template>
    <div>
        查看消息
        <div class="panel panel-default" >
            <div class="panel-heading">秒杀订单详情</div>
            <table class="table" id="goodslist">
                <tr>
                    <td>商品名称</td>
                    <td colspan="3" id="goodsName">{{goodsName}}</td>
                </tr>
                <tr>
                    <td>商品图片</td>
                    <td colspan="2"><img :src="require(`@/assets/imgs/${img}`)" id="goodsImg" width="200" height="200" /></td>
                </tr>
                <tr>
                    <td>订单价格</td>
                    <td colspan="2"  id="orderPrice">{{orderPrice}}</td>
                </tr>
                <tr>
                    <td>下单时间</td>
                    <td id="createDate" colspan="2">{{createDate}}</td>
                </tr>
                <tr>
                    <td>订单状态</td>
                    <td id="orderStatus">{{orderStatus}}</td>
                    <td>
                        <button class="btn btn-primary btn-block" type="submit" id="payButton">立即支付</button>
                    </td>
                </tr>
                <tr>
                    <td>收货人</td>
                    <td colspan="2">{{userName}}</td>
                </tr>
                <tr>
                    <td>收货地址</td>
                    <td colspan="2">{{address}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'msg',
        data() {
            return{
                goodsName:'',
                img:'',
                orderPrice:'',
                createDate:'',
                orderStatus:'',
                userName:'',
                address:''
            }
        },
        mounted:function() {
            this.getOrderDetail();
        },
        methods: {
            // reback() {
            //     this.$router.back()
            // },
            getOrderDetail() {
                const that=this
                this.$request.get('api/order/orderDetail').then(function (response) {
                    console.log(response)
                    if (response.code == 0) {
                        that.render(data.data);
                    }else{
                        that.$message(data.msg);
                    }
                }).catch(function (error) {
                    that.$message(error.msg)
                })
            },
            render(detail) {
                const that = this
                var goods = detail.goods;
                var order = detail.order;
                that.goodsName = goods.goodsName
                that.goodsImg = goods.goodsImg
                that.orderPrice = order.goodsPrice
                that.createDate = detail.createDate
                var status = ''
                if(order.status == 0){
                    status = '未支付'
                }else if(order.status == 1){
                    status = '待发货'
                }
                that.orderStatus = status;
            }
        },
    }
</script>

<style scoped>

</style>
