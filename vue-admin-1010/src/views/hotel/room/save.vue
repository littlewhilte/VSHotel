<template>
  <div class="app-container">
    <el-form label-width="500px">
      <el-form-item label="房间类型">
        <el-input 
          v-model="room.type"
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
      <el-form-item label="房间数量">
        <el-input 
          v-model="room.capacity"
          clearable 
          size="medium"
          class="inputWidth"
          />
      </el-form-item>
      <el-form-item label="房间剩余">
        <el-input 
          v-model="room.surplus"
          clearable 
          size="medium"
          class="inputWidth"  
        />
      </el-form-item>    
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="room.startTime"
          type="datetime"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          />
      </el-form-item>
      <el-form-item label="修改时间">
          <el-date-picker
          v-model="room.modifyTime"
          type="datetime"
          placeholder="选择修改时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          default-time="00:00:00"
          />
      </el-form-item>      
      <!-- 房间图片 -->
      <el-form-item label="房间图片">
        <!-- 头衔缩略图 -->
        <pan-thumb :image="room.avator"/>
        <!-- 文件上传按钮 -->
        <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换图片
        </el-button>
        <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
              :url：后台上传的url地址
              @close：关闭上传组件
              @crop-upload-success：上传成功后的回调 
                <input type="file" name="file"/>
              -->
        <image-cropper
              v-show="imagecropperShow"
              :width="200"
              :height="150"
              :key="imagecropperKey"
              :url="BASE_API+'/hotelOss/fileOss'"
              field="file"
              @close="close"
              @crop-upload-success="cropSuccess"/>
        </el-form-item>   
      <el-form-item>
        <el-button class="buttonWidth" :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
  .inputWidth{
    width:220px;
  }
  .buttonWidth{
    width:100px;
  }
</style>
<script>
    import room from '@/api/room/room'
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
            },
             //上传弹框组件是否显示
            saveBtnDisabled: false, // 保存按钮是否禁用,
            imagecropperShow:false,
            imagecropperKey:0,//上传组件key值
            BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
            saveBtnDisabled:false,  // 保存按钮是否禁用,
            saveBtnDisabled: false // 保存按钮是否禁用,
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
                const id = this.$route.params.id
                this.getInfo(id)
            } else {
                // 使用对象拓展运算符，拷贝对象，而不是引用，
                // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
                this.room = {}
              }
            },
            saveOrUpdate() {
                this.saveBtnDisabled = true
                if(!this.room.id){
                  this.saveRoom()
                }else{
                  this.updateRoom()
                }
            },
            // 保存
            saveRoom() {
                room.addRoom(this.room)
                .then(response=>{
                    //添加成功
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'添加成功!'
                    });
                    //路由跳转 redirect
                    this.$router.push({ path: '/room/table' })
                })
            },
            //显示对应数据
            getInfo(id){
              room.getRoomInfo(id)
                .then(response=>{
                this.room = response.data.room
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取数据失败'
                })
              })
            },
            // 根据id更新记录
            updateRoom() {
              this.saveBtnDisabled = true
              room.updateRoomInfo(this.room)
              .then(response => {
                  return this.$message({
                      type: 'success',
                      message: '修改成功!'
                  });
              }).then(resposne => {
                  this.$router.push({ path: '/room/table' })
              }).catch((response) => {
                  // console.log(response)
                  this.$message({
                      type: 'error',
                      message: '修改失败'
                  })
              })
          },
          close() { //关闭上传弹框的方法
            this.imagecropperShow=false
            //上传组件初始化用于更换头像
            this.imagecropperKey = this.imagecropperKey+1
          },
          //上传成功方法
          cropSuccess(data) {
            this.imagecropperShow=false
            //上传之后接口返回图片地址
            this.room.avator = data.url
            this.imagecropperKey = this.imagecropperKey+1
          },
    }
}
</script>