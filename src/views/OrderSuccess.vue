<template>
<div>
    <nav-header></nav-header>
    <nav-bread>
        <span>Order Success</span>
    </nav-bread>
    <div class="container">
        <div class="page-title-normal">
            <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
            <ul>
                <li class="cur"><span>Confirm</span> address</li>
                <li class="cur"><span>View your</span> order</li>
                <li class="cur"><span>Make</span> payment</li>
                <li class="cur"><span>Order</span> confirmation</li>
            </ul>
        </div>

        <div class="order-create">
            <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
                <div class="order-create-main">
                    <h3>Congratulations! <br>Your order is under processing!</h3>
                        <p>
                            <span>Order ID：{{orderId}}</span>
                            <span>Order total：{{orderTotal|currency('￥')}}</span>
                        </p>
                        <div class="order-create-btn-wrap">
                            <div class="btn-l-wrap">
                                <router-link to="/cart" class="btn btn--m">Cart List</router-link>
                            </div>
                            <div class="btn-r-wrap">
                                <router-link to="/" class="btn btn--m">Goods List</router-link>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavHeader from "@/components/NavHeader.vue";
import NavFooter from "@/components/NavFooter.vue";
import NavBread from "@/components/NavBread.vue";
import axios from "axios";

export default {
    data() {
        return {
            orderId: '',
            orderTotal: ''
        }
    },
    components: {
        NavHeader,
        NavFooter,
        NavBread
    },
    mounted() {
        var orderId = this.$route.query.orderId
        if (!orderId) {
            return
        }
        axios.get("/users/orderDetail", {
            params: {
                orderId: orderId
            }
        }).then(res => {
            let result = res.data
            if (result.status == 0) {
                this.orderId = result.result.orderId
                this.orderTotal = result.result.orderTotal
            }
        })
    }
}
</script>

<style>

</style>
