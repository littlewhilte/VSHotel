<template>
  <div class="app-container">
    <el-form label-width="80px">
      <el-form-item label="游客姓名">
        <el-input v-model="guest.nickname"/>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="guest.password"/>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="guest.age"/>
      </el-form-item>      
       <el-form-item label="手机号">
        <el-input v-model="guest.mobile"/>
      </el-form-item>     
      <el-form-item label="创建时间">
        <el-input v-model="guest.gmtCreate"/>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-input v-model="guest.gmtModified"/>
      </el-form-item>
      <!-- <el-form-item label="是否删除()">
        <el-input v-model="student.is_deleted"/>
      </el-form-item> -->
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="游客头像">
          <!-- 头衔缩略图 -->
          <pan-thumb :image="guest.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
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
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/hotelOss/fileOss'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>
      </el-form-item>      
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    import guest from '@/api/guest/guest'
    import ImageCropper from '@/components/ImageCropper'
    import PanThumb from '@/components/PanThumb'
    export default {
      components:{ImageCropper,PanThumb},
        data() {
            return {
            guest: {
                nickname: '',
                password:'',
                // createTime:new Date(),
                // modefiedTime:new Date(),
                //is_deleted:'0'
            },
             //上传弹框组件是否显示
            imagecropperShow:false,
            imagecropperKey:0,//上传组件key值
            BASE_API:process.env.BASE_API, //获取dev.env.js里面地址
            saveBtnDisabled:false,  // 保存按钮是否禁用,
            saveBtnDisabled: false // 保存按钮是否禁用,
            }
        },
        created(){//在页面渲染前执行
          // if(this.$route.params && this.$route.params.id){
          //   //从路径中获取id值
          //   const id = this.$route.params.id
          //   //调用查询byid方法
          //   this.getInfo(id)
          // }else{
          //   this.student={}
          // }
          this.init()
        },
        watch:{//监听
          $route(to,from){//路由方式变化，就会执行下面方法
            this.init()
          }
        },
        methods: {
        close() { //关闭上传弹框的方法
            this.imagecropperShow=false
            //上传组件初始化用于更换头像
            this.imagecropperKey = this.imagecropperKey+1
        },
        //上传成功方法
        cropSuccess(data) {
          this.imagecropperShow=false
          //上传之后接口返回图片地址
          this.guest.avatar = data.url
          this.imagecropperKey = this.imagecropperKey+1
        },
          
          init() {
            if (this.$route.params && this.$route.params.id) {
                const id = this.$route.params.id
                this.getInfo(id)
            } else {
                // 使用对象拓展运算符，拷贝对象，而不是引用，
                // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
                this.guest = {}
              }
            },
            saveOrUpdate() {
                this.saveBtnDisabled = true
                if(!this.guest.id){
                  this.saveGuest()
                }else{
                  this.updateGuest()
                }
            },
            // 保存
            saveGuest() {
                guest.addGuest(this.guest)
                .then(response=>{
                    //添加成功
                    //提示信息
                    this.$message({
                        type:'success',
                        message:'添加成功!'
                    });
                    //路由跳转 redirect
                    this.$router.push({ path: '/guest/table' })
                })
            },
            //显示对应数据
            getInfo(id){
              guest.getGuestInfo(id)
                .then(response=>{
                this.guest = response.data.guest
              }).catch((response)=>{
                this.$message({
                  type:'error',
                  message:'获取数据失败'
                })
              })
            },
            // 根据id更新记录
            updateGuest() {
              this.saveBtnDisabled = true
              guest.updateGuestInfo(this.guest)
              .then(response => {
                  return this.$message({
                      type: 'success',
                      message: '修改成功!'
                  });
              }).then(resposne => {
                  this.$router.push({ path: '/guest/table' })
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