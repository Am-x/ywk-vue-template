<template>
    <div class="panel panel-default" style="height:100%;background-color:rgba(222,222,222,0.8)" >
        <div class="panel-heading">秒杀商品详情</div>
        <div class="panel-body">
            <span id="userTip"> 您还没有登录，请登陆后再操作<br/></span>
            <span>没有收货地址的提示。。。</span>
        </div>
        <table class="table" id="goodslist">
            <tr>
                <td>商品名称</td>
                <td colspan="3" id="goodsName">{{goodsName}}</td>
            </tr>
            <tr>
                <td>商品图片</td>
                <td colspan="3"><img  id="goodsImg" width="200" height="200" /></td>
            </tr>
            <tr>
                <td>秒杀开始时间</td>
                <td id="startTime">{{startTime}}</td>
                <td >
                    <input type="hidden" id="remainSeconds" />
                    <span id="miaoshaTip"></span>
                </td>
                <td>
                    <!--
                        <form id="miaoshaForm" method="post" action="/miaosha/do_miaosha">
                            <button class="btn btn-primary btn-block" type="submit" id="buyButton">立即秒杀</button>
                            <input type="hidden" name="goodsId"  id="goodsId" />
                        </form>-->
                    <div class="row">
                        <div class="form-inline">
                            <img id="verifyCodeImg" width="80" height="32"  style="display:none" onclick="refreshVerifyCode()"/>
                            <input id="verifyCode"  class="form-control" style="display:none"/>
                            <button class="btn btn-primary" type="button" id="buyButton"onclick="getMiaoshaPath()">立即秒杀</button>
                        </div>
                    </div>
                    <input type="hidden" name="goodsId"  id="goodsId" />
                </td>
            </tr>
            <tr>
                <td>商品原价</td>
                <td colspan="3" id="goodsPrice"></td>
            </tr>
            <tr>
                <td>秒杀价</td>
                <td colspan="3"  id="miaoshaPrice"></td>
            </tr>
            <tr>
                <td>库存数量</td>
                <td colspan="3"  id="stockCount"></td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return{

            }
        },

    }
</script>
<style scoped>

</style>
