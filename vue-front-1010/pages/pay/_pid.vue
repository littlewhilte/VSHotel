<template>
  <div class="container-form">
    <!--主内容-->
    <div class="checkout py-container  pay">
      <div class="checkout-tit" style="margin:10px 0">
        <h4 class="fl tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款！订单号：{{payObj.order_no}}</span>
        </h4>
        <div class="clearfix"></div>
      </div>
      <div class="checkout-steps">
        <div class="fl sao" style="width:100%">
          <div class="fl code" style="width:100%">
            <!-- <img id="qrious" src="~/assets/img/erweima.png" alt=""> -->
            <!-- <qriously value="weixin://wxpay/bizpayurl?pr=R7tnDpZ" :size="338"/> -->
            <qriously :value="payObj.code_url" :size="338"/>
            <div class="saosao" style="margin:10px 5px;display:flex; justify-content:space-between">
              <p>请使用微信扫一扫，扫描二维码进行支付！</p>
              <span class="fr" style="font-size:20px; ">
                <em class="sui-lead">应付金额：</em>
                <em class="orange money" style="color:red;font-size:18px">￥{{payObj.total_fee}}</em>
              </span>
            </div>
          </div>
        </div>
        <div class="clearfix"></div>
        <!-- <p><a href="pay.html" target="_blank">> 其他支付方式</a></p> -->
      </div>
    </div>
  </div>
</template>
<script>
import ordersApi from '@/api/order'
export default {
     asyncData({ params, error }) {
         return ordersApi.createNative(params.pid)
            .then(response => {
                return {
                      payObj: response.data.data
                    }
            })
     },
     data() {
         return {
             timer1:''
         }
     },
     created(){
       
     },
     //每隔三秒调用一次查询订单状态的方法
     mounted() {//页面渲染之后执行
        this.timer1 = setInterval(() => {
          this.queryOrderStatus(this.payObj.order_no)
        },3000);
     },
     methods:{
         queryOrderStatus(orderNo) {
             ordersApi.queryPayStatus(orderNo)
                .then(response => {
                     if (response.data.success) {
                        //支付成功，清除定时器
                        clearInterval(this.timer1)
                        //提示
                        this.$message({
                            type: 'success',
                            message: '支付成功!'
                        })
                        //跳转回到详情页面
                        this.$router.push({path: '/room/'})
                     }
                })
         }
     }
}
</script>

<style scoped>
.container-form {
  margin: 10px 40px;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
}
</style>