<template>
  <div class="app-container">
    <el-form label-width="500px">
      <el-form-item label="房间ID">
        <el-input 
            v-model="room.id"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>
      <el-form-item label="房间类型">
        <el-input 
            v-model="room.type"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>  
      <el-form-item label="房间号">
        <el-input 
            v-model="order.roomNo"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>  
       <el-form-item label="房间价格">
        <el-input 
            v-model="room.price"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>     
      <el-form-item label="房间押金">
        <el-input 
            v-model="room.deposit"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>
      <el-form-item label="顾客手机号">
        <el-input 
            v-model="order.mobile"
            clearable 
            size="medium"
            class="inputWidth"
        />
      </el-form-item>
      <el-form-item label="支付方式">
        <el-select v-model="order.payType" placeholder="请选择支付方式">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
            size="medium"
            >
            </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="入住时间">
        <el-date-picker
          v-model="order.createTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          />
      </el-form-item>
      <el-form-item label="退宿时间">
          <el-date-picker
          v-model="order.modifyTime"
          type="datetime"
          placeholder="选择离宿时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          />
      </el-form-item>        
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="success" @click="saveOrUpdate">保存-开房</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .inputWidth{
    width:200px;
  }
  .buttonWidth{
    width:200px;
  }
</style>
<script>
    import room from '@/api/room/room'
    import order from '@/api/order/order'
    import ImageCropper from '@/components/ImageCropper'
    import PanThumb from '@/components/PanThumb'

    export default {
      components:{ImageCropper,PanThumb},
        data() {
            return {
                room: {
                    // createTime:new Date(),
                    // modefiedTime:new Date(),
                    //is_deleted:'0'
                    id:"",
                    price:this.price
                },
                order:{
                  orderNo:"",
                  gid:"",
                  rid:"",
                  mobile:"",
                  total:"700",
                  payType:"",
                  createTime:"",
                  modifyTime:"",
                  days:5,
                  status:1,
                  isDeleted:0
                },
                options: [
                    {
                        value: '微信',
                        label: '微信'
                    }, 
                    {
                        value: '现金',
                        label: '现金',
                        disabled: true
                    },
                    {
                        value:'支付宝',
                        label:'支付宝',
                        disabled:true
                    }
                ],
                //上传弹框组件是否显示
                imagecropperShow:false,
                imagecropperKey:0,//上传组件key值
                BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
                saveBtnDisabled:false,  // 保存按钮是否禁用,
            }
        },
        created(){//在页面渲染前执行
          this.init()
        },
        watch:{//监听
          $route(to,from){//路由方式变化，就会执行下面方法
            this.init()
          }
        },
        methods: {         
          init() {
            if (this.$route.params && this.$route.params.id) {
                var id = this.$route.params.id
                this.getInfo(id)
                //获取订单号
                this.getOrderNo()
            } else {
                // 使用对象拓展运算符，拷贝对象，而不是引用，
                // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
                this.room = {}
              }
            },
            saveOrUpdate() {
              this.getUserIdByMobile()
              this.saveRoom()   
            },
            // 保存
            saveRoom() {
                room.addRoom(this.order)
                .then(response=>{
                    //添加成功
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'开房成功!'
                    });
                    //路由跳转 redirect
                    this.$router.push({ path: '/order/table'})
                })
            },
            //显示对应房间数据
            getInfo(id){
              room.getRoomInfo(id)
                .then(response=>{
                  this.room = response.data.room
                  this.order.rid = this.room.id
                  }).catch((response)=>{
                    this.$message({
                    type:'error',
                    message:'获取房间数据失败！'
                  })
              })
            },
            getOrderNo(){
              order.getOrderNo()
              .then(response=>{
                this.order.orderNo = response.data.orderNo
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取订单号失败！'
                })
              })
            },
            //计算天数
            caculateDay(caDay){
              let starttime = new Date(caDay[0])
              let endtime = new Date(caDay[1])
              starttime = new Date(starttime.getFullYear(), starttime.getMonth(), starttime.getDate())
              endtime = new Date(endtime.getFullYear(), endtime.getMonth(), endtime.getDate())
              const diff = endtime.getTime()-starttime.getTime()
              this.day = diff/(24*60*60*1000)
            },
            getUserIdByMobile(){
              order.getUserIdByMobile(this.order.mobile)
              .then(response=>{
                this.order.gid = response.data.id
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取用户id失败'
                })
              })
            },
            
            
    }
}
</script>