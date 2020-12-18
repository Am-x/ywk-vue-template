<template>
    <div class="home-container">
        <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
        <div class="home-content">
            <Button @click="getUserData">ajax 测试</Button>

            <Input :rows="30" style="margin-top: 20px" v-model="userInfo" type="textarea" />
        </div>

    </div>
</template>

<script>
import { fetchUserData } from '@/api'

export default {
    name: 'home',
    data() {
        return {
            userInfo: '',
            value: true,
        }
    },
    methods: {
        getUserData() {
            fetchUserData().then(res => {
                this.userInfo = JSON.stringify(res, null, 4)
            })
        },
    },
}
</script>

<style scoped>
.home-container {
    padding: 10px;
    padding-top: 5px;
}
.home-content {
    padding: 10px;
    border-radius: 5px;
    background: #fff;
}
</style>
