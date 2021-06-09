<template>
  <div class="Page Confirm">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="" class="container-form">
      <div class="flow-container">
        <img src="https://hotel-1.oss-cn-beijing.aliyuncs.com/hotel_roomPic/singleRoom.jpg" alt="" class="f-c-img">
        <div class="f-c-main">
          <div class="f-c-m-left">
            {{ order.type }}
          </div>
          <div class="f-c-m-right">
            <div class="f-m-all">
               <span class="f-m-title">价格:</span>
               <span class="f-m-content">￥{{ order.price }}元</span>
            </div>
            <div class="f-m-all">
               <span class="f-m-title">押金:</span>
               <span class="f-m-content">￥{{ order.deposit }}元</span>
            </div>
            <div class="f-m-all">
               <span class="f-m-title">天数:</span>
               <span class="f-m-content">{{ order.days }}天</span>
            </div>
            <!-- <div class="f-m-all">
               <span class="f-m-title"></span>
               <span class="f-m-content"></span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="flow-footer">
        <div class="f-f-left">
          共计<span style="color:red;margin: 0 5px;">1</span>件商品，合计<span style="color:red;margin: 0 5px;">￥{{ order.days*order.price }}</span>
        </div>
        <div class="f-f-right">
          <div class="mybtn" id="submitPay" @click="toPay()">去支付</div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import ordersApi from '@/api/order'
import roomApi from '@/api/room'
export default {
    data(){
        return{
            order:{},
            room:{},
            rid:"",
            type:""
        }
    },
    asyncData({ params, error }) {
        return ordersApi.getOrderInfo(params.oid)
            .then(response => {
                return {
                    order: response.data.data.orderInfo,
                }
            })
    },
    created(){
    },
    methods:{
        //去支付
        toPay() {
            this.$router.push({path:'/pay/'+this.order.orderNo})
        },
        getTypeByRid(rid){
          ordersApi.getTypeByRid(rid)
          .then(response=>{
            var type = response.data.type
            console.log(type)
          })
        }
    }
}
</script>

<style scoped>
.Title {
  width:100%;
  height: 50px;
  margin: 10px 40px;
}
.container-form {
  margin: 10px 40px;
}
.flow-container {
  display: flex;
  border: 1px solid rgba(0,0,0,0.2);
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.2);
}
.f-c-img {
  border-radius: 8px ;
  margin-right: 20px;
  height: 150px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
} 
.f-c-main {
  display: flex;
  flex: 1;
  justify-content: space-between;
}
.f-c-m-left {
  font-size: 18px;
}
.f-c-m-right {
  display: flex;
}
.f-m-all {
  margin: 0 10px;
}
.f-m-title {
  font-size: 17px;
}
.f-m-content {
  font-size: 15px;
  color: red;
}
.flow-footer {
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}
.f-f-left {
  font-size: 18px;
  letter-spacing: 1px;
}
.mybtn {
  padding: 5px 20px;
  border-radius: 5px;
  color: white;
  background-color: seagreen;
  box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.2);
  cursor: pointer;
}
.mybtn:hover {
  opacity: 0.9;
}
.mybtn:active {
  transform: translate(2px,2px);
}
</style>