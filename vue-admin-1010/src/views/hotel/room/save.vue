<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="房间号">
        <el-input v-model="room.rid"/>
      </el-form-item>
      <el-form-item label="房间类型">
        <el-input v-model="room.type"/>
      </el-form-item>
      <el-form-item label="房间状态">
        <el-input v-model="room.state"/>
      </el-form-item>      
       <el-form-item label="房间价格">
        <el-input v-model="room.price"/>
      </el-form-item>     
      <el-form-item label="房间押金">
        <el-input v-model="room.deposit"/>
      </el-form-item>
            <el-form-item label="起始时间">
            <el-date-picker
                v-model="room.startTime"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item label="退房时间">
                <el-date-picker
                v-model="room.endTime"
                type="datetime"
                placeholder="选择截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>      
      <!-- 讲师头像 -->
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import room from '@/api/room/room'
    export default {
        data() {
            return {
            room: {

                // createTime:new Date(),
                // modefiedTime:new Date(),
                //is_deleted:'0'
            },
             //上传弹框组件是否显示
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
          }
    }
}
</script>