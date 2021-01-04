<template>
    <div style="padding: 10px">
        <div style="background: #fff; border-radius: 8px; padding: 20px;">
            <div class="query-c">
                查询：
                <Input search placeholder="请输入查询内容" style="width: auto" />
            </div>
            <br>
            <!--<Table max-height="670" border stripe :columns="columns1" :data="data1"></Table>-->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column fixed prop="goodsName" label="商品名称" min-width="16%">
                </el-table-column>
                <el-table-column label="商品图片" min-width="20%">
                    <template slot-scope="scope">
                        <img :src="require(scope.row.goodsImg)" :fit="fill" alt="这是图片"  min-width="70" height="70" />
                    </template>
                    <!--<img src="@/assets/imgs/iphonex.png" min-width="70" height="70"/>-->
                </el-table-column>
                </el-table-column>
                <el-table-column prop="goodsPrice" label="商品原价" min-width="16%">
                </el-table-column>
                <el-table-column prop="miaoshaPrice" label="秒杀价" min-width="16%">
                </el-table-column>
                <el-table-column prop="stockCount" label="库存数量" min-width="16%">
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="16%">
                    <template width="40" slot-scope="scope">
                        <el-button @click="detail(scope.row.id)" type="text">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br>
            <Page :total="100" show-sizer show-elevator/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
export default {
    name: 't1',
    data() {
        return {
            tableData:[],
            goodsId:'',
        }
    },
    mounted:function() {
        this.getGoodsList();
    },
    methods:{
        getGoodsList() {
            const that = this;
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
        },
        detail(goodsid) {
            const that = this;
            that.$router.push({
                name: 'gooddetail',
                query: {
                    goodsid:goodsid
                }
            })
        },
    }
}
</script>


<style scoped>

</style>
